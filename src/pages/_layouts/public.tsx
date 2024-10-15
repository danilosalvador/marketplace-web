import { Outlet } from 'react-router-dom'

export function PublicLayout() {
  return (
    <div>
      <h1>PublicLayout</h1>
      <Outlet />
    </div>
  )
}
