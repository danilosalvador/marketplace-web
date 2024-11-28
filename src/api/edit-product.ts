import { api } from '@/lib/axios'

export interface EditProductBody {
  id: string
  title: string
  categoryId: string
  description: string
  priceInCents: number
  attachmentsIds?: string[]
}

export interface EditProductResponse {
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

export async function editProduct({
  id,
  title,
  categoryId,
  description,
  priceInCents,
  attachmentsIds,
}: EditProductBody) {
  const { data } = await api.put<EditProductResponse>(`/products/${id}`, {
    title,
    categoryId,
    description,
    priceInCents,
    attachmentsIds,
  })

  return data
}
