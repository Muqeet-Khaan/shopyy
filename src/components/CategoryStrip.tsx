import './CategoryStrip.css'

interface CategoryStripProps {
  onCategoryClick: () => void
}

export default function CategoryStrip({ onCategoryClick }: CategoryStripProps) {
  const categories = ['Kurta Sets', '2-Piece', '3-Piece', 'Unstitched', 'Lawn', 'Festive']

  return (
    <section className="category-strip">
      <div className="category-scroll">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-item"
            onClick={onCategoryClick}
          >
            <div className="category-circle">
              <span className="category-icon">👗</span>
            </div>
            <span className="category-name">{category}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
