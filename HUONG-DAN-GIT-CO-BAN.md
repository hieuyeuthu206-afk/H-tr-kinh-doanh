# 📚 Giải Thích Git Cơ Bản - Dễ Hiểu

## Git là gì?

**Git** là công cụ để:
- 📦 **Lưu trữ** code của bạn
- 📝 **Ghi nhớ** các thay đổi bạn đã làm
- 🔄 **Chia sẻ** code với người khác
- ⏪ **Quay lại** phiên bản cũ nếu cần

**Giống như:** Bạn có một cuốn sổ ghi chép tất cả các thay đổi trong project của bạn.

---

## Các Lệnh Git Cơ Bản

### 1. `git init` - Khởi tạo Git
```bash
git init
```
**Ý nghĩa:** Bắt đầu theo dõi thư mục này bằng Git
**Giống như:** Mở một cuốn sổ mới để ghi chép

---

### 2. `git add .` - Thêm files vào "hàng chờ"
```bash
git add .
```
**Ý nghĩa:** 
- Dấu `.` có nghĩa là **"tất cả"** (tất cả files trong thư mục hiện tại)
- Lệnh này **chọn** các files bạn muốn lưu lại
- **Chưa lưu** ngay, chỉ đưa vào "hàng chờ"

**Giống như:** 
- Bạn có nhiều giấy tờ trên bàn
- `git add .` = **gom tất cả** vào một chồng để chuẩn bị đưa vào hộp
- Nhưng chưa đưa vào hộp ngay!

**Ví dụ cụ thể:**
```
Trước khi chạy git add .:
📁 htkd/
  ├── 📄 file1.tsx (chưa được chọn)
  ├── 📄 file2.tsx (chưa được chọn)
  └── 📄 file3.tsx (chưa được chọn)

Sau khi chạy git add .:
📁 htkd/
  ├── ✅ file1.tsx (đã được chọn - sẵn sàng lưu)
  ├── ✅ file2.tsx (đã được chọn - sẵn sàng lưu)
  └── ✅ file3.tsx (đã được chọn - sẵn sàng lưu)
```

**Các cách khác:**
- `git add file1.tsx` - Chỉ thêm file1.tsx
- `git add *.tsx` - Thêm tất cả file .tsx
- `git add .` - Thêm **TẤT CẢ** files

---

### 3. `git commit` - Lưu lại (ghi vào sổ)
```bash
git commit -m "Mô tả những gì bạn đã làm"
```
**Ý nghĩa:**
- **Lưu** các files đã được chọn ở bước `git add`
- Ghi lại **thời điểm** và **mô tả** những thay đổi
- Giống như **chụp ảnh** trạng thái hiện tại của code

**Giống như:**
- Bạn đã gom giấy tờ vào chồng (git add)
- Bây giờ **đóng dấu** và **đưa vào hộp** (git commit)
- Ghi nhãn: "Lần lưu đầu tiên - 15/1/2024"

**Ví dụ:**
```bash
git commit -m "Thêm giao diện Dashboard"
git commit -m "Sửa lỗi đăng nhập"
git commit -m "Cập nhật màu sắc"
```

---

### 4. `git push` - Đẩy lên GitHub
```bash
git push -u origin main
```
**Ý nghĩa:**
- **Gửi** code đã lưu lên GitHub (internet)
- Giống như **upload** file lên Google Drive
- Sau đó ai cũng có thể xem code của bạn

**Giống như:**
- Bạn đã đóng hộp (commit)
- Bây giờ **gửi hộp** lên kho lưu trữ trên internet (GitHub)

---

## Quy Trình Hoàn Chỉnh (3 Bước)

### Bước 1: Chọn files muốn lưu
```bash
git add .
```
**Hành động:** "Tôi muốn lưu TẤT CẢ files này"

### Bước 2: Lưu lại với mô tả
```bash
git commit -m "Initial commit"
```
**Hành động:** "Lưu lại và ghi chú: Đây là lần commit đầu tiên"

### Bước 3: Đẩy lên internet
```bash
git push -u origin main
```
**Hành động:** "Gửi code lên GitHub để mọi người có thể xem"

---

## Ví Dụ Thực Tế

### Tình huống: Bạn vừa tạo xong website

**Bước 1:** Bạn có rất nhiều files:
```
htkd/
├── app/
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   └── Dashboard.tsx
└── package.json
```

**Bước 2:** Chạy `git add .`
```
✅ Chọn TẤT CẢ các files trên
✅ Đưa vào "hàng chờ" để lưu
```

**Bước 3:** Chạy `git commit -m "Initial commit"`
```
✅ Lưu lại tất cả files đã chọn
✅ Ghi chú: "Initial commit"
```

**Bước 4:** Chạy `git push`
```
✅ Gửi lên GitHub
✅ Mọi người có thể xem code của bạn
```

---

## So Sánh Dễ Hiểu

| Hành động thực tế | Lệnh Git |
|-------------------|----------|
| 📝 Viết code | (Bạn đang làm) |
| 📦 Gom tất cả vào một chỗ | `git add .` |
| 📦 Đóng hộp và dán nhãn | `git commit -m "..."` |
| 📤 Gửi lên internet | `git push` |

---

## Tại Sao Cần `git add .`?

**Không có `git add`:**
- Git không biết bạn muốn lưu files nào
- Có thể bạn chỉ muốn lưu 1 file, không phải tất cả

**Có `git add .`:**
- Bạn **nói rõ** với Git: "Tôi muốn lưu TẤT CẢ"
- Git biết chính xác files nào cần lưu

**Ví dụ:**
```
Bạn có 10 files:
- 5 files quan trọng (muốn lưu)
- 5 files tạm thời (không muốn lưu)

Nếu dùng git add . → Lưu TẤT CẢ 10 files
Nếu dùng git add file1.tsx → Chỉ lưu file1.tsx
```

---

## Kiểm Tra Trạng Thái

### Xem files nào đã được chọn:
```bash
git status
```

**Kết quả:**
```
Changes to be committed:  ← Files đã được chọn (git add)
  new file: app/page.tsx
  new file: components/Dashboard.tsx

Untracked files:  ← Files chưa được chọn
  temp.txt
```

---

## Lưu Ý Quan Trọng

### ✅ `git add .` KHÔNG LƯU NGAY
- Chỉ **chọn** files
- Phải chạy `git commit` mới **lưu thật sự**

### ✅ Dấu `.` có nghĩa là "tất cả"
- `.` = thư mục hiện tại
- `git add .` = thêm tất cả files trong thư mục hiện tại

### ✅ Có thể chọn từng file
```bash
git add app/page.tsx        # Chỉ thêm 1 file
git add app/                # Thêm tất cả files trong thư mục app
git add .                   # Thêm TẤT CẢ
```

---

## Tóm Tắt Ngắn Gọn

```
1. git add .        → "Tôi muốn lưu TẤT CẢ files này"
2. git commit       → "Lưu lại với mô tả"
3. git push         → "Gửi lên GitHub"
```

**Giống như:**
1. 📦 Gom đồ vào túi (`git add .`)
2. 📝 Đóng túi và dán nhãn (`git commit`)
3. 📤 Gửi đi (`git push`)

---

**Hy vọng bạn đã hiểu rõ hơn! 😊**

