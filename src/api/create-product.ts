import { api } from '@/lib/axios'

export interface CreateProductBody {
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds?: string[]
}

export interface CreateProductResponse {
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

export async function createProduct({
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: CreateProductBody) {
  const { data } = await api.post<CreateProductResponse>('/products', {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })

  return data
}
