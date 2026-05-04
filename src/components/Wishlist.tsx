import { useState, useEffect } from 'react'
import './Wishlist.css'
import ProductCard from './ProductCard'

interface WishlistProps {
  onAddToCart: () => void
  onWishlistChange: () => void
}

export default function Wishlist({ onAddToCart, onWishlistChange }: WishlistProps) {
  const [wishlistItems, setWishlistItems] = useState<any[]>([])

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]')
    setWishlistItems(wishlist)
  }

  const moveToCart = (index: number) => {
    const item = wishlistItems[index]
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.push(item)
    localStorage.setItem('cart', JSON.stringify(cart))
    
    // Remove from wishlist
    removeFromWishlist(index)
    onAddToCart()
    
    // Show toast
    const toast = document.createElement('div')
    toast.className = 'toast-notification'
    toast.textContent = 'Moved to cart ✓'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  const removeFromWishlist = (index: number) => {
    const updatedWishlist = wishlistItems.filter((_, i) => i !== index)
    setWishlistItems(updatedWishlist)
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist))
    onWishlistChange()
  }

  return (
    <div className="wishlist-page">
      <div className="container">
        <h1 className="page-title">My Wishlist</h1>
        <p className="wishlist-count">
          {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved
        </p>

        {wishlistItems.length > 0 ? (
          <div className="wishlist-grid">
            {wishlistItems.map((item, index) => (
              <div key={index} className="wishlist-item-wrapper">
                <ProductCard
                  product={item}
                  onAddToCart={onAddToCart}
                  onWishlistChange={onWishlistChange}
                />
                <button
                  className="move-to-cart-btn"
                  onClick={() => moveToCart(index)}
                >
                  Move to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <div className="empty-icon">♡</div>
            <h2>Your wishlist is empty</h2>
            <p>Start adding items to save your favorites</p>
          </div>
        )}
      </div>
    </div>
  )
}
