import { api } from '@/lib/axios'

export interface GetProductIdParams {
  id: string
}

export interface GetProductIdResponse {
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
    category: {
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

export async function getProductId({ id }: GetProductIdParams) {
  const { data } = await api.get<GetProductIdResponse>(`/products/${id}`)

  return data
}
