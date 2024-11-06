import { Outlet } from 'react-router-dom'

import logo from '../../assets/logo.svg'
import illustration from '../../assets/illustration.png'

export function PublicLayout() {
  return (
    <div className="grid grid-cols-2 min-h-screen bg-background antialiased">
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-5 p-10">
          <img src={logo} alt="" />
          <div className="flex flex-col">
            <span className="font-title text-title-md font-fw-title text-gray-500">
              Marketplace
            </span>
            <span className="font-text text-body-md text-gray-400">
              Painel de Vendedor
            </span>
          </div>
        </div>
        <img src={illustration} alt="" />
      </div>
      <div className="flex flex-col items-center justify-center bg-white rounded-[32px] m-6 px-20 py-[4.5rem]">
        <Outlet />
      </div>
    </div>
  )
}
