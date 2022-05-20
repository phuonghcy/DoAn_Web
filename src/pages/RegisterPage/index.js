import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import OAuth2Login from "react-simple-oauth2-login";
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form>
          <h1>ĐĂNG KÝ</h1>
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder='Mã xác nhân OTP' required  />
          <input type="password" placeholder="Mật khẩu" required />
          <input type="password" placeholder="Xác nhận mật khẩu" required />
          <button className={styles.signup_button} type="submit">
            Đăng ký
          </button>
          
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
  )
}
