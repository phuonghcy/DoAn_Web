import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "../../api/authApi";
import styles from "./ResetPasswordPage.module.css";
function ResetPasswordPage() {
  const params = useParams();
  const navigate = useNavigate();

  const { code } = params;

  const [codeValue, setCodeValue] = useState("")

  useEffect(() => {
    if (code) setCodeValue(code)
  }, [code])

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      password: Yup.string().required("Không được bỏ trống trường này!"),
      confirmPassword: Yup.string()
        .required("Không được bỏ trống trường này!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp!"),
    }),
    onSubmit: async () => {
      const { password } = formik.values;
      try {
        const res = await authApi.resetPassword({password, code: codeValue})
        if (!res.error) {
          alert("Đổi mật khẩu thành công")
          navigate({ pathname: "/dang-nhap" });
          return
        } else {
          alert(res.message)
        }
      } catch (error) {
        alert(error)
      }
    },
  });

  return (
    <div className="main">
      <Container>
        <div className={styles.wrapper}>
          <form onSubmit={formik.handleSubmit}>
            <h2 className={`title ${styles.title}`}>ĐẶT LẠI MẬT KHẨU</h2>
            <div className={`form-group ${styles.formGroup}`}>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${styles.formControl} ${
                  formik.errors.password ? "is-invalid" : ""
                }`}
                autoComplete="on"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </div>
            <div className={`form-group ${styles.formGroup}`}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${styles.formControl} ${
                  formik.errors.confirmPassword ? "is-invalid" : ""
                }`}
                autoComplete="on"
                placeholder="Xác nhận mật khẩu"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </div>
            <button className={`bookstore-btn ${styles.submitBtn}`}>
              Đổi mật khẩu
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default ResetPasswordPage;
