import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { ImageUp } from 'lucide-react'

import { getCategories } from '@/api/get-categories'
import { Link } from 'react-router-dom'
import { ProductTag } from './product-tag'

const ACCEPTED_IMAGES_TYPE = ['image/png', 'image/jpeg']

const productFormSchema = z.object({
  title: z.string(),
  categoryId: z.string(),
  description: z.string(),
  priceInCents: z
    .preprocess(
      a => Number.parseInt(z.string().parse(a), 10),
      z.number().gte(0.01, 'Must be 0.01 and above')
    )
    .optional(),
  status: z.custom<'' | 'available' | 'sold' | 'cancelled'>(),
  file: z
    .custom<FileList>()
    .refine(
      files => Array.from(files ?? []).length !== 0,
      'A imagem é obrigatória.'
    )
    .refine(
      files =>
        Array.from(files ?? []).every(file => {
          console.log(file.type)
          return ACCEPTED_IMAGES_TYPE.includes(file.type)
        }),
      'O tipo do arquivo tem que ser uma imagem PNG ou JPG.'
    )
    .or(z.string()),
})

export type productFormType = z.infer<typeof productFormSchema>

export interface ProductFormProps {
  data: productFormType
  onSave: (data: productFormType) => Promise<void>
}

export function ProductForm({
  data: { title, categoryId, description, priceInCents, file, status },
  onSave,
}: ProductFormProps) {
  const [profileImage, setProfileImage] = useState<string | FileList | null>(
    file
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<productFormType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      title,
      categoryId,
      description,
      priceInCents: !priceInCents ? 0 : priceInCents / 100,
      file,
    },
  })

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  function handleChangeProfileImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const f = event.target.files?.[0]

    if (f) {
      const reader = new FileReader()
      reader.onload = e => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(f)
    }
  }

  const inputFileUpload = register('file', { required: true })
  const statusDescriptions = {
    available: 'Anunciado',
    sold: 'Vendido',
    cancelled: 'Cancelado',
  }

  const statusDescription = !status ? '' : statusDescriptions[status]

  return (
    <form
      className="flex justify-between gap-6"
      onSubmit={handleSubmit(onSave)}
    >
      <div className="w-[415px] h-auto">
        <div>
          <Label
            className={cn(
              'relative flex items-center justify-center rounded-[12px] w-[415px] h-[340px] text-orange-base cursor-pointer bg-cover bg-center bg-[#F5EAEA] hover:bg-orange-base hover:text-white',
              !!file &&
                !!profileImage &&
                `before:hover:content-[""] before:hover:absolute before:hover:inset-0 before:hover:bg-black before:hover:opacity-25 before:hover:rounded-[12px]`
            )}
            style={{
              backgroundImage: profileImage ? `url(${profileImage})` : 'none',
            }}
          >
            {!file && <ImageUp />}
            <input
              type="file"
              className="hidden"
              {...register('file')}
              onChange={event => {
                inputFileUpload.onChange(event)
                handleChangeProfileImage(event)
              }}
              disabled={!!file}
            />
          </Label>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-8 p-8 rounded-[20px] bg-white">
        <div className="flex items-center">
          <h2 className="flex-1 font-title text-title-sm font-fw-title text-gray-300">
            Dados do produto
          </h2>
          {!!status && (
            <ProductTag title={statusDescription} colorType={status} />
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Título"
            placeholder="Nome do Produto"
            {...register('title')}
          />
          <Input
            type="number"
            step={0.01}
            label="Valor"
            placeholder="0,00"
            icon={'R$'}
            {...register('priceInCents')}
          />
          <div className="col-span-2">
            <Textarea
              className="h-32 align-top placeholder:align-top"
              label="Descrição"
              placeholder="Escreva detalhes sobre o produto, tamanho, características"
              {...register('description')}
            />
          </div>
          <div className="col-span-2">
            <Label
              htmlFor={'category'}
              className="font-text text-[.75rem] text-gray-300 uppercase"
            >
              Categoria
            </Label>
            <Controller
              control={control}
              name="categoryId"
              render={({ field: { name, onChange, value, disabled } }) => (
                <Select
                  name={name}
                  onValueChange={onChange}
                  value={value}
                  disabled={disabled}
                >
                  <SelectTrigger className="h-12 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.categories.map(({ id, title }) => (
                      <SelectItem key={id} value={id}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            asChild
            variant="outline"
            className="flex-1"
            disabled={isSubmitting}
          >
            <Link to="/products">Cancelar</Link>
          </Button>
          <Button
            type="submit"
            variant="default"
            className="flex-1"
            disabled={
              isSubmitting || status === 'sold' || status === 'cancelled'
            }
          >
            Salvar
          </Button>
        </div>
      </div>
    </form>
  )
}
