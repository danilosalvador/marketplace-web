import colors from 'tailwindcss/colors'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CalendarDays, Users } from 'lucide-react'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

export interface StatsChartProps {
  chartData: {
    date: Date
    amount: number
  }[]
}

export function StatsChart({ chartData }: StatsChartProps) {
  const dateBegin = dayjs(new Date(chartData[0].date)).format('DD [de] MMMM')
  const dateEnd = dayjs(new Date(chartData[chartData.length - 1].date)).format(
    'DD [de] MMMM'
  )

  return (
    <div className="flex flex-col gap-7 w-full p-6 rounded-[20px] bg-white">
      <div className="flex items-center justify-between">
        <h2 className="font-title text-title-sm font-fw-title text-gray-500">
          Visitantes
        </h2>
        <div className="flex gap-2 items-center">
          <CalendarDays className="text-blue-dark" width={16} height={16} />
          <span className="font-text text-label-md font-fw-label">{`${dateBegin} - ${dateEnd}`}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis
            className="font-text text-label-sm font-fw-label text-gray-200"
            tickLine={false}
            axisLine={false}
            dy={10}
            dataKey="date"
            tickFormatter={(value: Date) => dayjs(value).date().toString()}
          />
          <YAxis
            className="font-text text-body-xs font-fw-body text-gray-200"
            stroke="#888"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) =>
              value.toLocaleString('pt-BR', {
                style: 'decimal',
              })
            }
          />
          <CartesianGrid vertical={false} className="stroke-muted" />
          <Line
            type="monotone"
            strokeWidth={2}
            dataKey="amount"
            stroke={colors.blue[500]}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="flex flex-col gap-2 p-3 rounded-[8px] bg-white drop-shadow-lg">
                    <span className="font-text text-label-sm font-fw-label text-gray-400">
                      {dayjs(label).format('DD [de] MMMM')}
                    </span>
                    <div className="flex gap-2 items-center text-gray-300">
                      <Users width={16} height={16} />
                      <span className="font-text text-body-xs font-fw-body">{`${payload[0].value} visitantes`}</span>
                    </div>
                  </div>
                )
              }
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
