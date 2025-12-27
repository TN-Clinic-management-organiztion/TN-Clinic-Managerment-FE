# TN Clinic Management - Frontend

## 📋 Tổng quan dự án

**TN Clinic Management Frontend** là giao diện người dùng (UI) demo cho hệ thống nhận diện ảnh y tế và quản lý phòng khám. Đây là một ứng dụng web được xây dựng bằng Next.js, cung cấp các tính năng quản lý bệnh nhân, khám bệnh, xử lý kết quả xét nghiệm và công cụ gán nhãn dữ liệu cho mô hình AI nhận diện ảnh y tế.

### 🎯 Mục tiêu dự án

Dự án này được phát triển nhằm:

1. **Demo hệ thống nhận diện ảnh y tế**: Cung cấp giao diện để demo và kiểm thử các tính năng nhận diện ảnh y tế bằng AI
2. **Quản lý phòng khám**: Hỗ trợ quy trình quản lý bệnh nhân, khám bệnh, và xử lý kết quả xét nghiệm
3. **Gán nhãn dữ liệu**: Cung cấp công cụ để gán nhãn và quản lý dữ liệu hình ảnh y tế phục vụ huấn luyện mô hình AI
4. **Tích hợp AI Core**: Kết nối với backend AI để xử lý và phân tích hình ảnh y tế

---

## 🚀 Tính năng chính

### 1. **Xác thực người dùng (Authentication)**
- Đăng nhập với NextAuth
- Quản lý session và JWT tokens
- Phân quyền theo vai trò (Role-based access control)

### 2. **Quản lý tiếp đón (Reception)**
- Quản lý hàng đợi bệnh nhân
- Đăng ký khám bệnh
- Gọi số thứ tự

### 3. **Quản lý ca khám (Encounters)**
- Xem danh sách ca khám theo phòng
- Nhập thông tin khám bệnh (triệu chứng, dấu hiệu sinh tồn)
- Tìm kiếm và chọn mã ICD-10
- Chỉ định xét nghiệm cận lâm sàng (CLS)
- Kê đơn thuốc
- Xem kết quả xét nghiệm
- Hoàn thành ca khám

### 4. **Quản lý kết quả xét nghiệm (Results)**
- Xem danh sách phiếu xét nghiệm
- Tạo báo cáo kết quả xét nghiệm
- Upload và quản lý hình ảnh kết quả
- Xem chi tiết báo cáo

### 5. **Gán nhãn dữ liệu (Annotations)**
- Upload hình ảnh y tế
- Gán nhãn hình ảnh (Labeling)
- Xem và chỉnh sửa annotations
- Tích hợp AI để gợi ý nhãn tự động
- Quản lý trạng thái: Chưa gán nhãn, Đang làm, Chờ duyệt, Đã duyệt, Bị từ chối
- Export annotations dưới dạng YOLO format

### 6. **Dashboard**
- Trang tổng quan hệ thống

---

## 🛠️ Công nghệ sử dụng

### Core Framework
- **Next.js 16.0.7** - React framework với App Router
- **React 19.0.1** - UI library
- **TypeScript 5.7.2** - Type safety

### Authentication & State Management
- **NextAuth 5.0.0-beta.30** - Authentication solution
- **JWT** - Token-based authentication

### UI Components & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **HeroUI** - React component library
- **Framer Motion 12.17.0** - Animation library
- **Lucide React** - Icon library

### HTTP Client
- **Axios 1.13.2** - HTTP client

### Rich Text Editor
- **TinyMCE React** - WYSIWYG editor

### Image Processing
- **react-zoom-pan-pinch** - Image zoom and pan functionality

### Utilities
- **react-toastify** - Toast notifications
- **clsx** & **tailwind-merge** - Conditional class names

---

## 📦 Cài đặt

### Yêu cầu hệ thống
- Node.js >= 18.x
- npm hoặc yarn hoặc pnpm

### Các bước cài đặt

1. **Clone repository**
```bash
git clone <repository-url>
cd TN-Clinic-Managerment-FE
```

2. **Cài đặt dependencies**
```bash
npm install
# hoặc
yarn install
# hoặc
pnpm install
```

3. **Cấu hình biến môi trường**

Tạo file `.env.local` trong thư mục gốc:
```env
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

4. **Chạy ứng dụng**

```bash
npm run dev
# hoặc
yarn dev
# hoặc
pnpm dev
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

---

## 🏗️ Cấu trúc thư mục

```
TN-Clinic-Managerment-FE/
│
├── public/                          # Static assets
│   ├── fonts/                       # Font files (Montserrat, LibreBarcode)
│   ├── icons/                       # Favicon và logo
│   └── images/                      # Hình ảnh tĩnh (logo, payment icons, etc.)
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (auth)/                  # Route group - Authentication pages
│   │   │   └── login/               # Trang đăng nhập
│   │   │
│   │   ├── (protected)/             # Route group - Protected pages (yêu cầu đăng nhập)
│   │   │   ├── annotations/         # Quản lý gán nhãn dữ liệu
│   │   │   │   └── [id]/           # Chi tiết annotation theo ID
│   │   │   ├── dashboard/          # Trang dashboard
│   │   │   ├── encounters/         # Quản lý ca khám bệnh
│   │   │   └── modals/             # Các modal cho encounters
│   │   │   ├── reception/          # Quản lý tiếp đón
│   │   │   └── results/            # Quản lý kết quả xét nghiệm
│   │   │       └── modals/         # Các modal cho results
│   │   │   └── layout.tsx          # Layout cho protected routes
│   │   │
│   │   ├── api/                     # API routes
│   │   │   └── auth/               # NextAuth API routes
│   │   │
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Trang chủ
│   │
│   ├── components/                  # React components
│   │   ├── app-shell/               # Shell components (AppShell, SideNav)
│   │   ├── auth/                    # Authentication components
│   │   ├── button/                  # Button components
│   │   ├── editor/                  # Text editor components
│   │   ├── labelling/               # Components cho labeling (ImageGallery, LabelingWorkspace)
│   │   ├── modal/                   # Modal components
│   │   ├── toast/                   # Toast notification components
│   │   └── ui/                      # Reusable UI components
│   │
│   ├── constants/                   # Constants và configuration
│   ├── contexts/                    # React contexts
│   ├── helpers/                     # Helper functions
│   ├── hook/                        # Custom React hooks
│   │   ├── useDebounce.ts          # Debounce hook
│   │   └── useLoggout.ts           # Logout hook
│   │
│   ├── lib/                         # Library code
│   │   ├── auth/                    # Authentication logic
│   │   │   ├── auth.ts             # NextAuth configuration
│   │   │   ├── role.ts             # Role definitions
│   │   │   └── route-access.ts     # Route access control
│   │   ├── config/                  # Configuration files
│   │   ├── http/                    # HTTP client setup
│   │   │   ├── client.ts          # Axios client cho client-side
│   │   │   └── server.ts          # Axios client cho server-side
│   │   └── utils.ts                 # Utility functions
│   │
│   ├── providers/                   # React context providers
│   │   ├── SessionProviders.tsx    # Session provider
│   │   └── ToastProvider.tsx      # Toast provider
│   │
│   ├── services/                    # API service functions
│   │   ├── ai-core.api.ts          # AI Core API services
│   │   ├── auth/                   # Authentication services
│   │   ├── drugs/                  # Drug/medication services
│   │   ├── encounters/             # Encounter services
│   │   ├── icd10/                  # ICD-10 services
│   │   ├── patients/               # Patient services
│   │   ├── queues/                 # Queue services
│   │   ├── reception/              # Reception services
│   │   ├── results/                # Results services
│   │   ├── results_image.api.ts   # Result image services
│   │   ├── rooms/                  # Room services
│   │   └── services/               # Service services
│   │
│   ├── styles/                      # Global styles
│   │   ├── fonts.css               # Font definitions
│   │   └── globals.css              # Global CSS
│   │
│   └── types/                       # TypeScript type definitions
│       ├── backend-response.ts      # Backend response types
│       ├── encounters/             # Encounter types
│       ├── next-auth.d.ts          # NextAuth type extensions
│       ├── pagination/             # Pagination types
│       ├── patient/                # Patient types
│       ├── reception/               # Reception types
│       └── rooms/                  # Room types
│
├── components.json                  # shadcn/ui configuration
├── eslint.config.mjs               # ESLint configuration
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies và scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # File này
```

### Giải thích các thư mục quan trọng

#### `src/app/`
- Sử dụng Next.js App Router
- `(auth)` và `(protected)` là route groups để tổ chức routes
- Mỗi thư mục con là một route, file `page.tsx` là component hiển thị

#### `src/components/`
- Chứa tất cả React components
- `labelling/`: Components cho tính năng gán nhãn ảnh y tế
- `app-shell/`: Layout và navigation chính

#### `src/services/`
- Chứa các hàm gọi API đến backend
- Mỗi module có thư mục riêng (encounters, results, etc.)
- `ai-core.api.ts`: API services cho AI Core (nhận diện ảnh)

#### `src/lib/`
- Code thư viện và utilities
- `auth/`: Logic xác thực và phân quyền
- `http/`: Cấu hình Axios client

#### `src/types/`
- TypeScript type definitions
- Đảm bảo type safety cho toàn bộ ứng dụng

---

## 🚦 Scripts

```bash
# Chạy development server (port 3000)
npm run dev

# Build cho production
npm run build

# Chạy production server
npm run start

# Chạy linter
npm run lint
```

---

## 🔐 Authentication

Ứng dụng sử dụng NextAuth với JWT strategy:

- **Login**: `/login`
- **Protected routes**: Tất cả routes trong `(protected)` yêu cầu đăng nhập
- **Session management**: Tự động refresh token khi hết hạn
- **Role-based access**: Kiểm tra quyền truy cập dựa trên role

---

## 🔌 API Integration

Ứng dụng kết nối với backend API thông qua:

- **Base URL**: Được cấu hình trong `NEXT_PUBLIC_SERVER_URL`
- **HTTP Client**: Axios với interceptors để xử lý authentication
- **Services**: Mỗi module có service riêng trong `src/services/`

### AI Core Integration

Tích hợp với AI Core backend để:
- Nhận diện ảnh y tế (detection)
- Lưu và quản lý annotations
- Export dữ liệu training (YOLO format)

---

## 🎨 UI/UX Features

- **Responsive Design**: Tối ưu cho nhiều kích thước màn hình
- **Dark/Light Mode**: (Có thể mở rộng)
- **Toast Notifications**: Thông báo cho user actions
- **Loading States**: Hiển thị trạng thái loading
- **Error Handling**: Xử lý lỗi và hiển thị thông báo phù hợp

---

## 📝 Development Notes

### Port Configuration
- Development server chạy mặc định trên **port 3000**
- Có thể thay đổi bằng cách set biến môi trường `PORT` hoặc sử dụng flag `-p`

### Environment Variables
Cần cấu hình các biến môi trường sau:
- `NEXT_PUBLIC_SERVER_URL`: URL của backend API
- `NEXTAUTH_SECRET`: Secret key cho NextAuth
- `NEXTAUTH_URL`: URL của frontend application

---

## 🤝 Đóng góp

Dự án này là một phần của hệ thống nhận diện ảnh y tế. Khi đóng góp, vui lòng:

1. Tạo branch mới từ `main`
2. Commit với message rõ ràng
3. Tạo Pull Request với mô tả chi tiết

---

## 📄 License

[Thêm thông tin license nếu có]

---

## 👥 Authors

[Thêm thông tin tác giả]

---

## 📞 Liên hệ

[Thêm thông tin liên hệ nếu cần]
