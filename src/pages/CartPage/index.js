import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import styles from "./CartPage.module.css";

function CartPage() {
  const cartData = {
    items: [
      {
        bookId: "book01",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm",
        price: 320000,
        quantity: 1,
        total_cost: 320000
      },
      {
        bookId: "book02",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm 2",
        price: 320000,
        quantity: 1,
        total_cost: 320000
      },
      {
        bookId: "book03",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm 3",
        price: 320000,
        quantity: 1,
        total_cost: 320000
      },
      {
        bookId: "book04",
        image: "https://picsum.photos/175/120",
        name: "Đắc nhân tâm 4",
        price: 320000,
        quantity: 1,
        total_cost: 320000
      },
    ],
      sub_total: 1280000,
      shipping_fee: 30000,
      grand_total:1310000
  }
  const [ subTotal, setSubTotal ] = useState(cartData.sub_total);
  const [ shippingFee, setShippingFee ] = useState(cartData.shipping_fee);
  const [ grandTotal, setGrandTotal ] = useState(cartData.grand_total);

  // format currency
  const formattedSubTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subTotal);
  const formattedShippingFee = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingFee);
  const formattedGrandTotal = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(grandTotal);

  function updateCart(id, quantity) {
    const item = cartData.items.find(item => item.id === id);
    item.quantity = quantity;
    item.total_cost = quantity * item.price;
    cartData.sub_total = cartData.items.reduce((sum, item) => sum + item.total_cost, 0)
    setSubTotal(cartData.sub_total);
    setGrandTotal(cartData.sub_total + shippingFee);
}
  return (
    <div>
      <div className={styles.container}>
        <br></br>
        <div className={styles.cart_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Giỏ hàng</li>
          </ul>
          <h1>GIỎ HÀNG</h1>
        </div>
        <div className={styles.cart_body}>
          <div className={styles.cart_table}>
            <table>
              <thead>
                <tr>
                  <td>Sản phẩm</td>
                  <td></td>
                  <td>Đơn giá</td>
                  <td>Số lượng</td>
                  <td>Thành tiền</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                  {
                    cartData.items.map(item => 
                      <CartItem key={item.bookId} id={item.bookId} name={item.name} image={item.image} price={item.price}
                      quantity={item.quantity} total_cost={item.total_cost} updateCart={item.updateCart}></CartItem>
                      )
                  }
              </tbody>
            </table>
          </div>

          <div className={styles.cart_voucher}>
            <div className={styles.input}>
              <input type="text" placeholder="Nhập mã giảm giá" />
              <button>Áp dụng</button>
            </div>
            <table>
              <tr>
                <td>Tạm tính</td>
                <td className={styles.cart_value}>{formattedSubTotal}</td>
              </tr>
              <tr>
                <td>Giảm giá</td>
                <td className={styles.cart_value}>{formattedShippingFee}</td>
              </tr>
              <tr>
                <td>Thành tiền</td>
                <td className={styles.cart_value}>{formattedGrandTotal}</td>
              </tr>
            </table>
            <Link to='/thanh-toan'><button className={styles.pay_button}>Tiến hành thanh toán</button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
