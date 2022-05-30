import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import OAuth2Login from 'react-simple-oauth2-login';

import authApi from '../../api/authApi';
import { login } from '../../redux/actions/user';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

import styles from './LoginPage.module.css';

function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const responseSuccessGoogle = async (response) => {
   try {
    const accessToken = response.access_token
    console.log('accessToken-Google', accessToken)
    const responseServer = await authApi.loginWithGoogle(accessToken)
    console.log({responseServer})
    const { token, user } = responseServer
    localStorage.setItem('accessToken', token)
    const { email, fullName, userId, avatar, role } = user
    dispatch(login({ email, fullName, avatar, userId, role }))
    navigate({ pathname: '/' })
   } catch (error) {
     console.log(error)
   }
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
    const { userId, role } = user
    dispatch(login({ email, fullName: name, avatar, userId, role }))
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

  const handleLogin = async (e) => {
    e.preventDefault()

    const res = await authApi.login({email, password})
    console.log({res})
    if (res.error) return alert (res.message)
    // Nhan token tu server
    const { token, user } = res
    localStorage.setItem('accessToken', token)
    const { fullName, userId, avatar, role } = user
    dispatch(login({ email, fullName, avatar, userId, role }))
    navigate({ pathname: '/' })
  }

  
  return (
    <div className="main">
      <div className={styles.loginPage}>
        <Container>
          <div className={styles.wrapper}>
            <h2 className={`title ${styles.title}`}>ĐĂNG NHẬP</h2>
            <form className="form-login" onSubmit={handleLogin}>
              <div className={`form-group ${styles.formGroup}`}>
                <input required type="text" name="email" className="form-control" placeholder="Email..."
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className={`form-group ${styles.formGroup}`}>
                <input required type="password" name="password" className="form-control" autoComplete="on" placeholder="Mật khẩu..." 
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link className={styles.forgotPassword} to="/quen-mat-khau">Quên mật khẩu?</Link>
              <button className={`bookstore-btn ${styles.submitBtn}`}>Đăng nhập</button>
            </form>
            <p style={{textAlign: 'center'}}>
              Bạn chưa có tài khoản? <Link to="/dang-ki" style={{color: '#0074da'}}>Đăng ký tại đây</Link>
            </p>
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
    </div>
  );
}

export default LoginPage;
