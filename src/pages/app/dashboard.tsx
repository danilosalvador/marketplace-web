import { Helmet } from 'react-helmet-async'

export function Dashboard() {
  return (
    <div>
      <Helmet title="Dashboard" />
      <h1 className="font-text font-fw-label text-label-sm leading-default">
        Dashboard
      </h1>
    </div>
  )
}
