import { Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import styles from "./FormUpdateVoucher.module.css";
import { useEffect, useState } from "react";
import voucherApi from "../../api/voucherApi";

function FormUpdateVoucher() {
  const params = useParams()
  const { id } = params

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [voucherData, setVoucherData] = useState({});

  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const res = await voucherApi.getById(id);
        setVoucherData(res.data)
      } catch (error) {
        console.log(error);
      }
    };
    fetchVoucher();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      price_request: voucherData.price_request ? voucherData.price_request : 0,
      discount: voucherData.discount ? voucherData.discount : "",
      quantity: voucherData.quantity ? voucherData.quantity : "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      price_request: Yup.number().required("Không được bỏ trống trường này!"),
      discount: Yup.string().required("Không được bỏ trống trường này!"),
      quantity: Yup.string().required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { price_request, discount, quantity } = formik.values;
      try {
        setLoading(true)
        await voucherApi.updateVoucher(id, { price_request, discount, quantity })
        setLoading(false)
        alert("Cập nhật thành công!")
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
                      className={`form-control`}
                      placeholder="Code"
                      value={voucherData.code ? voucherData.code : ""}
                      readOnly
                    />
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
                  Lưu
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

export default FormUpdateVoucher;
