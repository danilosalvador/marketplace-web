import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'

import { ThemeProvider } from './components/theme/theme-provider'

import { router } from './routes'
import { queryClient } from './lib/react-query'

import './index.css'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | marketplace" />
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider storageKey="marketplace-theme" defaultTheme="dark">
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  )
}
