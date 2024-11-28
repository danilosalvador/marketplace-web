import { api } from '@/lib/axios'

export interface EditProductStatusParams {
  id: string
  status: 'available' | 'sold' | 'cancelled'
}

export interface EditProductStatusResponse {
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

export async function editProductStatus({
  id,
  status,
}: EditProductStatusParams) {
  const { data } = await api.patch<EditProductStatusResponse>(
    `products/${id}/${status}`
  )

  return data
}
