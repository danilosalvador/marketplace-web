import { Outlet } from 'react-router-dom'

import { Header } from '@/components/header'

export function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen antialiased">
      <h1>AppLayout</h1>
      <Header />
      <Outlet />
    </div>
  )
}
