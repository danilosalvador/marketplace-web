import { createBrowserRouter } from 'react-router-dom'

import { PublicLayout } from './pages/_layouts/public'
import { AppLayout } from './pages/_layouts/app'

import { ErrorPage } from './pages/error'
import { NotFoundPage } from './pages/not-found'

import { Dashboard } from './pages/app/dashboard'
import { Products } from './pages/app/products/products'
import { ProductNew } from './pages/app/products/product-new'
import { ProductEdit } from './pages/app/products/product-edit'

import { SignIn } from './pages/public/sign-in'
import { SignUp } from './pages/public/sign-up'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <Products />,
      },
      {
        path: '/products/new',
        element: <ProductNew />,
      },
      {
        path: '/products/edit/:id',
        element: <ProductEdit />,
      },
    ],
  },
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
