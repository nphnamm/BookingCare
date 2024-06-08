# Booking Care - Hệ thống Đặt Lịch Khám Chữa Bệnh Trực tuyến

Booking Care là một ứng dụng web toàn diện giúp bệnh nhân dễ dàng tìm kiếm và đặt lịch hẹn với các bác sĩ, phòng khám và bệnh viện. Ứng dụng này được xây dựng bằng React cho giao diện người dùng, Node.js cho backend và MySQL để quản lý cơ sở dữ liệu.

## Tính Năng Chính

- **Tìm kiếm thông minh:** Tìm kiếm bác sĩ, chuyên khoa, bệnh viện theo vị trí, bảo hiểm và các tiêu chí khác.
- **Đặt lịch hẹn trực tuyến:** Đặt lịch hẹn nhanh chóng, dễ dàng và quản lý lịch hẹn cá nhân.
- **Hồ sơ bệnh án điện tử:** Lưu trữ và truy cập thông tin sức khỏe một cách an toàn.
- **Đánh giá và nhận xét:** Đọc và viết đánh giá về bác sĩ, dịch vụ y tế.
- **Thanh toán trực tuyến:** Tích hợp cổng thanh toán để thanh toán phí khám chữa bệnh.

## Công Nghệ Sử Dụng

- **Frontend:** React, Redux (hoặc các thư viện quản lý state khác), CSS-in-JS (ví dụ: Styled Components, Emotion).
- **Backend:** Node.js, Express.js
- **Cơ sở dữ liệu:** MySQL
- **Kiểm soát phiên bản:** Git

## Installation and Setup

1. **Clone repository:**
   ```bash
   git clone git@github.com:nphnamm/BookingCare.git'
   
2. **Install dependencies:**
cd BookingCare
  npm install  # Install frontend (React) dependencies
  cd backend
  npm install  # Install backend (Node.js) dependencies
3. **Run the application:**
4. **Project Structure:**
BookingCare/
├── frontend/          # React source code
│   ├── public/
│   ├── src/           # Components, Redux, styles, ...
│   └── package.json
├── backend/           # Node.js source code
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── package.json
├── .gitignore
└── README.md
 
