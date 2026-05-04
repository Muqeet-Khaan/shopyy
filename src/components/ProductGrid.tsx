import { useState } from 'react'
import './ProductGrid.css'
import ProductCard from './ProductCard'

interface ProductGridProps {
  onAddToCart: () => void
  onWishlistChange: () => void
}

export default function ProductGrid({ onAddToCart, onWishlistChange }: ProductGridProps) {
  const [priceRange, setPriceRange] = useState([1500, 25000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('newest')

  const categories = ['Kurta Sets', '2-Piece', '3-Piece', 'Unstitched', 'Lawn']
  const fabrics = ['Lawn', 'Chiffon', 'Silk', 'Cotton', 'Karandi']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const colors = ['#1B4332', '#C9A84C', '#8A8A8A', '#2D2D2D', '#E8D4B8']

  const products: any[] = [] // Empty grid - products added later

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleFabricToggle = (fabric: string) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric)
        ? prev.filter(f => f !== fabric)
        : [...prev, fabric]
    )
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const resetFilters = () => {
    setPriceRange([1500, 25000])
    setSelectedCategories([])
    setSelectedFabrics([])
    setSelectedSizes([])
    setSortBy('newest')
  }

  return (
    <div className="product-grid-page">
      <div className="container">
        <div className="grid-header">
          <h1 className="page-title">Discover Our Collection</h1>
          <p className="product-count">Showing {products.length} products</p>
        </div>

        <div className="grid-layout">
          {/* Filters Sidebar */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              <button className="reset-filters" onClick={resetFilters}>
                Reset All
              </button>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4 className="filter-title">Price Range</h4>
              <div className="price-inputs">
                <input
                  type="number"
                  min="1500"
                  max="25000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="price-input"
                  placeholder="Min"
                />
                <span>to</span>
                <input
                  type="number"
                  min="1500"
                  max="25000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="price-input"
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="1500"
                max="25000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="price-slider"
              />
              <div className="price-display">
                Rs. {priceRange[0].toLocaleString()} — Rs. {priceRange[1].toLocaleString()}
              </div>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4 className="filter-title">Category</h4>
              <div className="checkbox-list">
                {categories.map((cat) => (
                  <label key={cat} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="filter-group">
              <h4 className="filter-title">Colors</h4>
              <div className="color-swatches">
                {colors.map((color) => (
                  <button
                    key={color}
                    className="color-swatch"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></button>
                ))}
              </div>
            </div>

            {/* Fabric */}
            <div className="filter-group">
              <h4 className="filter-title">Fabric</h4>
              <div className="checkbox-list">
                {fabrics.map((fabric) => (
                  <label key={fabric} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => handleFabricToggle(fabric)}
                    />
                    <span>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="filter-group">
              <h4 className="filter-title">Size</h4>
              <div className="size-pills">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-pill ${selectedSizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => handleSizeToggle(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <section className="products-section">
            <div className="products-top">
              <div className="sort-dropdown">
                <label>Sort by:</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    onAddToCart={onAddToCart}
                    onWishlistChange={onWishlistChange}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <p className="empty-message">No products yet. Check back soon!</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Mobile Filter Drawer (Hidden by default) */}
      <div className="mobile-filter-drawer hidden">
        <div className="filter-drawer-content">
          <button className="close-drawer">✕</button>
          <div className="filter-group">
            <h4 className="filter-title">Price Range</h4>
            <div className="price-inputs">
              <input
                type="number"
                min="1500"
                max="25000"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="price-input"
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                min="1500"
                max="25000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="price-input"
                placeholder="Max"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
