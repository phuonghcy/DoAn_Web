import { Routes, Route } from "react-router-dom";
// import Header from './components/Header'
// import Footer from "./components/Footer";
import DefaultLayout from "./components/Layout/DefaultLayout"
import AdminLayout from "./components/Layout/AdminLayout"
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ContactPage from "./pages/ContactPage";
import DiscountPage from "./pages/DiscountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import LikePage from "./pages/LikePage";
import AccountPage from "./pages/AccountPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage"
import ResetPasswordPage from "./pages/ResetPasswordPage";
import PaymentPage from "./pages/PaymentPage";
import GenreDetailPage from "./pages/GenreDetailPage";
import SearchPage from "./pages/SearchPage";

import ProtectedRoute from "./components/ProtectedRoute";
import FormAddBook from "./components/FormAddBook"
import FormUpdateBook from "./components/FormUpdateBook"
import FormAddAuthor from "./components/FormAddAuthor"
import FormUpdateAuthor from "./components/FormUpdateAuthor"
import WelcomeAdmin from "./components/WelcomeAdmin"
import BookList from "./components/BookList"
import AuthorList from "./components/AuthorList"
import OrderList from "./components/OrderList";
import AccessDenied from "./pages/AccessDenied"

import './App.css';
import { useDispatch, useSelector } from "react-redux";
import userApi from "./api/userApi";
import { login, logout } from "./redux/actions/user";
import { useEffect } from "react";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser)
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userApi.getCurrentUser()
        const { email, fullName, phoneNumber, avatar, _id, role } = data?.user
        dispatch(login({email, fullName, phoneNumber, avatar, userId: _id, role}))
      } catch (error) {
        if (error.response.status === 403 || error.response.status === 401) {
          dispatch(logout())
        }
      }
    }
    const token = localStorage.getItem('accessToken')
    if (token && !currentUser.userId) {
      fetchData()
    }
  },[dispatch, currentUser])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/gio-hang" element={<CartPage />} />
          <Route path="/lien-he" element={<ContactPage />} /> 
          <Route path="/khuyen-mai" element={<DiscountPage />} />
          <Route path="/dang-nhap" element={<LoginPage />} />
          <Route path="/quen-mat-khau" element={<ForgotPasswordPage />} />
          <Route path="/dat-lai-mat-khau/:code" element={<ResetPasswordPage />} />
          <Route path="/dang-ki" element={<RegisterPage />} />
          <Route path="/san-pham" element={<ProductPage />} />
          <Route path="/chi-tiet-san-pham/:slug" element={<ProductDetailPage />} />
          <Route path="/yeu-thich" element={<LikePage />} />
          <Route path="/tai-khoan" element={<AccountPage />} />
          <Route path="/thanh-toan" element={<PaymentPage />} />
          <Route path="/san-pham/the-loai/:genre" element={<GenreDetailPage/>} />
          <Route path="/tim-kiem" element={<SearchPage />} />
        </Route>

        {currentUser && currentUser.role && (
          <Route path="/admin" element={<ProtectedRoute role={currentUser.role} />}>
            <Route element={<AdminLayout />}>
              <Route path="" element={<WelcomeAdmin />} />
              <Route path="book" element={<BookList />} />
              <Route path="book/add" element={<FormAddBook />} />
              <Route path="book/update/:id" element={<FormUpdateBook />} />

              <Route path="author" element={<AuthorList />} />
              <Route path="author/add" element={<FormAddAuthor />} />
              <Route path="author/update/:id" element={<FormUpdateAuthor />} />


              <Route path="order" element={<OrderList />} />

            </Route>
          </Route>
        )}

        {!currentUser.role && (
          <Route path="/admin/*" element={<AccessDenied />} />
        )}

      </Routes> 
    </div>
  );
}

export default App;
