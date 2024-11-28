import { cn } from '@/lib/utils'

export interface ProductTagProps {
  title: string
  colorType: 'category' | 'available' | 'sold' | 'cancelled'
}

export function ProductTag({ title, colorType }: ProductTagProps) {
  const colors = {
    category: 'bg-[#3D3D3D]',
    available: 'bg-[#009CF0]',
    sold: 'bg-[#28A745]',
    cancelled: 'bg-[#666666]',
  }

  const color = colors[colorType]

  return (
    <div
      className={cn(
        'flex items-center justify-center w-min h-5 px-2 rounded-full font-text text-label-sm font-fw-label text-white',
        color
      )}
    >
      <span className="font-text text-label-sm font-fw-label text-white">
        {title}
      </span>
    </div>
  )
}
