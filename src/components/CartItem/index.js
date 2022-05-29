import React, { useState, useEffect } from "react";
import styles from "./CartItem.module.css";

export default function CartItem(props) {


  const [ quantity, setQuantity ] = useState(props.quantity);
  const [ itemTotalCost, setItemTotalCost ] = useState(props.total_cost);
  // format currency
  const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(props.price);
  const formattedTotalCost = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(itemTotalCost);


  return (
    <>
      <tr className={props.wrapper}>
        <td>
          <img src={props.image} alt={props.name} />
        </td>
        <td>{props.name}</td>
        <td className={styles.price}>{formattedPrice}</td>
        <td>
          <div className={styles.quantity_wrapper}>
            <button
              className={styles.decrease_button}
            >
              -
            </button>
            <input type="number" value={props.quantity}/>
            <button
              className={styles.increase_button}
            >
              +
            </button>
          </div>
        </td>
        <td>{formattedTotalCost}</td>
        <td>
          <button className={styles.remove_button}>
            X
          </button>
        </td>
      </tr>
    </>
  );
}
