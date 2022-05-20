import React, { useState, useEffect } from "react";
import styles from "./CartItem.module.css";

export default function CartItem(props) {
  const [quantity, setQuantity] = useState(props.quantity);
  const [itemTotalCost, setItemTotalCost] = useState(props.total_cost);

  // format currency
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(props.price);
  const formattedTotalCost = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(itemTotalCost);

  function increaseQuantity() {
    setQuantity((preValue) => preValue + 1);
    setItemTotalCost(props.price * (quantity + 1));
  }

  function decreaseQuantity() {
    if (quantity > 0) {
      setQuantity((preValue) => preValue - 1);
      setItemTotalCost(props.price * (quantity - 1));
    }
  }
  function handleChange(event) {
    const value =
      parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 0;
    setQuantity(value);
    setItemTotalCost(props.price * value);
  }

  useEffect(() => {
    props.updateCart(props.id, quantity);
  });

  return (
    <>
      <tr className={props.wrapper}>
        <td>
          <button className={styles.remove_button}>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </td>
        <td>
          <img src={props.image} alt={props.name} />
        </td>
        <td>{props.name}</td>
        <td className={styles.price}>{formattedPrice}</td>
        <td>
          <div className={styles.quantity_wrapper}>
            <button
              className={styles.decrease_button}
              onClick={decreaseQuantity}
            >
              -
            </button>
            <input type="number" value={quantity} onChange={handleChange} />
            <button
              className={styles.increase_button}
              onClick={increaseQuantity}
            >
              +
            </button>
          </div>
        </td>
        <td>{formattedTotalCost}</td>
      </tr>
      <tr>
        <td colSpan={6}>
          <hr />
        </td>
      </tr>
    </>
  );
}
