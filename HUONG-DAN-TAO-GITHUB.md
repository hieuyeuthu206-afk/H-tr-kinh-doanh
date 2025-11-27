# 📝 Hướng Dẫn Tạo Repository trên GitHub (Chi Tiết)

## Bước 1: Đăng nhập GitHub

1. Truy cập: **https://github.com**
2. Nếu chưa có tài khoản:
   - Click **Sign up** (góc trên bên phải)
   - Điền thông tin: Email, Password, Username
   - Xác minh email
   - Hoàn tất đăng ký

3. Nếu đã có tài khoản:
   - Click **Sign in** và đăng nhập

---

## Bước 2: Tạo Repository Mới

### Cách 1: Từ trang chủ GitHub

1. Sau khi đăng nhập, bạn sẽ thấy trang Dashboard
2. Ở góc trên bên phải, tìm nút **"+"** (màu xanh lá)
3. Click vào nút **"+"** → Chọn **"New repository"**

### Cách 2: Truy cập trực tiếp

1. Truy cập: **https://github.com/new**
2. Hoặc click link này: https://github.com/new

---

## Bước 3: Điền Thông Tin Repository

Bạn sẽ thấy form với các trường sau:

### 📌 Repository name (Bắt buộc)
- **Nhập tên:** `htkd-business` (hoặc tên bạn muốn)
- Ví dụ: `htkd`, `business-management`, `my-shop`, etc.
- **Lưu ý:** 
  - Không dùng khoảng trắng, dùng dấu gạch ngang `-` hoặc gạch dưới `_`
  - Tên phải là duy nhất trong tài khoản của bạn

### 📝 Description (Tùy chọn)
- Mô tả ngắn về project
- Ví dụ: `Hệ thống quản lý kinh doanh HTKD`

### 🔒 Visibility (Quan trọng)
- **Public** (Công khai):
  - ✅ Ai cũng có thể xem code
  - ✅ Miễn phí hoàn toàn
  - ✅ Có thể chia sẻ với mọi người
  - **Khuyến nghị:** Chọn Public nếu không có vấn đề về bảo mật

- **Private** (Riêng tư):
  - 🔒 Chỉ bạn và người được mời mới xem được
  - 💰 Miễn phí cho tài khoản cá nhân (có giới hạn)
  - **Chọn Private nếu:** Code nhạy cảm, không muốn công khai

### ⚠️ QUAN TRỌNG - KHÔNG TÍCH CÁC MỤC NÀY:
- ❌ **KHÔNG tích** "Add a README file" (vì bạn đã có code rồi)
- ❌ **KHÔNG tích** "Add .gitignore" (đã có sẵn)
- ❌ **KHÔNG tích** "Choose a license" (có thể thêm sau)

### ✅ Để trống tất cả các mục trên!

---

## Bước 4: Tạo Repository

1. Sau khi điền xong thông tin
2. Click nút **"Create repository"** (màu xanh lá)
3. GitHub sẽ tạo repository và hiển thị trang hướng dẫn

---

## Bước 5: Copy Link Repository

Sau khi tạo xong, bạn sẽ thấy link dạng:
```
https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Ví dụ:**
- Nếu username là `ngohieu` và repo là `htkd-business`
- Link sẽ là: `https://github.com/ngohieu/htkd-business.git`

**Copy link này lại!** Bạn sẽ cần nó ở bước tiếp theo.

---

## Bước 6: Đưa Code Lên GitHub

Quay lại Terminal và chạy các lệnh sau:

### 6.1. Thêm remote (thay link bằng link của bạn):
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

**Ví dụ:**
```bash
git remote add origin https://github.com/ngohieu/htkd-business.git
```

### 6.2. Đảm bảo đang ở branch main:
```bash
git branch -M main
```

### 6.3. Đẩy code lên GitHub:
```bash
git push -u origin main
```

**Lưu ý:** 
- Lần đầu sẽ hỏi đăng nhập GitHub
- Có thể cần nhập Username và Password (hoặc Personal Access Token)
- Nếu dùng macOS, có thể sẽ mở cửa sổ đăng nhập

---

## ✅ Hoàn Thành!

Sau khi push thành công:
1. Refresh trang GitHub
2. Bạn sẽ thấy tất cả code đã được upload
3. Copy link repository để deploy lên Vercel

**Link repository:** `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`

---

## 🆘 Xử Lý Lỗi

### Lỗi: "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

### Lỗi: "Authentication failed"
- Tạo Personal Access Token:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token
  3. Chọn quyền: `repo`
  4. Copy token và dùng làm password khi push

### Lỗi: "Permission denied"
- Kiểm tra lại username và tên repository
- Đảm bảo đã đăng nhập đúng tài khoản GitHub

---

## 📸 Mô Tả Giao Diện GitHub

Khi vào https://github.com/new, bạn sẽ thấy:

```
┌─────────────────────────────────────────┐
│  Create a new repository               │
├─────────────────────────────────────────┤
│                                         │
│  Owner: [▼ ngohieu ▼]                  │
│                                         │
│  Repository name *                      │
│  ┌─────────────────────────────────┐   │
│  │ htkd-business                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  Description (optional)                 │
│  ┌─────────────────────────────────┐   │
│  │ Hệ thống quản lý kinh doanh     │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ⚪ Public                              │
│  ⚫ Private                             │
│                                         │
│  ☐ Add a README file                    │
│  ☐ Add .gitignore                      │
│  ☐ Choose a license                    │
│                                         │
│         [Create repository]             │
│                                         │
└─────────────────────────────────────────┘
```

**Chỉ cần:**
- ✅ Điền Repository name
- ✅ Chọn Public
- ✅ Click "Create repository"

---

**Chúc bạn thành công! 🎉**

