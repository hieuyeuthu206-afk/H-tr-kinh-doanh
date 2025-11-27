'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3,
  Settings,
  LogOut,
  User
} from 'lucide-react'

const menuItems = [
  { href: '/', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/products', label: 'Sản phẩm', icon: Package },
  { href: '/customers', label: 'Khách hàng', icon: Users },
  { href: '/orders', label: 'Đơn hàng', icon: ShoppingCart },
  { href: '/reports', label: 'Báo cáo', icon: BarChart3 },
  { href: '/settings', label: 'Cài đặt', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <aside className="w-64 bg-gradient-to-b from-white via-gray-50 to-white shadow-xl border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
        <h1 className="text-2xl font-bold text-white mb-1">HTKD</h1>
        <p className="text-sm text-primary-100">Quản lý kinh doanh</p>
      </div>
      
      <nav className="p-4 flex-1">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-md shadow-primary-200 transform scale-105'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600 hover:font-medium'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-3 p-3 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}

