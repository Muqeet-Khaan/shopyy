import { useState, useEffect } from 'react'
import './Cart.css'

interface CartProps {
  onCheckout: () => void
  onCartChange: () => void
}

export default function Cart({ onCheckout, onCartChange }: CartProps) {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [promoCode, setPromoCode] = useState('')

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
  }

  const removeItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index)
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    onCartChange()
  }

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return
    const updatedCart = [...cartItems]
    updatedCart[index].quantity = quantity
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const subtotal = calculateSubtotal()
  const discount = 0
  const total = subtotal - discount

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <section className="cart-items-section">
            {cartItems.length > 0 ? (
              <div className="items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div className="item-image">
                      <img
                        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=150&h=150&fit=crop"
                        alt={item.name}
                      />
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">Product Item {index + 1}</h3>
                      <div className="item-meta">
                        <span className="meta-item">Color: Navy</span>
                        <span className="meta-item">Size: {item.size || 'M'}</span>
                      </div>
                      <p className="item-price">Rs. {item.price?.toLocaleString() || '5,999'}</p>
                    </div>
                    <div className="item-quantity">
                      <button onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>−</button>
                      <input
                        type="number"
                        value={item.quantity || 1}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                        min="1"
                      />
                      <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                    </div>
                    <div className="item-total">
                      Rs. {((item.price || 5999) * (item.quantity || 1)).toLocaleString()}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(index)}
                      title="Remove item"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-cart">
                <p className="empty-message">Your cart is empty</p>
                <p className="empty-subtext">Start shopping to add items</p>
              </div>
            )}
          </section>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            {discount > 0 && (
              <div className="summary-line discount">
                <span>Discount</span>
                <span>-Rs. {discount.toLocaleString()}</span>
              </div>
            )}

            <div className="promo-section">
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="promo-input"
              />
              <button className="btn-secondary">Apply</button>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">Rs. {total.toLocaleString()}</span>
            </div>

            <button
              className="btn-primary checkout-btn"
              onClick={onCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>

            <p className="security-note">
              ✓ Secure checkout powered by industry standards
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
