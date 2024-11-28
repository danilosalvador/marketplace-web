import { api } from '@/lib/axios'

export interface CreateSellerBody {
  name: string
  phone: string
  email: string
  avatarId: string
  password: string
  passwordConfirmation: string
}

export interface CreateSellerResponse {
  seller: {
    id: string
    name: string
    phone: string
    email: string
    avatar: {
      id: string
      url: string
    }
  }
}

export async function createSeller({
  name,
  phone,
  email,
  avatarId,
  password,
  passwordConfirmation,
}: CreateSellerBody) {
  const { data } = await api.post<CreateSellerResponse>('sellers', {
    name,
    phone,
    email,
    avatarId,
    password,
    passwordConfirmation,
  })

  return data
}
