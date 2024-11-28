import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSearchParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { Search, Tag } from 'lucide-react'

const productFilterSchema = z.object({
  search: z.string().optional(),
  status: z.string().optional(),
})

type productFilterType = z.infer<typeof productFilterSchema>

//https://github.com/shadcn-ui/ui/discussions/1552
export function ProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const paramSearch = searchParams.get('search')
  const paramStatus = searchParams.get('status')

  const { register, handleSubmit, control, reset } = useForm({
    resolver: zodResolver(productFilterSchema),
    defaultValues: {
      search: paramSearch ?? '',
      status: paramStatus ?? 'all',
    },
  })

  function saveSearchParams(name: string, value: string | undefined) {
    setSearchParams(prev => {
      if (value) {
        prev.set(name, value)
      } else {
        prev.delete(name)
      }

      return prev
    })
  }

  function handleFilter({ search, status }: productFilterType) {
    saveSearchParams('search', search)
    saveSearchParams('status', status)
  }

  function handleClearFilter() {
    saveSearchParams('search', '')
    saveSearchParams('status', '')

    reset({
      search: '',
      status: 'all',
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="flex flex-col w-80 h-min gap-6 p-6 rounded-[20px] bg-white"
    >
      <h2 className="font-title text-title-sm font-fw-title text-gray-300">
        Filtrar
      </h2>
      <div className="flex flex-col gap-3 text-gray-300">
        <Input
          placeholder="Pesquisar"
          className="h-12 w-auto"
          icon={<Search />}
          {...register('search')}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
              <SelectTrigger className="h-12 w-auto">
                <div className="flex items-center gap-2">
                  <Tag width={24} height={24} />
                  <SelectValue />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos status</SelectItem>
                <SelectItem value="available">Anunciado</SelectItem>
                <SelectItem value="sold">Vendido</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Button type="submit" size="lg">
          Aplicar Filtro
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleClearFilter}
        >
          Limpar filtros
        </Button>
      </div>
    </form>
  )
}
