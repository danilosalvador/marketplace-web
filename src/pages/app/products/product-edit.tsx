import { Helmet } from 'react-helmet-async'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ArrowLeft, Ban, Check, ShoppingBasket } from 'lucide-react'

import { ProductForm, type productFormType } from './components/product-form'
import { Button } from '@/components/ui/button'

import { getProductId } from '@/api/get-product-id'
import { editProduct, type EditProductResponse } from '@/api/edit-product'
import { attachments } from '@/api/attachments'
import { editProductStatus } from '@/api/edit-product-status'

interface productUpdateCache {
  title: string
  description: string
  priceInCents: number
  status: 'available' | 'sold' | 'cancelled'
  category?: {
    title: string
    id: string
    slug: string
  }
  attachments: {
    id: string
    url: string
  }[]
}

export function ProductEdit() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()

  const { data: productData, isLoading: isLoadingProductData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductId({ id: id ?? '' }),
  })

  const { mutateAsync: onAttachment, isPending: isPendingAttachments } =
    useMutation({
      mutationFn: attachments,
    })

  const { mutateAsync: onEditProduct, isPending: isPendingEditProduct } =
    useMutation({
      mutationFn: editProduct,
      onSuccess({
        product: {
          title,
          description,
          priceInCents,
          category,
          status,
          attachments,
        },
      }) {
        updateCache({
          title,
          description,
          priceInCents,
          category,
          status,
          attachments,
        })
        navigate('/products')
      },
    })

  const {
    mutateAsync: onEditProductStatus,
    isPending: isPendingEditProductStatus,
  } = useMutation({
    mutationFn: editProductStatus,
    onSuccess({
      product: {
        title,
        description,
        priceInCents,
        category,
        status,
        attachments,
      },
    }) {
      updateCache({
        title,
        description,
        priceInCents,
        category,
        status,
        attachments,
      })
    },
  })

  async function updateCache({
    title,
    description,
    priceInCents,
    category,
    status,
    attachments,
  }: productUpdateCache) {
    const cache = queryClient.getQueriesData<EditProductResponse>({
      queryKey: ['product', id],
    })

    for (const [cacheKey, cacheData] of cache) {
      if (!cacheData) {
        return
      }

      const product = {
        ...cacheData.product,
        title,
        category,
        description,
        priceInCents,
        status,
        attachments,
      }

      queryClient.setQueryData<EditProductResponse>(cacheKey, {
        ...cacheData,
        product,
      })
    }
  }

  async function changeStatus(status: 'available' | 'sold' | 'cancelled') {
    try {
      await onEditProductStatus({
        id: id ?? '',
        status,
      })
    } catch {
      toast.error('Ocorreu um erro ao alterar o status do produto.')
    }
  }

  async function handleSave({
    title,
    categoryId,
    description,
    priceInCents,
    file,
  }: productFormType) {
    try {
      let attachmentsIds = productData?.product.attachments.map(
        attachment => attachment.id
      )

      if (file instanceof FileList && file?.length > 0) {
        const files = new FormData()
        files.append('files', file[0])

        const { attachments } = await onAttachment({ files })

        attachmentsIds = attachments.map(attachment => attachment.id)
      }

      await onEditProduct({
        id: id ?? '',
        title,
        categoryId,
        description,
        priceInCents: !priceInCents ? 0 : priceInCents * 100,
        attachmentsIds,
      })
    } catch {
      toast.error('Ocorreu um erro ao editar o produto.')
    }
  }

  async function handleChangeStatusAvailable() {
    await changeStatus('available')
  }

  async function handleChangeStatusSold() {
    await changeStatus('sold')
  }

  async function handleChangeStatusCancelled() {
    await changeStatus('cancelled')
  }

  const isPending =
    isPendingEditProduct || isPendingAttachments || isPendingEditProductStatus

  return (
    <div className="flex flex-col w-[1030px] min-h-screen gap-10">
      <Helmet title="Edição de Produto" />
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2 disabled:">
          <Link to="/products">
            <div className="flex text-orange-base gap-2">
              <ArrowLeft width={20} height={20} />
              <span className="font-text text-action-sm font-fw-action">
                Voltar
              </span>
            </div>
          </Link>
          <h1 className="font-title text-title-md font-fw-title text-gray-500">
            Editar Produto
          </h1>
          <p className="font-text text-body-sm font-fw-body text-gray-300">
            Gerencie as informações do produto cadastrado
          </p>
        </div>
        <div className="flex items-end">
          {(productData?.product.status === 'sold' ||
            productData?.product.status === 'cancelled') && (
            <Button
              variant="ghost"
              className="flex gap-2 items-center text-orange-base"
              onClick={handleChangeStatusAvailable}
              disabled={isPending}
            >
              <ShoppingBasket />
              Marcar como disponível
            </Button>
          )}
          {productData?.product.status === 'available' && (
            <Button
              variant="ghost"
              className="flex gap-2 items-center text-orange-base"
              onClick={handleChangeStatusSold}
              disabled={isPending}
            >
              <Check />
              Marcar como vendido
            </Button>
          )}
          <Button
            variant="ghost"
            className="flex gap-2 items-center text-orange-base"
            disabled={
              productData?.product.status === 'cancelled' ||
              productData?.product.status === 'sold' ||
              isPending
            }
            onClick={handleChangeStatusCancelled}
          >
            <Ban />
            Desativar anúncio
          </Button>
        </div>
      </div>
      {!isLoadingProductData && (
        <ProductForm
          data={{
            title: productData?.product.title ?? '',
            categoryId: productData?.product.category.id ?? '',
            description: productData?.product.description ?? '',
            priceInCents: productData?.product.priceInCents,
            file: productData?.product.attachments[0].url ?? '',
            status: productData?.product.status ?? '',
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
