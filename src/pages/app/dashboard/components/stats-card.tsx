import type { ReactNode } from 'react'

export interface StatsCardProps {
  description: string
  value: number
  icon: ReactNode
}

export function StatsCard({ description, value, icon }: StatsCardProps) {
  return (
    <div className="flex gap-4 w-56 p-3 bg-white rounded-[20px]">
      <div className="w-20 h-full flex items-center justify-center bg-blue-light rounded-[12px]">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-title text-title-lg font-fw-title text-gray-400">
          {value}
        </p>
        <span className="font-text text-body-xs font-fw-body text-gray-300 line-clamp-2">
          {description}
        </span>
      </div>
    </div>
  )
}
