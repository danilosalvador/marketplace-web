import { Link, useLocation, type LinkProps } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex items-center gap-1.5 px-4 py-3 rounded-[10px] font-text text-action-sm font-fw-action hover:bg-red-50 data-[current=true]:text-orange-base data-[current=true]:bg-red-50"
      {...props}
    />
  )
}
