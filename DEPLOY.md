# Hướng dẫn Deploy Website lên Internet

## Phương án 1: Deploy lên Vercel (Khuyến nghị - Miễn phí)

Vercel là platform được tạo bởi team Next.js, rất phù hợp cho ứng dụng Next.js.

### Bước 1: Chuẩn bị code
```bash
# Đảm bảo code đã được commit vào Git
git init
git add .
git commit -m "Initial commit"
```

### Bước 2: Đẩy code lên GitHub
1. Tạo repository mới trên GitHub (https://github.com/new)
2. Đẩy code lên GitHub:
```bash
git remote add origin https://github.com/username/your-repo-name.git
git branch -M main
git push -u origin main
```

### Bước 3: Deploy trên Vercel
1. Truy cập https://vercel.com và đăng ký/đăng nhập bằng GitHub
2. Click "Add New Project"
3. Import repository từ GitHub
4. Vercel sẽ tự động detect Next.js và cấu hình
5. Click "Deploy"
6. Đợi vài phút, website sẽ có URL dạng: `your-project.vercel.app`

### Ưu điểm:
- ✅ Miễn phí
- ✅ Tự động deploy khi push code mới
- ✅ SSL certificate tự động
- ✅ CDN toàn cầu
- ✅ Hỗ trợ Next.js tốt nhất

---

## Phương án 2: Deploy lên Netlify

### Bước 1: Build project
```bash
npm run build
```

### Bước 2: Deploy
1. Truy cập https://app.netlify.com
2. Kéo thả thư mục `.next` hoặc kết nối với GitHub
3. Cấu hình:
   - Build command: `npm run build`
   - Publish directory: `.next`

---

## Phương án 3: Deploy lên VPS/Server (cPanel, DigitalOcean, AWS, etc.)

### Bước 1: Build project
```bash
npm run build
```

### Bước 2: Upload files
- Upload toàn bộ project lên server (trừ node_modules và .next)
- Hoặc clone từ Git trên server

### Bước 3: Cài đặt trên server
```bash
# SSH vào server
ssh user@your-server.com

# Cài đặt Node.js (nếu chưa có)
# Ubuntu/Debian:
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cài đặt dependencies
npm install

# Build project
npm run build

# Chạy production server
npm start
```

### Bước 4: Sử dụng PM2 để chạy tự động
```bash
# Cài đặt PM2
npm install -g pm2

# Chạy ứng dụng
pm2 start npm --name "htkd-app" -- start

# Lưu cấu hình
pm2 save
pm2 startup
```

### Bước 5: Cấu hình Nginx (reverse proxy)
Tạo file `/etc/nginx/sites-available/htkd`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Kích hoạt:
```bash
sudo ln -s /etc/nginx/sites-available/htkd /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Phương án 4: Deploy lên Railway (Miễn phí)

1. Truy cập https://railway.app
2. Đăng nhập bằng GitHub
3. Click "New Project" > "Deploy from GitHub repo"
4. Chọn repository
5. Railway tự động detect và deploy
6. Có URL miễn phí: `your-project.railway.app`

---

## Kiểm tra trước khi deploy

### 1. Test build local
```bash
npm run build
npm start
# Truy cập http://localhost:3000 để kiểm tra
```

### 2. Kiểm tra lỗi
```bash
npm run lint
```

### 3. Tối ưu hóa
- Đảm bảo không có file lớn không cần thiết
- Kiểm tra `.gitignore` đã đúng chưa
- Xóa `node_modules` trước khi commit

---

## Biến môi trường (nếu cần)

Nếu có biến môi trường, tạo file `.env.local`:
```
NEXT_PUBLIC_API_URL=https://api.example.com
```

Trên Vercel/Netlify, thêm biến môi trường trong Settings > Environment Variables

---

## Lưu ý quan trọng

1. **Domain tùy chỉnh**: Có thể thêm domain riêng trong Settings của platform
2. **SSL**: Tất cả platform trên đều tự động cung cấp SSL miễn phí
3. **Database**: Nếu cần database, có thể dùng:
   - Vercel: Vercel Postgres, Supabase
   - Railway: PostgreSQL, MySQL
   - MongoDB Atlas (miễn phí)

---

## Khuyến nghị

**Cho người mới bắt đầu**: Dùng **Vercel** - đơn giản nhất, miễn phí, tự động deploy

**Cho production lớn**: Dùng **VPS** với PM2 + Nginx - kiểm soát hoàn toàn

