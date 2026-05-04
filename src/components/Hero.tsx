import { useState, useEffect } from 'react'
import './Hero.css'

interface HeroProps {
  onShopClick: () => void
}

export default function Hero({ onShopClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&h=600&fit=crop',
      headline: 'Draped in Tradition. Styled for Today.',
      subtext: 'Explore our Festive Collection — handcrafted Pakistani suits'
    },
    {
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&h=600&fit=crop',
      headline: 'Elegance Meets Heritage',
      subtext: 'Discover timeless designs crafted with passion'
    },
    {
      image: 'https://images.unsplash.com/photo-1570303995221-0b94e46c6c45?w=1200&h=600&fit=crop',
      headline: 'Celebrate Every Moment',
      subtext: 'Premium fabrics for your special occasions'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="hero-section">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="slide-overlay"></div>
            <div className="slide-content">
              <h1 className="slide-headline">{slide.headline}</h1>
              <p className="slide-subtext">{slide.subtext}</p>
              <div className="slide-buttons">
                <button className="btn-primary" onClick={onShopClick}>
                  Shop Now
                </button>
                <button className="btn-secondary">
                  View Lookbook
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button className="carousel-arrow prev-arrow" onClick={prevSlide} aria-label="Previous slide">
          ❮
        </button>
        <button className="carousel-arrow next-arrow" onClick={nextSlide} aria-label="Next slide">
          ❯
        </button>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  )
}
