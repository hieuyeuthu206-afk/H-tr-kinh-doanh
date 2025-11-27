'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Download, FileText } from 'lucide-react'

const monthlyRevenue = [
  { month: 'Tháng 1', revenue: 40000000, profit: 12000000 },
  { month: 'Tháng 2', revenue: 35000000, profit: 10500000 },
  { month: 'Tháng 3', revenue: 50000000, profit: 15000000 },
  { month: 'Tháng 4', revenue: 45000000, profit: 13500000 },
  { month: 'Tháng 5', revenue: 60000000, profit: 18000000 },
  { month: 'Tháng 6', revenue: 55000000, profit: 16500000 },
]

const categoryData = [
  { name: 'Điện tử', value: 35, revenue: 35000000 },
  { name: 'Thời trang', value: 28, revenue: 28000000 },
  { name: 'Gia dụng', value: 20, revenue: 20000000 },
  { name: 'Khác', value: 17, revenue: 17000000 },
]

const COLORS = ['#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981']

export default function ReportsPage() {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
            Báo cáo & Phân tích
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Xem các báo cáo chi tiết về hoạt động kinh doanh</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 shadow-lg shadow-primary-200 hover:shadow-xl hover:shadow-primary-300 transform hover:-translate-y-0.5 font-semibold">
          <Download className="w-5 h-5" />
          Xuất báo cáo
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-600 mb-2">Tổng doanh thu</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">285,000,000 VNĐ</p>
          <p className="text-sm font-semibold text-green-600 mt-2">+15.3% so với kỳ trước</p>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-600 mb-2">Tổng lợi nhuận</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">85,500,000 VNĐ</p>
          <p className="text-sm font-semibold text-green-600 mt-2">+15.3% so với kỳ trước</p>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-600 mb-2">Tổng đơn hàng</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">1,768</p>
          <p className="text-sm font-semibold text-green-600 mt-2">+12.5% so với kỳ trước</p>
        </div>
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
          <p className="text-sm font-medium text-gray-600 mb-2">Tỷ lệ chuyển đổi</p>
          <p className="text-3xl font-bold text-gray-900 mb-2">3.2%</p>
          <p className="text-sm font-semibold text-green-600 mt-2">+0.5% so với kỳ trước</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue & Profit Chart */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            Doanh thu & Lợi nhuận
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => value.toLocaleString('vi-VN') + ' VNĐ'} />
              <Legend />
              <Bar dataKey="revenue" fill="#0ea5e9" name="Doanh thu" />
              <Bar dataKey="profit" fill="#10b981" name="Lợi nhuận" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
            Phân bổ theo danh mục
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => value + '%'} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 mb-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
          Xu hướng doanh thu
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toLocaleString('vi-VN') + ' VNĐ'} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#0ea5e9" strokeWidth={2} name="Doanh thu" />
            <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} name="Lợi nhuận" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Revenue Table */}
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
          Doanh thu theo danh mục
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Danh mục</th>
                <th className="text-right py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Tỷ lệ</th>
                <th className="text-right py-4 px-4 text-gray-700 font-bold text-sm uppercase tracking-wider">Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((category, index) => (
                <tr key={category.name} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-colors duration-200">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-lg shadow-sm"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-semibold text-gray-900">{category.name}</span>
                    </div>
                  </td>
                  <td className="text-right py-4 px-4 text-gray-700 font-medium">{category.value}%</td>
                  <td className="text-right py-4 px-4 font-bold text-gray-900 text-lg">
                    {category.revenue.toLocaleString('vi-VN')} VNĐ
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

