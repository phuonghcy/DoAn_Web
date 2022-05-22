import { FaRegUser } from "react-icons/fa"
import './AccountSideBar.css'

function AccountSideBar({onChangeContent, currentContent}) {
    const handleChangeToProfile = () => {
        onChangeContent("profile")
    }
    const handleChangeToAddress = () => {
        onChangeContent("address")
    }
    return (
        <div className="accountSideBar">
            <p className="sideBarTitle"><FaRegUser /> Tài khoản của tôi</p>
            <ul className="navList">
                <li className={`navItem ${currentContent === "profile" ? 'active': ''}`} 
                    onClick={handleChangeToProfile}
                >
                    <p className="navLink">Hồ sơ của tôi</p>
                </li>
                <li className={`navItem ${currentContent === "address" ? 'active': ''}`} 
                    onClick={handleChangeToAddress}
                >
                    <p className="navLink">Địa chỉ</p>
                </li>
            </ul>
        </div>
    )
}

export default AccountSideBar