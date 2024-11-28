import { api } from '@/lib/axios'

export interface GetMetricsSoldResponse {
  amount: number
}

export async function getMetricsSold() {
  const { data } = await api.get<GetMetricsSoldResponse>(
    '/sellers/metrics/products/sold'
  )

  return data
}
