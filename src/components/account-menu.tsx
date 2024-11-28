import { useMutation, useQuery } from '@tanstack/react-query'
import { LogOut, User } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

import { getSellerProfile } from '@/api/get-seller-profile'
import { signOut } from '@/api/sign-out'
import { useNavigate } from 'react-router-dom'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getSellerProfile,
  })

  const { mutateAsync: handleSignOut, isPending: isPendingSignOut } =
    useMutation({
      mutationFn: signOut,
      onSuccess: () => {
        navigate('/sign-in', { replace: true })
      },
    })

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-12 p-0 select-none overflow-hidden"
        >
          {isLoadingProfile || !profile?.seller?.avatar ? (
            <User className="text-orange-base" width={48} height={48} />
          ) : (
            <img src={profile?.seller.avatar.url} alt="" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2 w-44 p-3">
        <DropdownMenuLabel className="flex gap-3 items-center text-gray-300">
          {isLoadingProfile || !profile?.seller?.avatar ? (
            <User width={32} height={32} />
          ) : (
            <img
              className="w-8 h-8 rounded-[8px]"
              src={profile?.seller.avatar.url}
              alt=""
            />
          )}
          <span className="font-text text-body-sm font-fw-body">
            {isLoadingProfile ? (
              <Skeleton className="w-20 h-4" />
            ) : (
              profile?.seller.name
            )}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="flex items-center text-orange-base"
          disabled={isPendingSignOut}
        >
          <button
            type="button"
            className="w-full"
            onClick={() => handleSignOut()}
          >
            <span className="font-text text-action-sm font-fw-action mr-auto">
              Sair
            </span>
            <LogOut width={20} height={20} />
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
