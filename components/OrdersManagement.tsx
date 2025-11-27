'use client'

import { useState } from 'react'
import { Search, Eye, Package, CheckCircle, XCircle, Clock } from 'lucide-react'

interface Order {
  id: number
  customerName: string
  products: string
  total: number
  date: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
}

const initialOrders: Order[] = [
  { id: 1, customerName: 'Nguyễn Văn A', products: 'Sản phẩm A x2, Sản phẩm B x1', total: 1300000, date: '2024-01-15', status: 'completed' },
  { id: 2, customerName: 'Trần Thị B', products: 'Sản phẩm C x3', total: 750000, date: '2024-01-16', status: 'processing' },
  { id: 3, customerName: 'Lê Văn C', products: 'Sản phẩm D x1', total: 1200000, date: '2024-01-16', status: 'pending' },
  { id: 4, customerName: 'Phạm Thị D', products: 'Sản phẩm A x1, Sản phẩm E x2', total: 1400000, date: '2024-01-17', status: 'processing' },
  { id: 5, customerName: 'Hoàng Văn E', products: 'Sản phẩm B x4', total: 1200000, date: '2024-01-17', status: 'completed' },
  { id: 6, customerName: 'Nguyễn Văn A', products: 'Sản phẩm C x2', total: 500000, date: '2024-01-18', status: 'cancelled' },
]

export default function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock, label: 'Chờ xử lý' },
      processing: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Package, label: 'Đang xử lý' },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle, label: 'Hoàn thành' },
      cancelled: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle, label: 'Đã hủy' },
    }
    const style = styles[status as keyof typeof styles] || styles.pending
    const Icon = style.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        <Icon className="w-3 h-3" />
        {style.label}
      </span>
    )
  }

  const updateOrderStatus = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status: newStatus } : order
    ))
    setSelectedOrder(null)
  }

  return (
    <div className="p-8 bg-gradient-to-br from-primary-50 via-white to-primary-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-2">
          Quản lý đơn hàng
        </h1>
        <p className="text-gray-600 mt-2 text-lg">Theo dõi và quản lý tất cả đơn hàng</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-sm hover:shadow-md bg-white font-medium"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="processing">Đang xử lý</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-primary-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Mã đơn
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Tổng tiền
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-gray-900">#{order.id.toString().padStart(6, '0')}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customerName}</td>
                  <td className="px-6 py-4 text-gray-700 max-w-xs truncate">{order.products}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                    {order.total.toLocaleString('vi-VN')} VNĐ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-primary-600 hover:text-primary-800 p-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl border border-gray-200 transform transition-all">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Chi tiết đơn hàng #{selectedOrder.id.toString().padStart(6, '0')}
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Khách hàng</p>
                <p className="font-semibold text-gray-900">{selectedOrder.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sản phẩm</p>
                <p className="text-gray-900">{selectedOrder.products}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Ngày đặt</p>
                <p className="text-gray-900">{selectedOrder.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tổng tiền</p>
                <p className="text-xl font-bold text-gray-900">
                  {selectedOrder.total.toLocaleString('vi-VN')} VNĐ
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Trạng thái</p>
                {getStatusBadge(selectedOrder.status)}
              </div>
            </div>
            {selectedOrder.status !== 'completed' && selectedOrder.status !== 'cancelled' && (
              <div className="flex gap-2 mb-4">
                {selectedOrder.status === 'pending' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200"
                  >
                    Bắt đầu xử lý
                  </button>
                )}
                {selectedOrder.status === 'processing' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 font-semibold shadow-lg shadow-green-200 hover:shadow-xl transition-all duration-200"
                  >
                    Hoàn thành
                  </button>
                )}
                <button
                  onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 font-semibold shadow-lg shadow-red-200 hover:shadow-xl transition-all duration-200"
                >
                  Hủy đơn
                </button>
              </div>
            )}
            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all duration-200"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

