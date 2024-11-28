import { Link } from 'react-router-dom'

import { ProductTag } from './product-tag'

export interface ProductCardProps {
  product: {
    id: string
    title: string
    description: string
    priceInCents: number
    status: 'available' | 'sold' | 'cancelled'
    owner: {
      name: string
      id: string
      email: string
      phone: string
      avatar: {
        id: string
        url: string
      } | null
    }
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
}

export function ProductCard({ product }: ProductCardProps) {
  const productImageUrl =
    product.attachments.length === 0 ? undefined : product.attachments[0].url

  const statusDescription = {
    available: 'Anunciado',
    sold: 'Vendido',
    cancelled: 'Cancelado',
  }

  const status = statusDescription[product.status]

  return (
    <Link to={`/products/edit/${product.id}`}>
      <div className="flex flex-col p-1 w-[331px] h-min rounded-[20px] bg-white cursor-pointer border-2 border-white hover:border-blue-dark">
        <div
          className="w-auto h-36 bg-cover bg-center rounded-[16px] relative"
          style={{ backgroundImage: `url(${productImageUrl})` }}
        >
          <div className="absolute flex gap-1 top-2 right-2">
            <ProductTag title={status} colorType={product.status} />
            <ProductTag
              title={product.category?.title ?? ''}
              colorType="category"
            />
          </div>
        </div>
        <div className="flex flex-col p-3 gap-2">
          <div className="flex gap-4 items-baseline">
            <h3 className="flex-1 font-text text-subtitle font-fw-subtitle text-gray-400 line-clamp-1">
              {product.title}
            </h3>
            <div className="flex items-baseline gap-1 text-gray-500">
              <span className="font-text text-label-md font-fw-label">R$</span>
              <span className="font-title text-title-sm font-fw-title">
                {product.priceInCents / 100}
              </span>
            </div>
          </div>
          <span className="font-text text-body-sm font-fw-body text-gray-300 line-clamp-2">
            {product.description}
          </span>
        </div>
      </div>
    </Link>
  )
}
