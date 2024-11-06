import { ChartLine, Package } from 'lucide-react'
import { NavLink } from './nav-link'

import logo from '../assets/logo.svg'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-20 items-center justify-between gap-6 p-5">
        <img src={logo} alt="" className="w-14" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <ChartLine className="h-5 w-5" />
            Dashboard
          </NavLink>
          <NavLink to="/products">
            <Package className="h-5 w-5" />
            Produtos
          </NavLink>
        </nav>

        <div />
      </div>
    </div>
  )
}
