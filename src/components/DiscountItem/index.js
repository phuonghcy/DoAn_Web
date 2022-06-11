import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillCopy, AiOutlineShoppingCart } from 'react-icons/ai'
import { RiCoupon2Fill } from 'react-icons/ri'
import { ProgressBar } from 'react-bootstrap'
import styles from './DiscountItem.module.css'
import format from '../../helper/format'
import logo from '../../assets/images/logo.png'

const DiscountItem = ({ item }) => {
    const [copied, setCopied] = useState(false)
    const now = item.used_quantity / item.quantity * 100;

    const copyClipboard = (value) => {
        navigator.clipboard.writeText(value);
        if(!copied)
            alert('copied')
        setCopied(true)
    }
  return (
    <div className={`d-flex ${styles.discount_item}`}>
        <div className={styles.discount_item_left}>
            <img src={logo} alt="" />
        </div>
        <div className={styles.discount_item_right}>
            <div>
                <div className={styles.info}>
                    <h6>Giảm {item.discount}% Đơn tối thiểu {format.formatPrice(item.price_request)}</h6>
                    <ProgressBar className={styles.process} variant="success" now={now} />
                    <p>
                        <RiCoupon2Fill />
                        Đã dùng {item.used_quantity}/{item.quantity} voucher
                    </p> 
                </div>
                <div className={styles.actions}>
                    <button className={!copied ? "" : styles.unactive} onClick={()=>copyClipboard(item.code)}>
                        <AiFillCopy />
                        {!copied ? "Copy" : "Đã copy"}
                    </button>
                    <button>
                        <Link to="/gio-hang">
                            <AiOutlineShoppingCart />
                            Dùng ngay
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DiscountItem