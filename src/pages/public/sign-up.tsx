import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { ImageUp, Lock, Mail, Phone, User } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { attachments } from '@/api/attachments'
import { createSeller } from '@/api/create-seller'
import { zodResolver } from '@hookform/resolvers/zod'
import { FieldHelperMessage } from '@/components/field-helper-message'

const ACCEPTED_IMAGES_TYPE = ['image/png', 'image/jpeg']

const signUpSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome é obrigatório.' }),
    phone: z.string().min(1, { message: 'Telefone é obrigatório.' }),
    email: z
      .string()
      .min(1, { message: 'E-mail é obrigatório.' })
      .email({ message: 'E-mail inválido.' }),
    password: z
      .string()
      .min(8, { message: 'Mínimo de 8 caracteres.' })
      .refine(password => /[A-Z]/.test(password), {
        message: 'Deve conter pelo menos uma letra maiúscula.',
      })
      .refine(password => /[a-z]/.test(password), {
        message: 'Deve conter pelo menos uma letra minúscula.',
      })
      .refine(password => /[0-9]/.test(password), {
        message: 'Deve conter pelo menos um número.',
      })
      .refine(password => /[!@#$%^&*]/.test(password), {
        message: 'Deve conter pelo menos um carácter especial.',
      }),
    passwordConfirmation: z
      .string()
      .min(1, { message: 'Confirmação da senha é obrigatório.' }),
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
      ),
  })
  .refine(values => values.password === values.passwordConfirmation, {
    message: 'As senhas não correspondem.',
    path: ['passwordConfirmation'],
  })

type signUpType = z.infer<typeof signUpSchema>

export function SignUp() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<signUpType>({
    resolver: zodResolver(signUpSchema),
  })

  const { mutateAsync: onAttachment } = useMutation({
    mutationFn: attachments,
  })

  const { mutateAsync: onCreateSeller } = useMutation({
    mutationFn: createSeller,
  })

  async function handleSignUp({
    name,
    phone,
    email,
    password,
    passwordConfirmation,
    file,
  }: signUpType) {
    try {
      if ((file?.length ?? 0) > 0) {
        const files = new FormData()
        files.append('files', file[0])

        const { attachments } = await onAttachment({ files })

        await onCreateSeller({
          name,
          phone,
          email,
          password,
          passwordConfirmation,
          avatarId: attachments[0].id,
        })

        toast.success('Cadastro realizado com sucesso!', {
          action: {
            label: 'Login',
            onClick: () => navigate(`/sign-in?email=${email}`),
          },
        })

        reset()
      }
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o usuário.')
    }
  }

  function handleChangeProfileImage(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (file) {
      const reader = new FileReader()
      reader.onload = e => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const inputFileUpload = register('file', { required: true })

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex flex-col flex-1 items-center w-96">
        <div className="flex flex-col gap-9 w-full overflow-auto">
          <div className="flex flex-col gap-1">
            <h1 className="font-title text-title-md font-fw-title tracking-tight text-gray-500">
              Crie sua conta
            </h1>
            <p className="font-text text-body-sm text-gray-300">
              Informe os seus dados pessoais e de acesso
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-5">
              <h2 className="font-title text-title-sm font-fw-title tracking-tight text-gray-500">
                Perfil
              </h2>
              <div className="space-y-5">
                <div>
                  <Label
                    className={cn(
                      'relative flex items-center justify-center rounded-[12px] w-32 h-32 text-orange-base cursor-pointer bg-cover bg-center bg-[#F5EAEA] hover:bg-orange-base hover:text-white',
                      !!profileImage &&
                        `before:hover:content-[""] before:hover:absolute before:hover:inset-0 before:hover:bg-black before:hover:opacity-25 before:hover:rounded-[12px]`
                    )}
                    style={{
                      backgroundImage: profileImage
                        ? `url(${profileImage})`
                        : 'none',
                    }}
                  >
                    <ImageUp />
                    <input
                      type="file"
                      className="hidden"
                      {...register('file')}
                      onChange={event => {
                        inputFileUpload.onChange(event)
                        handleChangeProfileImage(event)
                      }}
                    />
                  </Label>
                  {errors.file?.message && (
                    <div className="mt-1">
                      <FieldHelperMessage message={errors.file.message} />
                    </div>
                  )}
                </div>
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Seu nome completo"
                  icon={<User />}
                  helperText={errors.name?.message}
                  {...register('name')}
                />
                <Input
                  id="phone"
                  type="tel"
                  label="Telefone"
                  placeholder="(00) 00000-0000"
                  icon={<Phone />}
                  helperText={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-title text-title-sm font-fw-title tracking-tight text-gray-500">
                Acesso
              </h2>
              <div className="space-y-5">
                <Input
                  id="email"
                  type="email"
                  label="E-mail"
                  placeholder="Seu e-mail de acesso"
                  icon={<Mail />}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  id="password"
                  type="password"
                  label="Senha"
                  placeholder="Senha de acesso"
                  icon={<Lock />}
                  helperText={errors.password?.message}
                  {...register('password')}
                />
                <Input
                  id="password-confirm"
                  type="password"
                  label="Confirmar senha"
                  placeholder="Confirme a senha"
                  icon={<Lock />}
                  helperText={errors.passwordConfirmation?.message}
                  {...register('passwordConfirmation')}
                />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </form>
          <div className="flex flex-col gap-5 w-full">
            <span className="font-text text-body-md text-gray-300">
              Já tem uma conta?
            </span>
            <Button asChild variant="outline">
              <Link to="/sign-in">Acessar</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
