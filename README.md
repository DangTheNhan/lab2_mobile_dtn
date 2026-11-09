# Lab 2 Native Modules

Ứng dụng React Native cho Android, môn CSW 434.

- **Battery** đọc phần trăm pin qua `BatteryManager`. Chạm thẻ để đọc lại ngay.
- **Brightness** chỉnh độ sáng cửa sổ ứng dụng qua `WindowManager.LayoutParams` khi kéo thanh trượt.

## Chạy ứng dụng

Cần Node.js 24, JDK 21, Android SDK 37, Build Tools 37.0.0 và NDK 27.1.12297006. Mở Android Emulator hoặc kết nối thiết bị Android trước khi chạy.

```sh
npm ci
npm run android
```

Nếu bản debug trên Android 17 hỏi quyền mạng nội bộ, chọn **Allow** để ứng dụng kết nối Metro.

## Kiểm tra hai bài

- Trên emulator, đổi **Charge level** trong **Extended controls → Battery**, rồi chạm thẻ Battery để đối chiếu số hiển thị.
- Trong tab Brightness, kéo slider về hai phía và quan sát phần trăm cùng độ sáng cửa sổ.
- Android Emulator có thể nhận mức độ sáng nhưng vẫn hiển thị hình ở độ sáng cũ. App làm tối phần nội dung trên emulator để mô phỏng hiệu ứng này. Điện thoại thật dùng độ sáng do Android điều khiển.
