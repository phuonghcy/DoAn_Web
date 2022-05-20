import React, { useState } from "react";
import CartItem from "../../components/CartItem";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./CartPage.module.css";

function CartPage() {
  return (
    <div className="main">
      <div className={styles.container}>
        <br></br>
        <div className={styles.cart_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Giỏ hàng</li>
          </ul>
          <h1>GIỎ HÀNG</h1>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
