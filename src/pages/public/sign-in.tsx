import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Helmet } from 'react-helmet-async'

export function SignIn() {
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
          <form className="flex flex-col gap-12">
            <div className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Seu e-mail cadastrado"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Sua senha de acesso"
                />
              </div>
            </div>
            <Button type="submit">Acessar</Button>
          </form>
        </div>
        <div className="flex flex-col gap-5 w-full">
          <span className="font-text text-body-md text-gray-300">
            Ainda não tem conta?
          </span>
          <Button variant="outline">Cadastrar</Button>
        </div>
      </div>
    </>
  )
}
