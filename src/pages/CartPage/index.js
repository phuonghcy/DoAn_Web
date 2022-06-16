import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import format from "../../helper/format";
import styles from "./CartPage.module.css";
import { ToastContainer, toast } from 'react-toastify';
import { udpateVoucher } from "../../redux/actions/cart"
import { useState } from "react";
import voucherApi from "../../api/voucherApi"

function CartPage() {
  const cartData = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch()
  const [voucher, setVoucher] = useState(cartData.voucher || "")
  const handleNavigateToCheckout = (e) => {
    if (!currentUser.userId) {
      e.preventDefault()
      alert("Bạn cần đăng nhập để thực hiện thanh toán!")
    }
  }

  const handleApplyVoucher = async () => {
    console.log(voucher)
    try {
      if (!voucher) {
        dispatch(udpateVoucher({
          voucher: "",
          discount: 0
        }))
        return
      }
      if (voucher === cartData.voucher) return
      const res = await voucherApi.getByCode(voucher)
      const voucherData = res.data
      console.log(voucherData)
      if (!voucherData.discount) {
        toast.info("Voucher này không tồn tại!", {autoClose: 2000})
        dispatch(udpateVoucher({
          voucher: "",
          discount: 0
        }))
        return
      }
      if (cartData.subTotal < voucherData.price_request) {
        toast.info(
          `Giá trị đơn hàng cần tối thiểu ${format.formatPrice(voucherData.price_request)} để áp dụng!`, 
          {autoClose: 2000})
        return
      }
      if (voucherData.used_quantity >= voucherData.quantity) {
        toast.info("Số lượng sử dụng voucher này đã hết!", {autoClose: 2000})
        return
      }
      const discountPrice = cartData.subTotal * voucherData.discount / 100
      dispatch(udpateVoucher({
        voucher: voucher,
        discount: discountPrice
      }))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="main">
      <Container>
        <ToastContainer />
        <div className={styles.cart_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Giỏ hàng</li>
          </ul>
          <h1>GIỎ HÀNG</h1>
        </div>
        <div className={styles.cart_body}>
          {cartData.list.length > 0 ? (
            <Row>
              <Col xl={8}>
                <div className={styles.cart_table}>
                  <table>
                    <thead>
                      <tr>
                        <th colSpan={2}>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartData.list.map((item) => (
                        <CartItem
                          key={item._id}
                          _id={item._id}
                          name={item.name}
                          imageUrl={item.imageUrl}
                          price={item.price}
                          quantity={item.quantity}
                          totalPriceItem={item.totalPriceItem}
                        ></CartItem>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Col>

              <Col xl={4}>
                <div className={styles.cart_voucher}>
                  <div className={styles.input}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nhập mã giảm giá"
                      value={voucher}
                      onChange={(e) => setVoucher(e.target.value)}
                    />
                    <button type="button" onClick={handleApplyVoucher}>Áp dụng</button>
                  </div>
                  <div className={styles.cart_info}>
                    <p>
                      Tạm tính{" "}
                      <span className={styles.info_right}>
                        {format.formatPrice(cartData.subTotal)}
                      </span>
                    </p>{" "}
                    <br></br>
                    <p>
                      Giảm giá{" "}
                      <span className={styles.info_right}>
                        {format.formatPrice(cartData.discount)}
                      </span>
                    </p>{" "}
                    <br></br>
                    <p>
                      Thành tiền{" "}
                      <span className={styles.info_right}>
                        {format.formatPrice(cartData.total)}
                      </span>
                    </p>{" "}
                    <br></br>
                  </div>
                  <Link to="/thanh-toan" onClick={handleNavigateToCheckout}>
                    <button className={styles.pay_button}>
                      Tiến hành thanh toán
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          ) : 
          <Row>
            <Col xl={12}>
            <div className={styles.empty}>
            <img src="https://www.hanoicomputer.vn/template/july_2021/images/tk-shopping-img.png" alt="" />
            <p>Không có sản phẩm nào trong giỏ hàng của bạn!</p>
            <Link to="/" className={`bookstore-btn ${styles.backHome}`}>Tiếp tục mua sắm</Link>
            </div>
            </Col>
          </Row>}
        </div>
      </Container>
    </div>
  );
}

export default CartPage;
