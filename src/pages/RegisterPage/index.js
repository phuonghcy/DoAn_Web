import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import OAuth2Login from "react-simple-oauth2-login";
import authApi from "../../api/authApi";
import { login } from "../../redux/actions/user";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {

  const [loading, setLoading] = useState(false)

  const [showEnterEmail, setShowEnterEmail] = useState(true);
  const [showEnterCode, setShowEnterCode] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const [emailValue, setEmailValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseSuccessGoogle = async (response) => {
    const accessToken = response.access_token;
    console.log("accessToken-Google", accessToken);
    const responseServer = await authApi.loginWithGoogle(accessToken);
    console.log({ responseServer });
    const { token, user } = responseServer;
    localStorage.setItem("accessToken", token);
    const { email, fullName, phoneNumber, userId, avatar, role } = user;
    dispatch(login({ email, fullName, phoneNumber, avatar, userId, role }));
    navigate({ pathname: "/" });
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const responseSuccessFacebook = async (response) => {
    const accessToken = response.access_token;
    // Lay Profile Facebook thong qua AccessToken

    const result = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
    );
    const data = await result.json();
    const { email, id, name } = data;
    const avatar = data?.picture?.data.url;

    // Goi API toi server de kiem tra facebookId, luu vao CSDL
    const responseServer = await authApi.loginWithFacebook({
      email,
      id,
      name,
      avatar,
    });
    console.log({ responseServer });

    // Nhan token tu server
    const { token, user } = responseServer;
    localStorage.setItem("accessToken", token);
    const { userId, role, phoneNumber } = user;
    dispatch(login({ email, fullName: name, phoneNumber, avatar, userId, role }));
    navigate({ pathname: "/" });
  };

  const responseFailureFacebook = (response) => {
    console.log(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate({ pathname: "/" });
    }
  }, [navigate]);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    // Truong hop: ???? nh???p email => submit => show input nhap code
    if (!showEnterCode) {
      console.log(emailValue);
      // Call API tao code, gui code t???i email
      setLoading(true)
      const res = await authApi.createCodeVerifyEmail({ email: emailValue });
      setLoading(false)
      if (!res.error) {
        setShowEnterCode(true);
        return;
      }
      return alert(`Th??ng b??o t??? Server: ${res.message}`);
    }
    if (emailValue && codeValue) {
      // Call API gui code, email t???i Server kiem tra khop hay khong?
      const res = await authApi.verifyEmailAndCode({
        email: emailValue,
        code: codeValue,
      });
      console.log(res);
      if (!res.error) {
        setShowEnterEmail(false);
        setShowRegisterForm(true);
        return;
      }
      return alert(`Th??ng b??o t??? Server: ${res.message}`);
    }
  };

  //Formik: register form

  const formik = useFormik({
    initialValues: {
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Kh??ng ???????c b??? tr???ng tr?????ng n??y!"),
      password: Yup.string().required("Kh??ng ???????c b??? tr???ng tr?????ng n??y!"),
      confirmPassword: Yup.string()
                        .required("Kh??ng ???????c b??? tr???ng tr?????ng n??y!")
                        .oneOf([Yup.ref("password"), null], "M???t kh???u kh??ng kh???p!"),
    }),
    onSubmit: async () => {
      const { fullName, password } = formik.values
      const res = await authApi.register({email: emailValue, fullName, password})
      if (!res.error && res.data) {
        alert("T???o t??i kho???n th??nh c??ng!")
        navigate({ pathname: "/dang-nhap" });
      } else {
        return alert("T???o t??i kho???n th???t b???i!")
      }
    },
  });

  return (
    <div className="main">
      <Container>
        <div className={styles.wrapper}>
          {showEnterEmail && (
            <form onSubmit={handleSubmitEmail}>
              <h2 className={`title ${styles.title}`}>????NG K??</h2>
              <div className={`form-group ${styles.formGroup}`}>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  required
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />
              </div>
              {loading && (
              <div className="row">
                  <Spinner style={{margin: '0 auto'}} animation="border" variant="success" />
              </div>
              )}
              {showEnterCode && (
                <>
                  <p>H??y ki???m tra email ????? nh???n ???????c code!</p>
                  <div className={`form-group ${styles.formGroup}`}>
                    <input
                      type="text"
                      name="code"
                      className="form-control"
                      placeholder="M?? x??c nh???n"
                      required
                      value={codeValue}
                      onChange={(e) => setCodeValue(e.target.value)}
                    />
                  </div>
                </>
              )}
              <button className={`bookstore-btn ${styles.submitBtn}`}>
                Ti???p t???c
              </button>
            </form>
          )}

          {showRegisterForm && (
            <form onSubmit={formik.handleSubmit}>
              <p className={`title ${styles.title}`}>Nh???p th??ng tin</p>
              <div className={`form-group ${styles.formGroup}`}>
                <input
                  type="text"
                  id="fullname"
                  name="fullName"
                  className={`form-control ${styles.formControl} ${formik.errors.fullName ? 'is-invalid' : ''}`}
                  placeholder="H??? v?? t??n"
                  value={formik.values.fullName}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                 {formik.errors.fullName && (
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.fullName}
                  </Form.Control.Feedback>
                )}
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${styles.formControl} ${formik.errors.password ? 'is-invalid' : ''}`}
                  autoComplete="on"
                  placeholder="M???t kh???u"
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
                  className={`form-control ${styles.formControl} ${formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                  autoComplete="on"
                  placeholder="X??c nh???n m???t kh???u"
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
                ????ng k??
              </button>
            </form>
          )}
          <p style={{ color: "#ccc", textAlign: "center" }}>HO???C</p>
          <div className="d-flex justify-content-between">
            <div className={styles.boxLoginThirdParty}>
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                alt=""
              />
              <OAuth2Login
                className="bookstore-btn"
                buttonText="Login with Google"
                authorizationUrl="https://accounts.google.com/o/oauth2/auth"
                responseType="token"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                redirectUri={process.env.REACT_APP_REDIRECT_LOGIN_GOOGLE}
                scope="email profile"
                onSuccess={responseSuccessGoogle}
                onFailure={responseFailureGoogle}
              ></OAuth2Login>
            </div>

            <div className={styles.boxLoginThirdParty}>
              <img
                src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png"
                alt=""
              />
              <OAuth2Login
                className="bookstore-btn"
                buttonText="Login with Facebook"
                authorizationUrl="https://www.facebook.com/dialog/oauth"
                responseType="token"
                clientId="990086591697823"
                redirectUri={process.env.REACT_APP_REDIRECT_LOGIN_FACEBOOK}
                scope="public_profile"
                onSuccess={responseSuccessFacebook}
                onFailure={responseFailureFacebook}
              ></OAuth2Login>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
