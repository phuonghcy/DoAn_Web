import { Row, Col, Card, Form, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import styles from "./FormUpdateAuthor.module.css";
import { useEffect, useState } from "react";
import authorApi from "../../api/authorApi";

function FormUpdateAuthor() {
  const params = useParams()
  const { id } = params

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)
  const [authorData, setAuthorData] = useState({})


  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await authorApi.getById(id);
        setAuthorData(res.data.author)
      } catch (error) {
        console.log(error);
      }
    };
    fetchAuthor();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: authorData.name ? authorData.name : "",
      year: authorData.year ? authorData.year : "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Không được bỏ trống trường này!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { name, year } = formik.values;
      try {
        setLoading(true)
        await authorApi.updateAuthor(id, { name, year })
        setLoading(false)
        alert("Cập nhật thành công!")
        navigate({ pathname: "/admin/author" });
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
          <Card.Header className={styles.header}>Cập nhật thông tin tác giả</Card.Header>
          <Card.Body>
            <form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xl={4}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Tên tác giả</label>
                    <input
                      type="text"
                      name="name"
                      className={`form-control ${
                        formik.errors.name
                          ? "is-invalid"
                          : formik.values.name && "is-valid"
                      }`}
                      placeholder="Tên tác giả"
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.name && (
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.name}
                      </Form.Control.Feedback>
                    )}
                  </div>
                </Col>
                <Col xl={3}>
                  <div className={`form-group ${styles.formGroup}`}>
                    <label className={styles.formLabel}>Năm sinh</label>
                    <input
                      type="number"
                      min="0"
                      name="year"
                      className={`form-control ${
                        formik.errors.year
                          ? "is-invalid"
                          : formik.values.year && "is-valid"
                      }`}
                      placeholder="Năm sinh"
                      value={formik.values.year}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    {formik.errors.year && (
                      <Form.Control.Feedback
                        type="invalid"
                        className={styles.feedback}
                      >
                        {formik.errors.year}
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

export default FormUpdateAuthor;
