import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import {GoogleLogin} from 'react-google-login';
import OAuth2Login from 'react-simple-oauth2-login';
import authApi from '../../api/authApi';
import { login } from '../../redux/actions/user';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

import styles from './LoginPage.module.css';

function LoginPage() {

  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseSuccessGoogle = async (response) => {
    const accessToken = response.access_token
    console.log('accessToken-Google', accessToken)
    const responseServer = await authApi.loginWithGoogle(accessToken)
    console.log({responseServer})
    const { token, user } = responseServer
    localStorage.setItem('accessToken', token)
    const { email, fullName, userId, avatar } = user
    dispatch(login({ email, fullName, avatar, userId }))
    navigate({ pathname: '/' })
  }

  const responseFailureGoogle = (response) => {
    console.log(response)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      navigate({ pathname: '/' })
    }
  }, [navigate])

  
  return (
    <div className="main">
      <div className={styles.loginPage}>
        <Container>
          <div className={styles.wrapper}>
            <h2 className={styles.title}>ĐĂNG NHẬP</h2>
            <form className="form-login">
              <div className={`form-group ${styles.formGroup}`}>
                <input type="text" name="email" className="form-control" placeholder="Email..." />
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <input type="password" name="password" className="form-control" autoComplete="on" placeholder="Mật khẩu..." />
              </div>
              <Link className="forgot-password" to="/quen-mat-khau">Quên mật khẩu?</Link>
              <button className={`bookstore-btn ${styles.submitBtn}`}>Đăng nhập</button>
            </form>
            <p style={{color: '#ccc', textAlign: 'center'}}>HOẶC</p>
            {/* <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={'single_host_origin'}
            />             */}
            <div className={styles.boxLoginWithGoogle}>
              <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="" />
              <OAuth2Login  className="bookstore-btn"
                  buttonText="Login with Google"
                  authorizationUrl="https://accounts.google.com/o/oauth2/auth"
                  responseType="token"
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  redirectUri="http://localhost:3000"
                  scope="email profile"
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
              ></OAuth2Login>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default LoginPage;
