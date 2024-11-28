import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { getProductsSeller } from '@/api/get-products-seller'

import { ProductFilter } from './components/product-filter'
import { ProductCardSkeleton } from './components/product-card-skeleton'
import { ProductCard } from './components/product-card'
import { Helmet } from 'react-helmet-async'

export function Products() {
  const [searchParams] = useSearchParams()

  const paramSearch = searchParams.get('search')
  const paramStatus = searchParams.get('status')

  const { data: resultProducts, isLoading: isLoadingProducts } = useQuery({
    queryKey: ['products', paramSearch, paramStatus],
    queryFn: () =>
      getProductsSeller({
        search: paramSearch,
        status: paramStatus === 'all' ? null : paramStatus,
      }),
  })

  return (
    <div className="flex flex-col w-[1030px] min-h-screen gap-10">
      <Helmet title="Produtos" />
      <div className="flex flex-col gap-2">
        <h1 className="font-title text-title-md font-fw-title">
          Seus produtos
        </h1>
        <p className="font-text text-body-sm font-fw-body">
          Acesse gerencie a sua lista de produtos à venda
        </p>
      </div>

      <div className="flex w-full gap-6">
        <ProductFilter />
        <div className="grid grid-cols-2 gap-4 w-[678px]">
          {isLoadingProducts &&
            Array.from({
              length: 5,
            }).map(_ => <ProductCardSkeleton key={`p-${_}`} />)}
          {resultProducts?.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
