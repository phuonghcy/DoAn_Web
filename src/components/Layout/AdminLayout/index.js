import { Outlet } from "react-router-dom";
import AdminSideBar from "../../AdminSideBar";
import styles from "./AdminLayout.module.css"
function AdminLayout() {
  return (
    <>
      <h1>Trang admin</h1>
      <AdminSideBar />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
