import { useState } from 'react'
import './ProductCard.css'

interface ProductCardProps {
  product: any
  onAddToCart: () => void
  onWishlistChange: () => void
}

export default function ProductCard({ product, onAddToCart, onWishlistChange }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const mockImages = [
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=500&fit=crop',
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop'
  ]

  const mockColors = ['#1B4332', '#C9A84C', '#8A8A8A']
  const mockSizes = ['S', 'M', 'L', 'XL']

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => (prev - 1 + mockImages.length) % mockImages.length)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentImageIndex((prev) => (prev + 1) % mockImages.length)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    onWishlistChange()
  }

  const handleAddToCart = () => {
    onAddToCart()
    // Show toast notification
    const toast = document.createElement('div')
    toast.className = 'toast-notification'
    toast.textContent = 'Added to cart ✓'
    document.body.appendChild(toast)
    setTimeout(() => toast.remove(), 3000)
  }

  return (
    <div className="product-card">
      {/* Image Container */}
      <div className="product-image-wrapper">
        <div className="product-image" style={{ backgroundImage: `url(${mockImages[currentImageIndex]})` }}>
          {/* Badge */}
          <div className="product-badge">New</div>

          {/* Image Controls */}
          <button className="image-arrow prev-arrow" onClick={handlePrevImage} aria-label="Previous image">
            ❮
          </button>
          <button className="image-arrow next-arrow" onClick={handleNextImage} aria-label="Next image">
            ❯
          </button>

          {/* Wishlist Button (Hover) */}
          <button 
            className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
            onClick={handleWishlist}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            ♡
          </button>

          {/* Quick View Button (Hover) */}
          <button className="quick-view-btn">Quick View</button>
        </div>

        {/* Image Indicators */}
        <div className="image-indicators">
          {mockImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
              aria-label={`View image ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">Product Name</h3>
        <p className="product-description">Premium handcrafted design</p>

        {/* Color Swatches */}
        <div className="color-swatches">
          {mockColors.map((color, index) => (
            <button
              key={index}
              className="color-dot"
              style={{ backgroundColor: color }}
              title={color}
            ></button>
          ))}
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="price">Rs. 5,999</span>
          <span className="original-price">Rs. 7,999</span>
        </div>

        {/* Sizes */}
        <div className="size-options">
          {mockSizes.map((size) => (
            <button key={size} className="size-option">
              {size}
            </button>
          ))}
        </div>

        {/* Add to Cart Button */}
        <button className="btn-primary add-to-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>

        {/* Rating */}
        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="rating-count">(128 reviews)</span>
        </div>
      </div>
    </div>
  )
}
