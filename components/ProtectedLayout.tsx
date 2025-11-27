'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'
import Sidebar from './Sidebar'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  // Các route công khai (không cần đăng nhập)
  const publicRoutes = ['/login', '/register']

  useEffect(() => {
    // Nếu đang loading, không làm gì
    if (isLoading) return

    const isPublicRoute = publicRoutes.includes(pathname)

    // Nếu chưa đăng nhập và không phải route công khai → redirect về login
    if (!user && !isPublicRoute) {
      router.push('/login')
    }

    // Nếu đã đăng nhập và đang ở trang login/register → redirect về trang chủ
    if (user && isPublicRoute) {
      router.push('/')
    }
  }, [user, isLoading, pathname, router])

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  // Nếu là route công khai (login/register), không hiển thị Sidebar
  if (publicRoutes.includes(pathname)) {
    return <>{children}</>
  }

  // Nếu chưa đăng nhập, không hiển thị gì (sẽ redirect)
  if (!user) {
    return null
  }

  // Hiển thị layout với Sidebar cho các route được bảo vệ
  return (
    <div className="flex h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}

