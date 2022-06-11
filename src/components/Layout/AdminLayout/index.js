import { Outlet } from "react-router-dom";
import AdminSideBar from "../../AdminSideBar";
import styles from "./AdminLayout.module.css"
function AdminLayout() {
  return (
    <>
      <AdminSideBar />
      <div className={styles.contentWrapper}>
        <Outlet />
      </div>
    </>
  );
}

export default AdminLayout;
