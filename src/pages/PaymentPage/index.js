import React from "react";
import styles from "./PaymentPage.module.css";

export default function PaymentPage() {
  return (
    <div className={styles.container}>
      <br></br>
      <div className={styles.payment_header}>
        <ul>
          <li>Trang chủ</li>
          <li>Thanh toán</li>
        </ul>
      </div>
      <div className={styles.payment_body}>
          <div className={styles.payment_info}>
              <h4>THÔNG TIN NHẬN HÀNG</h4>
              <input require type="text" placeholder="Họ và tên"/>
              <input type="email" placeholder="Email"/>
              <input type="text" placeholder="Số điện thoại"/>
              <input type="text" placeholder="Tỉnh/Thành phố"/>
              <input type="text" placeholder="Quận/Huyện"/>
              <input type="text" placeholder="Phường/Xã"/>
              <input type="text" placeholder="Địa chỉ"/>
          </div>
          <div className={styles.payment_form}>
            <h4>ĐƠN HÀNG CỦA BẠN</h4>
            <div>
              <p>SẢN PHẨM<span className={styles.form_right1}>TỔNG</span></p>
              <p>Tổng phụ<span className={styles.form_right}>640000</span></p>
              <p>Giảm giá<span className={styles.form_right}>5000</span></p>
              <p>Tổng<span className={styles.form_right}>590000</span></p>
            </div>
            <br></br>
            <h4>PHƯƠNG THỨC THANH TOÁN</h4>
            <input type="radio" id="radio1" value="1"/>
            <label for="radio1">Trả tiền mặt khi nhận hàng</label><br></br>
            <input type="radio" id="radio2" value="2"/>
            <label for="radio2">Chuyển khoản ngân hàng</label><br></br>
            <button>ĐẶT HÀNG</button>
          </div>

      </div>

    </div>
  );
}
