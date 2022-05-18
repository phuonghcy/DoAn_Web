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

import './Header.css';
import { useEffect, memo } from "react";
function Header() {

  console.log('header Render')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentUser = useSelector((state) => state.user.currentUser)
 

  useEffect(() => {
    const fetchData = async () => {
      const data = await userApi.getCurrentUser()
      const { email, fullName, avatar, _id } = data?.user
      dispatch(login({email, fullName, avatar, userId: _id}))
    }
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchData()
    }
  },[dispatch])

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
      localStorage.setItem('accessToken', '')
    }
    navigate({ pathname: '/' })
  }

  // console.log(currentUser)
 
  return (
    <header className="header">
      <div className="header-top">
        <Container>
          <div className="d-flex">
              <div className="header-top-left">
                <p>Chào mừng bạn đến với <span className="bookstore-highlight">BookStore</span></p>
              </div>
              <div className="header-top-right">
                <p className="hotline">Hotline: <span className="bookstore-highlight">08 111 222</span></p>
                <p className="bookstore-email d-flex align-items-center">
                  <IoMailOutline style={{marginRight: 5}}/> bookstore@gmail.com
                </p>
              </div>
          </div>
        </Container>
      </div>
      <div className="header-center">
          <Container>
            <div className="d-flex align-items-center">
              <h1 className="bookstore-highlight me-5">BookStore</h1>
              <div className="search">
                <form>
                  <div className="search-wrapper">
                    <button className="bookstore-btn search-btn">
                      <BsSearch />
                    </button>
                    <div className="form-group">
                      <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm..." />
                    </div>
                  </div>
                </form>
              </div>

              <div className="header-center-right d-flex">
                <div className="header-icon">
                  <Link to="">
                    <BsSuitHeart />
                    <p>Yêu thích</p>
                  </Link>
                </div>
                <div className="header-icon">
                  {
                    currentUser.email && currentUser.fullName ? 
                    <div className="account">
                      <img className="avatar" src={currentUser.avatar} alt="" />
                      <p>{currentUser.fullName}</p>
                      <div className="account-popup">
                          <div className="item"><Link className="popup-link" to="">Tài khoản của tôi</Link></div>
                          <div className="item"><Link className="popup-link" to="">Đơn hàng</Link></div>
                          <div className="item"><p className="popup-link" onClick={handleLogout} to="">Đăng xuất</p></div>
                      </div>
                    </div>
                    : <Link to="/dang-nhap"><BsPerson /><p>Tài khoản</p></Link>
                  }
                </div>
                <div className="header-icon">
                  <Link to="/gio-hang">
                    <BsCart2 />
                    <p>Giỏ hàng</p>
                  </Link>
                </div>
              </div>

            </div>
          </Container>
      </div>

      <div className="header-bottom">
        <Container>
          <NavBar />
        </Container>
      </div>

    </header>
  );
}

export default memo(Header);
