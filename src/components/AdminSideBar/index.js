import { Link, useNavigate } from "react-router-dom";
import styles from "./AdminSideBar.module.css";
import logo from '../../assets/images/logo.png'
import { useState } from "react";
import authApi from "../../api/authApi";
import { logout } from '../../redux/actions/user';
import { useDispatch } from "react-redux";

function AdminSideBar() {
  const [active, setActive] = useState("analytics")
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
  return (
    <div className={styles.adminSideBar}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src={logo}
            alt=""
          />
          <span>BookStore</span>
        </Link>
      </div>
      <div className={styles.sidebarContainer}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${active === "analytics" ? styles.active : ""}`} onClick={() => setActive("analytics")}>
            <Link className={styles.navLink} to="/admin">
              <span>Tổng quan</span>
            </Link>
          </li>
          <li className={`${styles.navItem} ${active === "books" ? styles.active : ""}`} onClick={() => setActive("books")}>
            <Link className={styles.navLink} to="/admin/book">
              <span>Quản lý sách</span>
            </Link>
            <div className={styles.subnav}>
              <div className={styles.navItem}>
                <Link className={styles.navLink} to="/admin/book/add">
                  Thêm sách mới
                </Link>
              </div>
            </div>
          </li>
          <li className={`${styles.navItem} ${active === "authors" ? styles.active : ""}`}  onClick={() => setActive("authors")}>
            <Link className={styles.navLink} to="/admin/author">
              <span>Quản lý tác giả</span>
            </Link>
            <div className={styles.subnav}>
              <div className={styles.navItem}>
                <Link className={styles.navLink} to="/admin/author/add">
                  Thêm tác giả mới
                </Link>
              </div>
            </div>
          </li>
          <li className={`${styles.navItem} ${active === "orders" ? styles.active : ""}`}  onClick={() => setActive("orders")}>
            <Link className={styles.navLink} to="/admin/order">
              <span>Quản lý đơn hàng</span>
            </Link>
          </li>
          <li className={`${styles.navItem} ${active === "vouchers" ? styles.active : ""}`} onClick={() => setActive("vouchers")}>
            <Link className={styles.navLink} to="/admin/voucher">
              <span>Mã giảm giá</span>
            </Link>
            <div className={styles.subnav}>
              <div className={styles.navItem}>
                <Link className={styles.navLink} to="/admin/voucher/add">
                  Thêm mã giảm giá
                </Link>
              </div>
            </div>
          </li>
           <li className={`${styles.navItem} ${active === "feedbacks" ? styles.active : ""}`}  onClick={() => setActive("feedbacks")}>
            <Link className={styles.navLink} to="/admin/feedback">
              <span>Quản lý phản hồi</span>
            </Link>
          </li>
          <li className={styles.navItem} onClick={handleLogout}>
            <p className={styles.navLink}>
              <span>Đăng xuất</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
