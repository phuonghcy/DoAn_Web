import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ContactPage from "./pages/ContactPage";
import DiscountPage from "./pages/DiscountPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gio-hang" element={<CartPage />} />
        <Route path="/lien-he" element={<ContactPage />} /> 
        <Route path="/khuyen-mai" element={<DiscountPage />} />
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ki" element={<RegisterPage />} />
        <Route path="/san-pham" element={<ProductPage />} />
      </Routes> 
      <Footer />
    </div>
  );
}

export default App;
