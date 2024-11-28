import { ChartLine, Package, Plus } from 'lucide-react'

import { AccountMenu } from './account-menu'
import { NavLink } from './nav-link'

import logo from '../assets/logo.svg'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'

export function Header() {
  function handleNewProduct() {}

  return (
    <div className="border-b">
      <div className="grid grid-cols-3 h-20 items-center gap-6 p-5">
        <img src={logo} alt="" className="w-14" />

        <nav className="flex items-center justify-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <ChartLine className="h-5 w-5" />
            Dashboard
          </NavLink>

          <NavLink to="/products">
            <Package className="h-5 w-5" />
            Produtos
          </NavLink>
        </nav>

        <div className="flex items-center justify-end gap-4">
          <Button asChild onClick={handleNewProduct}>
            <Link to="/products/new" className="flex gap-2 h-10">
              <Plus />
              Novo Produto
            </Link>
          </Button>

          <AccountMenu />
        </div>
        <div />
      </div>
    </div>
  )
}
