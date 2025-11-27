# Hệ Thống Quản Lý Kinh Doanh (HTKD)

Trang web hỗ trợ quản lý kinh doanh hiện đại với đầy đủ các tính năng cần thiết.

## Tính năng

- 📊 **Dashboard**: Tổng quan hoạt động kinh doanh với biểu đồ và thống kê
- 📦 **Quản lý sản phẩm**: Thêm, sửa, xóa sản phẩm và quản lý tồn kho
- 👥 **Quản lý khách hàng**: Quản lý thông tin khách hàng và lịch sử mua hàng
- 🛒 **Quản lý đơn hàng**: Theo dõi và xử lý đơn hàng
- 📈 **Báo cáo & Phân tích**: Xem các báo cáo chi tiết về doanh thu và lợi nhuận
- ⚙️ **Cài đặt**: Tùy chỉnh thông tin doanh nghiệp và hệ thống

## Công nghệ sử dụng

- **Next.js 14**: Framework React với App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Styling hiện đại
- **Recharts**: Biểu đồ và đồ thị
- **Lucide React**: Icon library

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng ở chế độ development:
```bash
npm run dev
```

3. Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000)

## Build cho production

```bash
npm run build
npm start
```

## Deploy lên Internet

Xem file [DEPLOY.md](./DEPLOY.md) để biết hướng dẫn chi tiết.

### Deploy nhanh với Vercel (Khuyến nghị)

1. **Chuẩn bị code trên GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/your-repo.git
git push -u origin main
```

2. **Deploy trên Vercel:**
   - Truy cập https://vercel.com
   - Đăng nhập bằng GitHub
   - Click "Add New Project"
   - Chọn repository từ GitHub
   - Click "Deploy"
   - Website sẽ có URL: `your-project.vercel.app`

### Các phương án deploy khác:
- **Netlify**: Kéo thả hoặc kết nối GitHub
- **Railway**: Deploy tự động từ GitHub
- **VPS/Server**: Xem hướng dẫn trong DEPLOY.md

### Kiểm tra trước khi deploy:
```bash
# Test build
npm run build

# Test production server
npm start
```

## Cấu trúc dự án

```
htkd/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Trang chủ (Dashboard)
│   ├── products/          # Trang quản lý sản phẩm
│   ├── customers/         # Trang quản lý khách hàng
│   ├── orders/            # Trang quản lý đơn hàng
│   ├── reports/           # Trang báo cáo
│   └── settings/          # Trang cài đặt
├── components/             # React components
│   ├── Dashboard.tsx
│   ├── ProductsManagement.tsx
│   ├── CustomersManagement.tsx
│   ├── OrdersManagement.tsx
│   ├── ReportsPage.tsx
│   ├── SettingsPage.tsx
│   └── Sidebar.tsx
└── package.json
```

## Tính năng chi tiết

### Dashboard
- Thống kê tổng quan: Doanh thu, Đơn hàng, Khách hàng, Sản phẩm
- Biểu đồ doanh thu theo tháng
- Biểu đồ số lượng đơn hàng
- Top sản phẩm bán chạy

### Quản lý sản phẩm
- Thêm, sửa, xóa sản phẩm
- Quản lý tồn kho
- Tìm kiếm và lọc sản phẩm
- Hiển thị trạng thái sản phẩm

### Quản lý khách hàng
- Thêm, sửa, xóa thông tin khách hàng
- Xem lịch sử mua hàng
- Thống kê tổng đơn hàng và chi tiêu

### Quản lý đơn hàng
- Xem danh sách đơn hàng
- Cập nhật trạng thái đơn hàng
- Tìm kiếm và lọc theo trạng thái
- Xem chi tiết đơn hàng

### Báo cáo & Phân tích
- Báo cáo doanh thu và lợi nhuận
- Phân tích theo danh mục
- Xu hướng doanh thu
- Xuất báo cáo

### Cài đặt
- Cập nhật thông tin doanh nghiệp
- Tùy chọn ngôn ngữ và tiền tệ
- Cài đặt thông báo
- Thay đổi mật khẩu

## License

MIT

