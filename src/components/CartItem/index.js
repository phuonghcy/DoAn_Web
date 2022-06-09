import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../redux/actions/cart";
import format from "../../helper/format";
import styles from "./CartItem.module.css";

export default function CartItem(props) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(props.quantity);
  const [totalPriceItem, setTotalPriceItem] = useState(props.totalPriceItem);

  function increaseQuantity() {
    setQuantity((preValue) => preValue + 1);
    setTotalPriceItem(props.price * (quantity + 1));
  }

  function decreaseQuantity() {
    if (quantity > 0) {
      setQuantity((preValue) => preValue - 1);
      setTotalPriceItem(props.price * (quantity - 1));
    }
  }

  function handleChange(event) {
    const value =
      parseInt(event.target.value) > 0 ? parseInt(event.target.value) : 0;
    setQuantity(value);
    setTotalPriceItem(props.price * value);
  }

  const handleRemoveItem = (_id) => {
    dispatch(removeItem({ _id}));
  }

  useEffect(() => {
    dispatch(updateQuantity({ _id: props._id, quantity }));
  }, [quantity, dispatch, props._id]);

  return (
    <tr className={styles.wrapper}>
      <td>
        <img src={props.imageUrl} alt={props.name} className={styles.image} />
      </td>
      <td>{props.name}</td>
      <td className={styles.price}>{format.formatPrice(props.price)}</td>
      <td>
        <div className={styles.quantity_wrapper}>
          <button className={styles.decrease_button} onClick={decreaseQuantity}>
            -
          </button>
          <input type="number" value={quantity} onChange={handleChange} />
          <button className={styles.increase_button} onClick={increaseQuantity}>
            +
          </button>
        </div>
      </td>
      <td>{format.formatPrice(totalPriceItem)}</td>
      <td>
        <button className={styles.remove_button} onClick={() => handleRemoveItem(props._id)}>X</button>
      </td>
    </tr>
  );
}
