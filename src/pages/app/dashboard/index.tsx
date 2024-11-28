import { Helmet } from 'react-helmet-async'
import { StatsCard } from './components/stats-card'
import { Tag, Store, Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { getMetricsAvailable } from '@/api/get-metrics-available'
import { getMetricsSold } from '@/api/get-metrics-sold'
import { getMetricsViews } from '@/api/get-metrics-views'
import { getMetricsDays } from '@/api/get-metrics-days'
import { StatsChart } from './components/stats-chart'
import { useMemo } from 'react'

export function Dashboard() {
  const { data: metricsAvailable, isLoading: isLoadingMetricsAvailable } =
    useQuery({
      queryKey: ['Metrics', 'Available'],
      queryFn: getMetricsAvailable,
    })

  const { data: metricsSold, isLoading: isLoadingMetricsSold } = useQuery({
    queryKey: ['Metrics', 'Sold'],
    queryFn: getMetricsSold,
  })

  const { data: metricsViews, isLoading: isLoadingMetricsViews } = useQuery({
    queryKey: ['Metrics', 'Views'],
    queryFn: getMetricsViews,
  })

  const { data: metricsDays, isLoading: isLoadingMetricsDays } = useQuery({
    queryKey: ['Metrics', 'Days'],
    queryFn: getMetricsDays,
  })

  return (
    <div className="flex flex-col w-[1030px] gap-10">
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-2">
        <h1 className="font-title text-title-md font-fw-title text-gray-500">
          Últimos 30 dias
        </h1>
        <p className="font-text text-body-sm font-fw-body text-gray-300">
          Confira as estatísticas da sua loja no último mês
        </p>
      </div>
      <div className="flex flex-1 gap-6">
        <div className="flex flex-col gap-4 w-50">
          <StatsCard
            icon={<Tag className="w-10 h-10 text-blue-dark" />}
            description="Produtos Vendidos"
            value={metricsSold?.amount ?? 0}
          />
          <StatsCard
            icon={<Store className="w-10 h-10 text-blue-dark" />}
            description="Produtos anunciados"
            value={metricsAvailable?.amount ?? 0}
          />
          <StatsCard
            icon={<Users className="w-10 h-10 text-gray-300" />}
            description="Pessoas visitantes"
            value={metricsViews?.amount ?? 0}
          />
        </div>
        <div className="flex flex-1">
          {metricsDays?.viewsPerDay && (
            <StatsChart chartData={metricsDays?.viewsPerDay} />
          )}
        </div>
      </div>
    </div>
  )
}
