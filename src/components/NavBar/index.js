import { Link } from 'react-router-dom';

import './NavBar.css';
function NavBar() {

    return (
        <div className="navbar">
            <div className="nav-item active">
                <Link to="/" >Trang chủ</Link>
            </div>
            <div className="nav-item">
                <Link to="/san-pham">Sản phẩm</Link>
            </div>
            <div className="nav-item">
                <Link to="/lien-he">Liên hệ</Link>
            </div>
            <div className="nav-item">
                <Link to="/khuyen-mai">Khuyến mãi</Link>
            </div>
        </div>
    )

}

export default NavBar