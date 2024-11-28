import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { signIn } from '@/api/sign-in'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Lock, Mail } from 'lucide-react'

const signInModel = z.object({
  email: z.string().email(),
  password: z.string(),
})

type signInForm = z.infer<typeof signInModel>

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<signInForm>({
    defaultValues: {
      email: searchParams.get('email') ?? '',
    },
  })

  const { mutateAsync: onSignIn } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn({ email, password }: signInForm) {
    try {
      const token = await onSignIn({
        email,
        password,
      })
      console.log(token)
      //localStorage.setItem("auth", JSON.stringify(token));

      navigate('/')
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex flex-col flex-1 items-center justify-between w-96">
        <div className="flex flex-col gap-9 w-full">
          <div className="flex flex-col gap-1">
            <h1 className="font-title text-title-md font-fw-title tracking-tight text-gray-500">
              Acesse sua conta
            </h1>
            <p className="font-text text-body-sm text-gray-300">
              Informe seu e-mail e senha para entrar
            </p>
          </div>
          <form
            onSubmit={handleSubmit(handleSignIn)}
            className="flex flex-col gap-9"
          >
            <div className="space-y-8">
              <Input
                id="email"
                type="email"
                label="E-mail"
                icon={<Mail />}
                placeholder="Seu e-mail cadastrado"
                {...register('email')}
              />
              <Input
                id="password"
                type="password"
                label="Senha"
                icon={<Lock />}
                placeholder="Sua senha de acesso"
                {...register('password')}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              Acessar
            </Button>
          </form>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <span className="font-text text-body-md text-gray-300">
            Ainda não tem conta?
          </span>
          <Button asChild variant="outline">
            <Link to="/sign-up">Cadastrar</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
