import { Skeleton } from '@/components/ui/skeleton'

export function ProductCardSkeleton() {
  return (
    <div className="w-[331px] h-[235px] bg-gray-100 rounded-[20px]">
      <Skeleton className="p-1 w-[331px] h-[250px]" />
    </div>
  )
}
