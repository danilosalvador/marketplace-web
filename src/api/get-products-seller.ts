import { api } from '@/lib/axios'

export interface GetProductsSellerParams {
  status: string | null
  search: string | null
}

export interface GetProductsSellerResponse {
  products: {
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
  }[]
}

export async function getProductsSeller({
  search,
  status,
}: GetProductsSellerParams) {
  const { data } = await api.get<GetProductsSellerResponse>('/products/me', {
    params: {
      status,
      search,
    },
  })

  return data
}
