import React, { useState } from "react";
import styles from "./PaymentPage.module.css";
import PayItem from "../../components/PayItem";

export default function PaymentPage() {
  const payData = {
    items: [
      {
        bookId: "book01",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm",
        price: 320000,
        quantity: 1,
        total_cost: 320000,
      },
      {
        bookId: "book02",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm 2",
        price: 640000,
        quantity: 2,
        total_cost: 640000,
      },
      {
        bookId: "book03",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm 3",
        price: 320000,
        quantity: 1,
        total_cost: 320000,
      },
    ],
    sub_total: 1280000,
    discount: 30000,
    grand_total: 1250000,
  };

  const [subTotal, setSubTotal] = useState(payData.sub_total);
  const [discount, setDiscount] = useState(payData.discount);
  const [grandTotal, setGrandTotal] = useState(payData.grand_total);

  // format currency
  const formattedSubTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(subTotal);
  const formattedDiscount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(discount);
  const formattedGrandTotal = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(grandTotal);

  function updatePayment(bookId, quantity) {
    const item = payData.items.find((item) => item.bookId === bookId);
    item.quantity = quantity;
    item.total_cost = quantity * item.price;
    payData.sub_total = payData.items.reduce(
      (sum, item) => sum + item.total_cost,
      0
    );
    setSubTotal(payData.sub_total);
    setGrandTotal(payData.sub_total - discount);
  }

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
          <input require type="text" placeholder="Họ và tên" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Số điện thoại" />
          <input type="text" placeholder="Tỉnh/Thành phố" />
          <input type="text" placeholder="Quận/Huyện" />
          <input type="text" placeholder="Phường/Xã" />
          <input type="text" placeholder="Địa chỉ" />
        </div>
        <div className={styles.payment_form}>
          <h4>ĐƠN HÀNG CỦA BẠN</h4>
          <div>
            <p>
              SẢN PHẨM<span className={styles.form_right1}>TỔNG</span>
            </p>
            {payData.items.map((item) => (
              <PayItem
                item={item}
                key={item.bookId}
                quantity={item.quantity}
                total_cost={item.total_cost}
                updatePayment={updatePayment}
              />
            ))}
            <p>
              Tổng phụ
              <span className={styles.form_right}>{formattedSubTotal}</span>
            </p>
            <p>
              Giảm giá
              <span className={styles.form_right}>{formattedDiscount}</span>
            </p>
            <p>
              Tổng
              <span className={styles.form_right}>{formattedGrandTotal}</span>
            </p>
          </div>
          <br></br>
          <h4>PHƯƠNG THỨC THANH TOÁN</h4>
          <div>
            <input type="radio" value="crash" name="pay-method" /> Trả tiền mặt khi nhận hàng <br></br>
            <input type="radio" value="bank" name="pay-method" /> Chuyển khoản ngân hàng 
          </div>
          <button>ĐẶT HÀNG</button>
        </div>
      </div>
    </div>
  );
}
