'use client'

import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getStorageItem, StorageKeys } from '@/utils/storage'

interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
  totalOrders: number
  totalSpent: number
}

interface Order {
  id: number
  customerName: string
  products: string
  total: number
  date: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const savedProducts = getStorageItem<any[]>(StorageKeys.PRODUCTS, [])
    const savedCustomers = getStorageItem<any[]>(StorageKeys.CUSTOMERS, [])
    const savedOrders = getStorageItem<any[]>(StorageKeys.ORDERS, [])

    setProducts(savedProducts.map(p => ({
      ...p,
      status: (p.status === 'active' || p.status === 'inactive') ? p.status : 'inactive'
    })))

    setCustomers(savedCustomers)
    setOrders(savedOrders)
  }, [])

  // Tính toán số liệu thực tế
  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + (order.total || 0), 0)

  const totalOrders = orders.length
  const totalCustomers = customers.length
  const totalProducts = products.length

  // Tính toán doanh thu theo tháng (6 tháng gần nhất)
  const getMonthlyData = () => {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6']
    const currentMonth = new Date().getMonth()
    
    return months.map((monthName, index) => {
      const monthIndex = (currentMonth - 5 + index + 12) % 12
      const year = new Date().getFullYear()
      const monthStart = new Date(year, monthIndex, 1)
      const monthEnd = new Date(year, monthIndex + 1, 0)
      
      const monthOrders = orders.filter(order => {
        const orderDate = new Date(order.date)
        return orderDate >= monthStart && orderDate <= monthEnd
      })

      const monthRevenue = monthOrders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + (order.total || 0), 0)

      return {
        month: monthName,
        sales: monthRevenue,
        orders: monthOrders.length
      }
    })
  }

  const salesData = getMonthlyData()

  // Tính toán top products từ orders
  const getTopProducts = () => {
    const productSales: { [key: string]: { sales: number, revenue: number } } = {}

    orders
      .filter(order => order.status === 'completed')
      .forEach(order => {
        // Parse products từ string (ví dụ: "Sản phẩm A x2, Sản phẩm B x1")
        const productMatches = order.products.match(/(.+?)\s+x(\d+)/g) || []
        
        productMatches.forEach(match => {
          const [, productName, quantity] = match.match(/(.+?)\s+x(\d+)/) || []
          const qty = parseInt(quantity) || 1
          
          // Tìm giá sản phẩm từ products list
          const product = products.find(p => p.name === productName.trim())
          const productPrice = product?.price || 0
          const revenue = productPrice * qty

          if (productName) {
            if (!productSales[productName.trim()]) {
              productSales[productName.trim()] = { sales: 0, revenue: 0 }
            }
            productSales[productName.trim()].sales += qty
            productSales[productName.trim()].revenue += revenue
          }
        })
      })

    return Object.entries(productSales)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)
  }

  const topProducts = getTopProducts()

  // Stats với dữ liệu thực tế
  const stats = [
    {
      name: 'Doanh thu',
      value: totalRevenue.toLocaleString('vi-VN'),
      change: totalOrders > 0 ? 'Từ đơn hàng' : 'Chưa có',
      trend: totalRevenue > 0 ? 'up' : 'neutral' as 'up' | 'down' | 'neutral',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Đơn hàng',
      value: totalOrders.toLocaleString('vi-VN'),
      change: `${orders.filter(o => o.status === 'completed').length} hoàn thành`,
      trend: totalOrders > 0 ? 'up' : 'neutral' as 'up' | 'down' | 'neutral',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Khách hàng',
      value: totalCustomers.toLocaleString('vi-VN'),
      change: `${customers.filter(c => c.totalOrders > 0).length} đã mua`,
      trend: totalCustomers > 0 ? 'up' : 'neutral' as 'up' | 'down' | 'neutral',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      name: 'Sản phẩm',
      value: totalProducts.toLocaleString('vi-VN'),
      change: `${products.filter(p => p.status === 'active').length} đang bán`,
      trend: totalProducts > 0 ? 'up' : 'neutral' as 'up' | 'down' | 'neutral',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ]
  return (
    <div className="p-8 bg-gradient-to-br from-primary-50 via-white to-primary-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 bg-clip-text text-transparent mb-2">
          Tổng quan
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Chào mừng trở lại! Đây là tổng quan hoạt động kinh doanh của bạn.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={stat.name} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-primary-100 hover:border-primary-300 transform hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-2">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mb-3">{stat.value}</p>
                  <div className="flex items-center gap-1.5">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : stat.trend === 'down' ? (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    ) : null}
                    <span className={`text-sm font-semibold ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-xl shadow-sm`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-primary-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-400 to-primary-500 rounded-full"></div>
            Doanh thu theo tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="sales" 
                stroke="#0ea5e9" 
                strokeWidth={3} 
                name="Doanh thu (VNĐ)"
                dot={{ fill: '#0ea5e9', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-primary-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-primary-300 to-primary-400 rounded-full"></div>
            Số lượng đơn hàng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }} 
              />
              <Legend />
              <Bar 
                dataKey="orders" 
                fill="url(#colorGradient)" 
                name="Số đơn hàng"
                radius={[8, 8, 0, 0]}
              >
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity={1}/>
                  </linearGradient>
                </defs>
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-primary-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-primary-500 to-primary-600 rounded-full"></div>
          Sản phẩm bán chạy
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Sản phẩm</th>
                <th className="text-right py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Số lượng bán</th>
                <th className="text-right py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>Chưa có dữ liệu bán hàng</p>
                  </td>
                </tr>
              ) : (
                topProducts.map((product, index) => (
                <tr key={product.name} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-sm ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-500' :
                        'bg-gradient-to-br from-primary-500 to-primary-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-semibold text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700 font-medium">{product.sales.toLocaleString('vi-VN')}</td>
                  <td className="text-right py-4 px-4 font-bold text-gray-900 text-lg">
                    {product.revenue.toLocaleString('vi-VN')} VNĐ
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

