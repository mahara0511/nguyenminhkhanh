# API

Dự án REST API xây bằng Node.js, Express, TypeORM, Zod, Pino Logger và Swagger UI.  
Hỗ trợ CRUD sản phẩm, phân trang, tìm kiếm, sắp xếp và trả về dữ liệu qua DTO mapper.

## 1. Cài đặt

Clone project và cài dependencies bằng lệnh:

```bash
npm install
```

## 2. Cấu hình môi trường

Tạo file .env trong thư mục gốc dự án và điền:

env

```bash
DATABASE_URL="postgresql://neondb_owner:npg_T37BfdKcSnCG@ep-sparkling-fire-a10ws6zk.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
PORT=8080
```

Database sử dụng Neon PostgreSQL và yêu cầu SSL (sslmode=require).

## 3. Chạy project

Khởi động server với:

```bash
npm run dev
```

Hoặc chạy bản build:

```bash
npm run build
npm start
```

## 4. Migration

Tạo migration:

```bash
npm run migration:generate
```

Chạy migration:

```bash
npm run migration:run
```

Revert migration:

```bash
npm run migration:revert
```

## 5. Swagger API Docs

Sau khi server chạy, mở tài liệu API tại:

```bash
http://localhost:8080/docs
```
