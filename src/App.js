import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ContactPage from "./pages/ContactPage";
import DiscountPage from "./pages/DiscountPage";
import LoginPage from "./pages/LoginPage";
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
