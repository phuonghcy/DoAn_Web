import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem";
import { useSelector } from "react-redux";
import format from "../../helper/format";
import styles from "./CartPage.module.css";

function CartPage() {
  const cartData = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);

  const handleNavigateToCheckout = (e) => {
    if (!currentUser.userId) {
      e.preventDefault()
      alert("Bạn cần đăng nhập để thực hiện thanh toán!")
    }
  }

  return (
    <div className="main">
      <Container>
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
                    />
                    <button>Áp dụng</button>
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
