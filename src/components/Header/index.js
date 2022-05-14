import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { BsSearch, BsSuitHeart, BsPerson, BsCart2 } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import NavBar from "../NavBar";

import './Header.css';
function Header() {
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
                  <Link to="">
                    <BsPerson />
                    <p>Tài khoản</p>
                  </Link>
                </div>
                <div className="header-icon">
                  <Link to="">
                    <BsCart2 />
                    <p>Yêu thích</p>
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

export default Header;
