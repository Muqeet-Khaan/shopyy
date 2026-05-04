import { useState } from 'react'
import './Checkout.css'

interface CheckoutProps {
  onBack: () => void
}

export default function Checkout({ onBack }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    province: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('cod')

  const provinces = ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Gilgit-Baltistan']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.province) {
      alert('Please fill in all fields')
      return
    }
    alert('Order placed successfully!')
    localStorage.removeItem('cart')
  }

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]')
  const subtotal = cartItems.reduce((total: number, item: any) => total + (item.price || 5999), 0)

  return (
    <div className="checkout-page">
      <div className="container">
        <button className="back-btn" onClick={onBack}>
          ← Back to Cart
        </button>

        <h1 className="page-title">Checkout</h1>

        <div className="checkout-layout">
          {/* Billing Form */}
          <section className="billing-section">
            <h2 className="section-title">Delivery Information</h2>

            <form className="billing-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="03XX-XXXXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter your address"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="e.g. Karachi"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="province">Province *</label>
                  <select
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Province</option>
                    {provinces.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>

            {/* Payment Method */}
            <h2 className="section-title">Payment Method</h2>

            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-label">Cash on Delivery</span>
                  <span className="option-desc">Pay when your order arrives</span>
                </div>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="option-content">
                  <span className="option-label">Debit / Credit Card</span>
                  <span className="option-desc">Visa, Mastercard, Discover</span>
                </div>
              </label>
            </div>
          </section>

          {/* Order Summary Sidebar */}
          <aside className="order-summary-sidebar">
            <h2 className="summary-title">Order Summary</h2>

            <div className="order-items">
              {cartItems.length > 0 ? (
                cartItems.map((item: any, index: number) => (
                  <div key={index} className="order-item">
                    <div className="order-item-image">
                      <img
                        src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=80&h=80&fit=crop"
                        alt={item.name}
                      />
                    </div>
                    <div className="order-item-details">
                      <h4>Product Item {index + 1}</h4>
                      <p>Qty: {item.quantity || 1}</p>
                    </div>
                    <span className="order-item-price">Rs. {(item.price || 5999).toLocaleString()}</span>
                  </div>
                ))
              ) : (
                <p className="empty-message">No items in cart</p>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-line">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="summary-line">
              <span>Shipping</span>
              <span className="free-shipping">FREE</span>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span className="total-amount">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <button
              className="btn-primary place-order-btn"
              onClick={handlePlaceOrder}
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>

            <p className="secure-note">
              🔒 Your information is secure and encrypted
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}
