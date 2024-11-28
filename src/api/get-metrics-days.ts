import { api } from '@/lib/axios'

export interface GetMetricsDaysResponse {
  viewsPerDay: [
    {
      date: Date
      amount: number
    },
  ]
}

export async function getMetricsDays() {
  const { data } = await api.get<GetMetricsDaysResponse>(
    '/sellers/metrics/views/days'
  )

  return data
}
