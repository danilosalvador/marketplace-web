import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpModel = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  password: z.string(),
  passwordConfirm: z.string(),
})

type signUpForm = z.infer<typeof signUpModel>

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signUpForm>()

  async function handleSignUp({
    name,
    phone,
    email,
    password,
    passwordConfirm,
  }: signUpForm) {
    console.log(name)
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="flex flex-col flex-1 items-center w-98">
        <div className="flex flex-col gap-9">
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
              <div className="space-y-1">imagem</div>
              <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Seu nome completo"
                  {...register('name')}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <h2 className="font-title text-title-sm font-fw-title tracking-tight text-gray-500">
                Acesso
              </h2>
              <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail de acesso"
                  {...register('email')}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha de acesso"
                  {...register('password')}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password-confirm">Confirmar senha</Label>
                <Input
                  id="password-confirm"
                  type="password"
                  placeholder="Confirm a senha"
                  {...register('passwordConfirm')}
                />
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Cadastrar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
