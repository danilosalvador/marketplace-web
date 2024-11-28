import { api } from '@/lib/axios'

export interface GetMetricsAvailableResponse {
  amount: number
}

export async function getMetricsAvailable() {
  const { data } = await api.get<GetMetricsAvailableResponse>(
    '/sellers/metrics/products/available'
  )

  return data
}
