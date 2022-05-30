import React from 'react';
import styles from './PayItem.module.css'

const PayItem = ({item}) => {
  return (
    <div className={styles.container}>
      <p><span className={styles.name}>{item.name}</span> x <span className={styles.quantity}>{item.quantity}</span><span className={styles.right}>{item.total_cost}</span></p>
    </div>
  )
}
export default PayItem