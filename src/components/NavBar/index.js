import { Link } from 'react-router-dom';

import './NavBar.css';
function NavBar() {

    return (
        <div className="navbar">
            <div className="nav-item active">
                <Link to="/" >Trang chủ</Link>
            </div>
            <div className="nav-item">
                <Link to="/gio-hang">Cửa hàng</Link>
            </div>
            <div className="nav-item">
                <Link to="/">Liên hệ</Link>
            </div>
            <div className="nav-item">
                <Link to="/">Khuyễn mãi</Link>
            </div>
        </div>
    )

}

export default NavBar