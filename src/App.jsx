import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import ScrollToTop from './components/ScrollToTop'
import RequireAuth from './components/RequireAuth'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Track from './pages/Track'
import Wishlist from './pages/Wishlist'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import SkinQuiz from './pages/SkinQuiz'
import Contact from './pages/Contact'
import Info from './pages/Info'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
          <Route path="/track" element={<Track />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<RequireAuth><Account /></RequireAuth>} />
          <Route path="/skin-quiz" element={<SkinQuiz />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about-us" element={<Info page="about" />} />
          <Route path="/faq" element={<Info page="faq" />} />
          <Route path="/shipping-and-delivery" element={<Info page="shipping" />} />
          <Route path="/return-and-refund" element={<Info page="returns" />} />
          <Route path="/terms-and-conditions" element={<Info page="terms" />} />
          <Route path="/privacy-policy" element={<Info page="privacy" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BottomNav />
    </>
  )
}
