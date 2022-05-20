import { Link } from 'react-router-dom';

import styles from './NavBar.module.css';
function NavBar() {

    return (
        <div className={`navbar ${styles.navbar}`}>
            <div className={`${styles.navItem} ${styles.active}`}>
                <Link to="/" >Trang chủ</Link>
            </div>
            <div className={styles.navItem}>
                <Link to="/san-pham">Sản phẩm</Link>
            </div>
            <div className={styles.navItem}>
                <Link to="/lien-he">Liên hệ</Link>
            </div>
            <div className={styles.navItem}>
                <Link to="/khuyen-mai">Khuyến mãi</Link>
            </div>
        </div>
    )

}

export default NavBar