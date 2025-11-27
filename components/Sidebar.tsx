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
    <aside className="w-64 bg-white shadow-lg border-r border-primary-100 flex flex-col">
      <div className="p-6 border-b border-primary-100 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
        <h1 className="text-2xl font-bold text-white mb-1">HTKD</h1>
        <p className="text-sm text-primary-50">Quản lý kinh doanh</p>
      </div>
      
      <nav className="p-4 flex-1 bg-white">
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
                      ? 'bg-gradient-to-r from-primary-400 to-primary-500 text-white font-semibold shadow-lg shadow-primary-200/50 transform scale-105'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600 hover:font-medium'
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
      <div className="p-4 border-t border-primary-100 bg-white">
        {user && (
          <div className="mb-3 p-3 bg-primary-50 rounded-xl border border-primary-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-500 rounded-lg flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-600 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  )
}

