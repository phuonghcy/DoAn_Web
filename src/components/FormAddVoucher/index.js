import { Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import styles from "./FormAddVoucher.module.css";
import { useState } from "react";
import voucherApi from "../../api/voucherApi";

function FormAddVoucher() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      code: "",
      price_request: "",
      discount: "",
      quantity: "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      code: Yup.string().required("Không được bỏ trống trường này!"),
      price_request: Yup.number().required("Không được bỏ trống trường này!"),
      discount: Yup.string().required("Không được bỏ trống trường này!"),
      quantity: Yup.string().required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { code, price_request, discount, quantity } = formik.values;
      try {
        setLoading(true)
        await voucherApi.createVoucher({ code, price_request, discount, quantity })
        setLoading(false)
        alert("Thêm thành công!")
        navigate({ pathname: "/admin/voucher" });
      } catch (error) {
        setLoading(false)
        alert("That bai! ", error)
        console.log(error);
      }
    },
  });

  

  return (
    <Row className={styles.addWrapper}>
      <Col xl={12}>
        <Card>
          <Card.Header className={styles.header}>Thêm Mã giảm giá</Card.Header>
          <Card.Body>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Code</label>
                    <input
                      type="text"
                      name="code"
                      className={`form-control ${
                        formik.errors.code
                          ? "is-invalid"
                          : formik.values.code && "is-valid"
                      }`}
                      placeholder="Code"
                      value={formik.values.code}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.code && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.code}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Yêu cầu</label>
                    <input
                      type="number"
                      min="0"
                      name="price_request"
                      className={`form-control ${
                        formik.errors.price_request
                          ? "is-invalid"
                          : formik.values.price_request && "is-valid"
                      }`}
                      placeholder="Yêu cầu giá trị đơn hàng tối thiểu"
                      value={formik.values.price_request}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.price_request && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.price_request}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Giảm(%)</label>
                    <input
                      type="number"
                      min="0"
                      name="discount"
                      className={`form-control ${
                        formik.errors.discount
                          ? "is-invalid"
                          : formik.values.discount && "is-valid"
                      }`}
                      placeholder="Giảm(%)"
                      value={formik.values.discount}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.discount && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.discount}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Số lượng</label>
                    <input
                      type="number"
                      min="0"
                      name="quantity"
                      className={`form-control ${
                        formik.errors.quantity
                          ? "is-invalid"
                          : formik.values.quantity && "is-valid"
                      }`}
                      placeholder="Số lượng"
                      value={formik.values.quantity}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.quantity && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.quantity}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
              </Row>
              <div className="d-flex-center">
                <button type="submit" className={`bookstore-btn ${styles.submitBtn}`}>
                  Thêm
                </button>
                {loading && <Spinner style={{ marginLeft: "20px" }} animation="border" variant="success" />}
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}

export default FormAddVoucher;
