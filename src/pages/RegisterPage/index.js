import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import OAuth2Login from "react-simple-oauth2-login";
import authApi from '../../api/authApi';
import { login } from '../../redux/actions/user';
import styles from "./RegisterPage.module.css";

export default function RegisterPage() {

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

  const responseSuccessFacebook = async (response) => {
    const accessToken = response.access_token
    // Lay Profile Facebook thong qua AccessToken

    const result = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`)
    const data = await result.json()
    const { email, id, name } = data
    const avatar = data?.picture?.data.url

    // Goi API toi server de kiem tra facebookId, luu vao CSDL
    const responseServer = await authApi.loginWithFacebook({email, id, name, avatar})
    console.log({responseServer})

    // Nhan token tu server
    const { token, user } = responseServer
    localStorage.setItem('accessToken', token)
    const { userId } = user
    dispatch(login({ email, fullName: name, avatar, userId }))
    navigate({ pathname: '/' })
  }

  const responseFailureFacebook = (response) => {
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
      <Container>
        <div className={styles.wrapper}>
          <form>
          <h2 className={`title ${styles.title}`}>ĐĂNG KÝ</h2>
            <div className={`form-group ${styles.formGroup}`}>
              <input type="email" name="email" className="form-control" placeholder="Email" required />
            </div>
            <div className={`form-group ${styles.formGroup}`}>
              <input type="text" name="code" className="form-control" placeholder='Mã xác nhận' required  />
            </div>
            <div className={`form-group ${styles.formGroup}`}>
              <input type="password" name="password" className="form-control" placeholder="Mật khẩu" required />
            </div>
            <div className={`form-group ${styles.formGroup}`}>
              <input type="password" name="confirm-password" className="form-control" placeholder="Xác nhận mật khẩu" required />
            </div>
            <button className={`bookstore-btn ${styles.submitBtn}`}>Đăng ký</button>   
          </form>
          <p style={{color: '#ccc', textAlign: 'center'}}>HOẶC</p>
          <div className="d-flex justify-content-between">
              <div className={styles.boxLoginThirdParty}>
                <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png" alt="" />
                <OAuth2Login  
                    className="bookstore-btn"
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

              <div className={styles.boxLoginThirdParty}>
                <img src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png" alt="" />
                <OAuth2Login
                  className="bookstore-btn"
                  buttonText="Login with Facebook"
                  authorizationUrl="https://www.facebook.com/dialog/oauth"
                  responseType="token"
                  clientId="990086591697823"
                  redirectUri="http://localhost:3000"
                  scope="public_profile"
                  onSuccess={responseSuccessFacebook}
                  onFailure={responseFailureFacebook}
                ></OAuth2Login>
              </div>
            </div>
        </div>
      </Container>
    </div>
  )
}
