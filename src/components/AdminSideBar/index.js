import { Link } from "react-router-dom";
import styles from "./AdminSideBar.module.css";
import logo from '../../assets/images/logo.png'

function AdminSideBar() {
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
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/admin">
              <span>Tổng quan</span>
            </Link>
          </li>
          <li className={styles.navItem}>
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
          <li className={styles.navItem}>
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
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/admin/order">
              <span>Quản lý đơn hàng</span>
            </Link>
          </li>
          <li className={styles.navItem}>
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
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
