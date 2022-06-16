import { Container, Row, Col, Form } from "react-bootstrap";
import PayItem from "../../components/PayItem";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import format from "../../helper/format";
import AddressSelect from "../../components/AddressSelect";
import { ToastContainer, toast } from 'react-toastify';

import orderApi from "../../api/orderApi";
import userApi from "../../api/userApi";
import styles from "./PaymentPage.module.css";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { destroy } from "../../redux/actions/cart"


export default function PaymentPage() {
  const [shippingAddress, setShippingAddress] = useState("");
  const [address, setAddress] = useState([]);
  const cartData = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [defaultAddress, setDefaultAddress] = useState("");
  const [showAddressSelect, setShowAddressSelect] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

   
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!currentUser.userId || !token) {
      navigate({ pathname: '/' })
    }
  }, [navigate, currentUser])

  useEffect(() => {
    // Call API lấy danh sách địa chỉ
    const fetchDataAddress = async () => {
      try {
        const res = await userApi.getAllAddressById(currentUser.userId);
        const data = res.data.address;
        if (data.length > 0) {
          const result = data.filter((item) => item.isDefault === true);
          if (result.length > 0) setDefaultAddress(result[0].address);
          else setDefaultAddress(data[0].address);
        }
        setAddress(res.data.address);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.userId) {
      fetchDataAddress();
    }
  }, [currentUser]);

  const formik = useFormik({
    initialValues: {
      fullName: currentUser && currentUser.fullName ? currentUser.fullName : "",
      email: currentUser && currentUser.email ? currentUser.email : "",
      phoneNumber:
        currentUser && currentUser.phoneNumber ? currentUser.phoneNumber : "",
      address: defaultAddress,
      method: 0,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Không được bỏ trống trường này!"),
      email: Yup.string()
        .email("Invalid email")
        .required("Không được bỏ trống trường này!"),
      phoneNumber: Yup.string().required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { email, fullName, phoneNumber, address, method } = formik.values;
      let fullAddress = address
      if (!fullAddress || showAddressSelect) {
        const { province, district, ward, address } = shippingAddress;
        const { name: districtName } = district;
        const { name: provinceName } = province;
        const { name: wardName } = ward;
        fullAddress = `${address}, ${wardName}, ${districtName}, ${provinceName}`
      }
      try {
        await orderApi.createOrder({
          userId: currentUser && currentUser.userId ? currentUser.userId : "",
          email,
          fullName,
          phoneNumber,
          address: fullAddress,
          voucher: cartData.voucher,
          method,
          cost: {
            subTotal: cartData.subTotal,
            discount: cartData.discount,
            total: cartData.total,
          },
          cart: cartData.list,
        });
        toast.success("Đặt mua hàng thành công!", {autoClose: 2000})
        dispatch(destroy())
        setTimeout(() => navigate({ pathname: '/don-hang' }), 3000)

      } catch (error) {
        toast.info(`${error.response.data.message}`, {autoClose: 2000})
      }
    },
  });

  const handleGetAddress = useCallback((data) => {
    setShippingAddress(data);
  }, []);

  return (
    <div className="main">
      <ToastContainer />
      <Container>
        <div className={styles.payment_header}>
          <ul>
            <li>Trang chủ</li>
            <li>Thanh toán</li>
          </ul>
        </div>
        <div className={styles.payment_body}>
          <Row>
            <Col xl={7}>
              <div className={styles.payment_info}>
                <h4>THÔNG TIN NHẬN HÀNG</h4>
                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Họ và tên</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.fullName ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Họ và tên"
                    value={formik.values.fullName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fullName && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.fullName}
                    </Form.Control.Feedback>
                  )}
                </div>

                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.email ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  )}
                </div>

                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Số điện thoại</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.phoneNumber ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Số điện thoại"
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phoneNumber && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.phoneNumber}
                    </Form.Control.Feedback>
                  )}
                </div>
                <div>
                  {address && address.length > 0 ? (
                    address.map((item) => (
                      <div key={item._id}>
                        <input
                          type="radio"
                          name="address"
                          value={item.address}
                          checked={item.address === formik.values.address}
                          onChange={formik.handleChange}
                        />
                        <label>{item.address}</label>
                      </div>
                    ))
                  ) : (
                    <AddressSelect onChangeAddress={handleGetAddress} />
                  )}

                  {address && address.length > 0 && (
                    <p onClick={() => setShowAddressSelect(!showAddressSelect)}>
                      Địa chỉ khác
                    </p>
                  )}
                </div>
                {showAddressSelect && <AddressSelect onChangeAddress={handleGetAddress} />}
              </div>
            </Col>
            <Col xl={5}>
              <div className={styles.payment_form}>
                <h4>ĐƠN HÀNG CỦA BẠN</h4>
                <div>
                  <p>
                    SẢN PHẨM<span className={styles.form_right1}>TỔNG</span>
                  </p>
                  {cartData.list.map((item) => (
                    <PayItem
                      item={item}
                      key={item._id}
                      quantity={item.quantity}
                      totalPriceItem={item.totalPriceItem}
                    />
                  ))}
                  <p>
                    Tổng phụ
                    <span className={styles.form_right}>
                      {format.formatPrice(cartData.subTotal)}
                    </span>
                  </p>
                  <p>
                    Giảm giá
                    <span className={styles.form_right}>
                      {format.formatPrice(cartData.discount)}
                    </span>
                  </p>
                  <p>
                    Tổng
                    <span className={styles.form_right}>
                      {format.formatPrice(cartData.total)}
                    </span>
                  </p>
                </div>
                <br></br>
                <h4>PHƯƠNG THỨC THANH TOÁN</h4>
                <div>
                  <input 
                    type="radio" 
                    name="method" 
                    value="0" 
                    checked={parseInt(formik.values.method) === 0}
                    onChange={formik.handleChange}
                  />Trả tiền mặt khi nhận hàng
                  <br />
                  <input 
                    type="radio" 
                    name="method"
                    value="1"
                    checked={parseInt(formik.values.method) === 1}
                    onChange={formik.handleChange}
                     /> Thanh toán qua Paypal
                </div>
                <button type="submit" onClick={formik.handleSubmit}>
                  ĐẶT HÀNG
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
