import { Link } from "react-router-dom";
import styles from "./AdminSideBar.module.css";

function AdminSideBar() {
  return (
    <div className={styles.adminSideBar}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="https://adminlte.io/themes/v3/dist/img/AdminLTELogo.png"
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
        </ul>
      </div>
    </div>
  );
}

export default AdminSideBar;
