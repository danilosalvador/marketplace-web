import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { ProductForm, type productFormType } from './components/product-form'

import { createProduct } from '@/api/create-product'
import { attachments } from '@/api/attachments'
import type { GetProductsSellerResponse } from '@/api/get-products-seller'

import { ArrowLeft } from 'lucide-react'

export function ProductNew() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutateAsync: onCreateProduct } = useMutation({
    mutationFn: createProduct,
  })

  const { mutateAsync: onAttachment } = useMutation({
    mutationFn: attachments,
  })

  async function handleSave({
    title,
    categoryId,
    description,
    priceInCents,
    file,
  }: productFormType) {
    try {
      let attachmentsIds: string[] = []

      if (file instanceof FileList && file?.length > 0) {
        const files = new FormData()
        files.append('files', file[0])

        const { attachments } = await onAttachment({ files })

        attachmentsIds = attachments.map(attachment => attachment.id)
      }

      const newProduct = await onCreateProduct({
        title,
        categoryId,
        description,
        priceInCents: !priceInCents ? 0 : priceInCents * 100,
        attachmentsIds,
      })

      const cache = queryClient.getQueriesData<GetProductsSellerResponse>({
        queryKey: ['products'],
      })

      for (const [cacheKey, cacheData] of cache) {
        if (!cacheData) {
          return
        }

        const newCacheData = { ...cacheData }
        newCacheData.products.push(newProduct.product)

        queryClient.setQueryData<GetProductsSellerResponse>(cacheKey, {
          ...newCacheData,
        })
      }

      navigate('/products')
    } catch {
      toast.error('Ocorreu um erro ao editar o produto.')
    }
  }

  return (
    <div className="flex flex-col w-[1030px] min-h-screen gap-10">
      <Helmet title="Novo Produto" />
      <div className="flex">
        <div className="flex flex-col gap-2">
          <Link to="/products">
            <div className="flex text-orange-base gap-2">
              <ArrowLeft width={20} height={20} />
              <span className="font-text text-action-sm font-fw-action">
                Voltar
              </span>
            </div>
          </Link>
          <h1 className="font-title text-title-md font-fw-title text-gray-500">
            Novo Produto
          </h1>
          <p className="font-text text-body-sm font-fw-body text-gray-300">
            Cadastre um produto para venda no marketplace
          </p>
        </div>
      </div>
      <ProductForm
        data={{
          title: '',
          categoryId: '',
          description: '',
          priceInCents: 0,
          file: '',
          status: '',
        }}
        onSave={handleSave}
      />
    </div>
  )
}
