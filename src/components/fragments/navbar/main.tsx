'use client'

import { signOut } from '@/services/auth'
import { AlignLeftIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useUserContext } from '@/contexts/user-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SheetTrigger } from '@/components/ui/sheet'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/lib/supabase/clients/client-component-client'
import { cn } from '@/lib/utils'
import { getNameInitial } from '@/lib/utils/string'

const MainNavbar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const { userInfo, avatar, isLoggedIn, userRole } = useUserContext()
  const t = useTranslations()
  const router = useRouter()

  const handleLogout = async () => {
    const success = await signOut(supabase)

    if (success) {
      toast({
        description: (
          <p>{t('action_success', { action: t('logout').toLowerCase() })}</p>
        ),
      })
      router.push('/login')
    }
  }

  return (
    <div
      className={cn('border-b', className)}
      {...props}
      ref={ref}
    >
      <div className="flex h-16 items-center px-4">
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <SheetTrigger className="block md:hidden">
            <AlignLeftIcon className="h-6 w-6" />
          </SheetTrigger>
          <Link href="/">
            <Image
              src="/images/logo.png"
              width={180}
              height={120}
              alt="Dalkom Kissa"
            />
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
              >
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={setTheme}
              >
                <DropdownMenuRadioItem value="light">
                  {t('light')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  {t('dark')}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  {t('system')}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      className="bg-secondary"
                      src={avatar}
                      alt={`@${userInfo?.username}`}
                    />
                    <AvatarFallback>
                      {userInfo ? getNameInitial(userInfo.name) : ''}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="truncate text-sm font-medium leading-none">
                      {userInfo?.name}
                    </p>
                    <p className="truncate text-xs leading-none text-muted-foreground">
                      {`@${userInfo?.username}`}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  {userRole === 'webadmin' ? (
                    <Link href="/dashboard">
                      <DropdownMenuItem>{t('dashboard')}</DropdownMenuItem>
                    </Link>
                  ) : null}
                  <Link href="/settings">
                    <DropdownMenuItem>{t('settings')}</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  {t('logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="outline">{t('login')}</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
})

export { MainNavbar }

MainNavbar.displayName = 'MainNavbar'

export default MainNavbar
