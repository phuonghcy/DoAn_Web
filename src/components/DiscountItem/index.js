import React, { useState } from "react";
import { AiFillCopy, AiOutlineShoppingCart } from "react-icons/ai";
import { RiCoupon2Fill } from "react-icons/ri";
import { ProgressBar } from "react-bootstrap";
import styles from "./DiscountItem.module.css";
import format from "../../helper/format";
import logo from "../../assets/images/logo.png";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { udpateVoucher } from "../../redux/actions/cart";
import voucherApi from "../../api/voucherApi";
import { useNavigate } from "react-router-dom";

const DiscountItem = ({ item }) => {
  const cartData = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [copied, setCopied] = useState(false);
  const now = (item.used_quantity / item.quantity) * 100;

  const copyClipboard = (value) => {
    navigator.clipboard.writeText(value);
    if (!copied) alert("copied");
    setCopied(true);
  };

  const handleUseNow = async (code) => {
    try {
      if (cartData?.list.length <= 0) {
        toast.info("Giỏ hàng của bạn đang rỗng!", { autoClose: 2000 });
        return
      }
      if (!code) {
        dispatch(udpateVoucher({
            voucher: "",
            discount: 0,
          }));
        navigate({ pathname: '/gio-hang' })
        return;
      }
      if (code === cartData.voucher) {
        navigate({ pathname: '/gio-hang' })
        return
      };
      const res = await voucherApi.getByCode(code);
      const voucherData = res.data;
      console.log(voucherData);
      if (cartData.subTotal < voucherData.price_request) {
        toast.info(
          `Giá trị đơn hàng cần tối thiểu ${format.formatPrice(
            voucherData.price_request
          )} để áp dụng!`,
          { autoClose: 2000 }
        );
        return;
      }
      if (voucherData.used_quantity >= voucherData.quantity) {
        toast.info("Số lượng sử dụng voucher này đã hết!", { autoClose: 2000 });
        return
      }
      const discountPrice = (cartData.subTotal * voucherData.discount) / 100;
      dispatch(
        udpateVoucher({
          voucher: code,
          discount: discountPrice,
        })
      );
      navigate({ pathname: '/gio-hang' })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`d-flex ${styles.discount_item}`}>
      <div className={styles.discount_item_left}>
        <img src={logo} alt="" />
      </div>
      <div className={styles.discount_item_right}>
        <div>
          <div className={styles.info}>
            <h6>
              Giảm {item.discount}% Đơn tối thiểu{" "}
              {format.formatPrice(item.price_request)}
            </h6>
            <ProgressBar
              className={styles.process}
              variant="success"
              now={now}
            />
            <p>
              <RiCoupon2Fill />
              Đã dùng {item.used_quantity}/{item.quantity} voucher
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={!copied ? "" : styles.unactive}
              onClick={() => copyClipboard(item.code)}
            >
              <AiFillCopy />
              {!copied ? "Copy" : "Đã copy"}
            </button>
            <button onClick={() => handleUseNow(item.code)}>
              <AiOutlineShoppingCart />
              Dùng ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountItem;
