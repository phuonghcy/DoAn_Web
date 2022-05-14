import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoPaperPlane, IoLogoFacebook, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";

import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col xl={3}>
            <div className="footer-group">
              <h1 className="bookstore-highlight me-5">BookStore</h1>
              <p>Khu phố 6, phường Linh Trung, TP Thủ Đức, TP HCM</p>
              <p>bookstore@gmail.com</p>
            </div>
          </Col>
          <Col xl={6}>
            <div className="footer-group">
                <Row>
                  <Col xl={4}>
                    <div className="footer-link">
                        <p className="title">SẢN PHẨM</p>
                        <Link to="/">Văn học</Link>
                        <Link to="/">Ẩm thực</Link>
                        <Link to="/">Tâm lý - Kỹ năng sống</Link>
                        <Link to="/">Kinh tế</Link>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <div className="footer-link">
                        <p className="title">DANH MỤC</p>
                        <Link to="/">Trang chủ</Link>
                        <Link to="/">Giới thiệu</Link>
                        <Link to="/">Liên hệ</Link>
                        <Link to="/">Danh mục sản phẩm</Link>
                    </div>
                  </Col>
                  <Col xl={4}>
                    <div className="footer-link">
                        <p className="title">CHÍNH SÁCH</p>
                        <Link to="/">Chính sách đổi trả</Link>
                        <Link to="/">Chính sách vận chuyển</Link>
                    </div>
                  </Col>
                </Row>
            </div>
          </Col>
          <Col xl={3}>
            <div className="footer-group">
              <p className="title">ĐĂNG KÝ</p>
              <p>Đăng ký để nhận được được thông tin mới nhất từ chúng tôi.</p>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Email..." />
                <button className="bookstore-btn subscribe-btn"><IoPaperPlane /></button>
              </div>
              <div className="box-social">
                <button className="bookstore-btn"><IoLogoFacebook /></button>
                <button className="bookstore-btn"><IoLogoYoutube /></button>
                <button className="bookstore-btn"><IoLogoInstagram /></button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
