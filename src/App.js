import { Routes, Route } from "react-router-dom";
import Header from './components/Header'
import Footer from "./components/Footer";
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gio-hang" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
