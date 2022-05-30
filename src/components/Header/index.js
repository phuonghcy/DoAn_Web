import { useDispatch, useSelector } from "react-redux";

import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { BsSearch, BsSuitHeart, BsPerson, BsCart2 } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import NavBar from "../NavBar";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import authorApi from "../../api/authorApi"
import { login, logout } from '../../redux/actions/user';

import { useEffect, memo } from "react";
import styles from './Header.module.css';
function Header() {

  console.log('header Render')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userApi.getCurrentUser()
        const { email, fullName, avatar, _id, role } = data?.user
        dispatch(login({email, fullName, avatar, userId: _id, role}))
      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch(logout())
          navigate({ pathname: '/dang-nhap' })
        }
      }
    }
    const token = localStorage.getItem('accessToken')
    if (token && !currentUser.userId) {
      fetchData()
    }
  },[dispatch, navigate, currentUser])

  useEffect(() => {
    const fetchData = async () => {
      const data = await authorApi.getAll()
      console.log(data)
    }
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchData()
    }
    
  },[])

  const handleLogout = async () => {
    const resultLogout = await authApi.logout()
    console.log(resultLogout)
    dispatch(logout())
    const token = localStorage.getItem('accessToken')
    if (token) {
      localStorage.removeItem('accessToken')
    }
    navigate({ pathname: '/' })
  }

  // console.log(currentUser)
 
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <Container>
          <div className="d-flex">
              <div className={styles.headerTopLeft}>
                <p>Chào mừng bạn đến với <span className={styles.bookstoreHighlight}>BookStore</span></p>
              </div>
              <div className={styles.headerTopRight}>
                <p className={styles.hotline}>Hotline: <span className={styles.bookstoreHighlight}>08 111 222</span></p>
                <p className="bookstore-email d-flex align-items-center">
                  <IoMailOutline style={{marginRight: 5}}/> bookstore@gmail.com
                </p>
              </div>
          </div>
        </Container>
      </div>
      <div className={styles.headerCenter}>
          <Container>
            <div className="d-flex align-items-center">
              <h1 className={`${styles.bookstoreHighlight} me-5`}>BookStore</h1>
              <div className={styles.search}>
                <form>
                  <div className={styles.searchWrapper}>
                    <button className={`bookstore-btn ${styles.searchBtn}`}>
                      <BsSearch />
                    </button>
                    <div className="form-group">
                      <input type="text" className={`form-control ${styles.formControl}`} placeholder="Tìm kiếm sản phẩm..." />
                    </div>
                  </div>
                </form>
              </div>

              <div className={`${styles.headerCenterRight} d-flex`}>
                <div className={styles.headerIcon}>
                  <Link to="/yeu-thich">
                    <BsSuitHeart />
                    <p>Yêu thích</p>
                  </Link>
                </div>
                <div className={styles.headerIcon}>
                  {
                    currentUser.email && currentUser.fullName ? 
                    <div className={styles.account}>
                      <img className={styles.avatar} src={currentUser.avatar} alt="" />
                      <p>{currentUser.fullName}</p>
                      <div className={styles.accountPopup}>
                          <div className={styles.item}><Link className={styles.popupLink} to="/tai-khoan">Tài khoản của tôi</Link></div>
                          <div className={styles.item}><Link className={styles.popupLink} to="">Đơn hàng</Link></div>
                          <div className={styles.item}><p className={styles.popupLink} onClick={handleLogout} to="">Đăng xuất</p></div>
                      </div>
                    </div>
                    : <Link to="/dang-nhap"><BsPerson /><p>Tài khoản</p></Link>
                  }
                </div>
                <div className={styles.headerIcon}>
                  <Link to="/gio-hang">
                    <BsCart2 />
                    <p>Giỏ hàng</p>
                  </Link>
                </div>
              </div>

            </div>
          </Container>
      </div>

      <div className={styles.headerBottom}>
        <Container>
          <NavBar />
        </Container>
      </div>

    </header>
  );
}

export default memo(Header);
