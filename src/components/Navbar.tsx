import { useState, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  currentPage: string
  onNavigate: (page: any) => void
  cartCount: number
  wishlistCount: number
}

export default function Navbar({ currentPage, onNavigate, cartCount, wishlistCount }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = ['New Arrivals', 'Collections', 'Unstitched', 'Ready To Wear', 'Sale', 'About']

  const handleNavClick = (item: string) => {
    if (item === 'New Arrivals' || item === 'Collections' || item === 'Unstitched' || item === 'Ready To Wear' || item === 'Sale') {
      onNavigate('products')
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar ${isSticky ? 'sticky' : ''}`}>
        <div className="container navbar-content">
          {/* Left: Logo & Brand */}
          <div className="navbar-brand" onClick={() => onNavigate('home')}>
            <div className="brand-icon">✦</div>
            <span className="brand-name">[YOUR BRAND]</span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <div className="navbar-menu desktop-menu">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item)
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: Icons */}
          <div className="navbar-icons">
            <button className="icon-btn search-btn" title="Search">
              🔍
            </button>
            <button 
              className="icon-btn wishlist-btn"
              onClick={() => onNavigate('wishlist')}
              title="Wishlist"
            >
              ♡
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            <button 
              className="icon-btn cart-btn"
              onClick={() => onNavigate('cart')}
              title="Cart"
            >
              🛍️
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </button>

            {/* Mobile Hamburger */}
            <button 
              className="hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              title="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="mobile-menu-link"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(item)
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="#"
            className="mobile-menu-link"
            onClick={(e) => {
              e.preventDefault()
              onNavigate('home')
              setIsMobileMenuOpen(false)
            }}
          >
            Home
          </a>
        </div>
      )}

      {/* Bottom Cart Bar (Mobile) */}
      <div className="mobile-cart-bar">
        <button 
          className="mobile-cart-btn"
          onClick={() => onNavigate('cart')}
        >
          View Cart ({cartCount})
        </button>
      </div>
    </>
  )
}
