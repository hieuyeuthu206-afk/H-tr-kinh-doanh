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

const stats = [
  {
    name: 'Doanh thu',
    value: '125,000,000',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    name: 'Đơn hàng',
    value: '1,234',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    name: 'Khách hàng',
    value: '5,678',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    name: 'Sản phẩm',
    value: '890',
    change: '+5.1%',
    trend: 'up',
    icon: Package,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

const salesData = [
  { month: 'Tháng 1', sales: 4000, orders: 240 },
  { month: 'Tháng 2', sales: 3000, orders: 198 },
  { month: 'Tháng 3', sales: 5000, orders: 320 },
  { month: 'Tháng 4', sales: 4500, orders: 280 },
  { month: 'Tháng 5', sales: 6000, orders: 380 },
  { month: 'Tháng 6', sales: 5500, orders: 350 },
]

const topProducts = [
  { name: 'Sản phẩm A', sales: 1250, revenue: 25000000 },
  { name: 'Sản phẩm B', sales: 980, revenue: 19600000 },
  { name: 'Sản phẩm C', sales: 750, revenue: 15000000 },
  { name: 'Sản phẩm D', sales: 620, revenue: 12400000 },
  { name: 'Sản phẩm E', sales: 540, revenue: 10800000 },
]

export default function Dashboard() {
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
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-xs text-gray-500">so với tháng trước</span>
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
              {topProducts.map((product, index) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

