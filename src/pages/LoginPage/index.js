import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUnlock } from "react-icons/bs";
import localStorage from "localStorage";
import OAuth2Login from "react-simple-oauth2-login";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const navigate = useNavigate();

  function onSuccess(response) {
    localStorage.setItem("access_token", response.access_token);
    navigate("/");
  }

  function onFailure(response) {
    console.log(response);
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form>
          <h1>ĐĂNG NHẬP</h1>
          <input type="text" placeholder="Số điện thoại hoặc Email" required />
          <input type="password" placeholder="Mật khẩu" required eleAterInput />
          <Link className={styles.forgot_password} to="/quen-mat-khau">
            Quên mật khẩu?
          </Link>
          <br></br>
          <button className={styles.login_button} type="submit">
            Đăng nhập
          </button>
          <p>
            Chưa có tài khoản?
            <Link className={styles.register} to="/dang-ki">
              {" "}
              Đăng kí ngay
            </Link>
          </p>
          <div className={styles.third_party_wrapper}>
            <OAuth2Login
              className={styles.button}
              authorizationUrl="https://accounts.google.com/o/oauth2/auth"
              responseType="token"
              clientId="633817129267-8ve3g3uk7mhsrdd0elci28as9g7389sr.apps.googleusercontent.com"
              redirectUri="http://localhost:3000/auth/google/diamonjewelry"
              scope="profile"
            >
              <i className="fa fa-google" />Google
               
            </OAuth2Login>
            <OAuth2Login
              className={styles.button}
              authorizationUrl="https://www.facebook.com/dialog/oauth"
              responseType="token"
              clientId="5374491585936093"
              redirectUri="http://localhost:3000/auth/facebook/diamonjewelry"
              scope="public_profile"
            >
              <i className="fa fa-facebook" />Facebook
            </OAuth2Login>
          </div>
        </form>
      </div>
    </div>
  );
}
