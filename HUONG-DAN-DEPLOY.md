# 🚀 Hướng Dẫn Đưa Website Lên Internet

## Phương án DỄ NHẤT: Vercel (Miễn phí, 5 phút)

### Bước 1: Đưa code lên GitHub

1. **Tạo tài khoản GitHub** (nếu chưa có): https://github.com/signup

2. **Tạo repository mới:**
   - Vào https://github.com/new
   - Đặt tên: `htkd-business` (hoặc tên bạn muốn)
   - Chọn **Public** hoặc **Private**
   - Click **Create repository**

3. **Đưa code lên GitHub:**
   
   Mở Terminal/Command Prompt trong thư mục project và chạy:

```bash
# Khởi tạo Git (nếu chưa có)
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit"

# Thêm remote (thay YOUR_USERNAME và YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Đẩy code lên
git branch -M main
git push -u origin main
```

### Bước 2: Deploy lên Vercel

1. **Truy cập Vercel:**
   - Vào https://vercel.com
   - Click **Sign Up** và đăng nhập bằng **GitHub**

2. **Tạo project mới:**
   - Click nút **Add New Project** (hoặc **New Project**)
   - Chọn repository vừa tạo trên GitHub
   - Click **Import**

3. **Cấu hình (Vercel tự động detect, không cần sửa):**
   - Framework Preset: **Next.js** ✓
   - Root Directory: `./` ✓
   - Build Command: `npm run build` ✓
   - Output Directory: `.next` ✓

4. **Deploy:**
   - Click nút **Deploy**
   - Đợi 2-3 phút
   - ✅ **Xong!** Website của bạn đã online!

5. **Lấy link website:**
   - Sau khi deploy xong, bạn sẽ thấy link dạng:
   - `https://your-project-name.vercel.app`
   - Copy link này và chia sẻ với mọi người!

### ✅ Ưu điểm Vercel:
- ✅ **Miễn phí** hoàn toàn
- ✅ **Tự động deploy** mỗi khi bạn push code mới lên GitHub
- ✅ **SSL miễn phí** (https://)
- ✅ **Nhanh** - CDN toàn cầu
- ✅ **Dễ sử dụng** - chỉ cần vài click

---

## Phương án 2: Netlify (Cũng rất dễ)

### Cách 1: Kéo thả (Nhanh nhất)

1. **Build project:**
```bash
npm run build
```

2. **Truy cập Netlify:**
   - Vào https://app.netlify.com
   - Đăng nhập bằng GitHub

3. **Deploy:**
   - Kéo thả thư mục `.next` vào trang Netlify
   - Hoặc kéo thả file `.next.zip` (nén thư mục .next trước)

### Cách 2: Kết nối GitHub (Tự động)

1. **Truy cập Netlify:** https://app.netlify.com
2. **New site from Git** > Chọn GitHub
3. Chọn repository
4. Cấu hình:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click **Deploy**

---

## Phương án 3: Railway (Miễn phí)

1. Truy cập: https://railway.app
2. Đăng nhập bằng GitHub
3. **New Project** > **Deploy from GitHub repo**
4. Chọn repository
5. Railway tự động detect và deploy
6. Có link miễn phí: `your-project.railway.app`

---

## Kiểm tra trước khi deploy

Chạy các lệnh sau để đảm bảo không có lỗi:

```bash
# Cài đặt dependencies
npm install

# Kiểm tra lỗi
npm run lint

# Build thử
npm run build

# Test production (chạy local)
npm start
# Sau đó mở http://localhost:3000 để kiểm tra
```

---

## Thêm Domain riêng (Tùy chọn)

Nếu bạn có domain riêng (ví dụ: `cuahangcuaban.com`):

### Trên Vercel:
1. Vào **Settings** > **Domains**
2. Nhập domain của bạn
3. Làm theo hướng dẫn để cấu hình DNS
4. Đợi vài phút để SSL tự động cài đặt

### Trên Netlify:
1. Vào **Domain settings**
2. **Add custom domain**
3. Làm theo hướng dẫn DNS

---

## Cập nhật website sau khi deploy

Mỗi khi bạn sửa code và muốn cập nhật website:

```bash
# Sửa code...

# Commit và push lên GitHub
git add .
git commit -m "Cập nhật giao diện"
git push

# Vercel/Netlify sẽ TỰ ĐỘNG deploy lại!
# Đợi 1-2 phút, website sẽ tự động cập nhật
```

---

## Troubleshooting (Xử lý lỗi)

### Lỗi build fail:
- Kiểm tra `npm run build` có chạy được không
- Xem log lỗi trên Vercel/Netlify
- Đảm bảo Node.js version >= 18

### Website không hiển thị đúng:
- Xóa cache trình duyệt (Ctrl+Shift+Delete)
- Kiểm tra console browser (F12) xem có lỗi không
- Đảm bảo đã build đúng

### Cần hỗ trợ:
- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com

---

## Tóm tắt nhanh (Vercel)

```bash
# 1. Đưa code lên GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# 2. Vào vercel.com > Import GitHub repo > Deploy
# 3. Xong! Có link website ngay
```

**Chúc bạn deploy thành công! 🎉**

