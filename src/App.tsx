import { useState, useEffect } from 'react'
import './App.css'
import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CategoryStrip from './components/CategoryStrip'
import ProductGrid from './components/ProductGrid'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Wishlist from './components/Wishlist'


type PageType = 'home' | 'products' | 'cart' | 'checkout' | 'wishlist'

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setCartCount(cart.length)
    setWishlistCount(wishlist.length)
  }, [])

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartCount(cart.length)
  }

  const updateWishlistCount = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistCount(wishlist.length)
  }

  return (
    <div className="app">
      <AnnouncementBar />
      <Navbar 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {currentPage === 'home' && (
        <>
          <Hero onShopClick={() => handleNavigate('products')} />
          <CategoryStrip onCategoryClick={() => handleNavigate('products')} />
        </>
      )}

      {currentPage === 'products' && (
        <ProductGrid onAddToCart={updateCartCount} onWishlistChange={updateWishlistCount} />
      )}

      {currentPage === 'cart' && (
        <Cart onCheckout={() => handleNavigate('checkout')} onCartChange={updateCartCount} />
      )}

      {currentPage === 'checkout' && (
        <Checkout onBack={() => handleNavigate('cart')} />
      )}

      {currentPage === 'wishlist' && (
        <Wishlist onAddToCart={updateCartCount} onWishlistChange={updateWishlistCount} />
      )}

    
    </div>
  )
}

export default App
