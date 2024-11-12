import React, { useState, useEffect } from 'react';
import './MainContent.css';

const MainContent = ({ images, loading, selectedCategory, onCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://www.larisarealtech.com/wp-content/uploads/2024/03/3-2.webp',
      alt: 'Flower Arch Decor'
    },
    {
      image: 'https://img.staticmb.com/mbcontent/images/uploads/2023/8/Heaven_4.jpg',
      alt: 'Floral Centerpiece'
    },
    {
      image: 'https://nimasonti.com/wp-content/uploads/2020/08/img_2227-2.jpg?w=1024',
      alt: 'Elegant Table Setup'
    }
  ];

  const occasions = [
    { name: 'Birthday', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSJ7NrJI4MgpPqtgd989J4nii2oqg61LzhfU97DqvqW7B_vX3wWwT2lTy0TUT51G3ur0&usqp=CAU' },
    { name: 'Anniversary', image: 'https://haplun.in/uploads/product_images/medium/1680766442_6155996551.webp' },
    { name: 'Wedding', image: 'https://cdn0.weddingwire.in/article/5480/original/1280/jpg/100845-wedding-stage-3.jpeg' },
    { name: 'Engagement', image: 'https://img.clevup.in/337348/1705926102368_SKU-1040_0.jpg?width=600&format=webp' },
    { name: 'Baby Shower', image: 'https://takerentpe.com/media/images/products/2024/01/Untitled_design_1_PdSY3x91.webp' },
    { name: 'Festivals', image: 'https://media.designcafe.com/wp-content/uploads/2020/09/21140648/festival-decoration-ideas-at-home.jpg' }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
  };

  const resetCategory = () => {
    onCategorySelect(null);
  };

  return (
    <main>
      {!selectedCategory && (
        <section className="hero">
          <div className="slideshow-container">
            {slides.map((slide, index) => (
              <div
                className={`mySlides ${index === currentSlide ? 'active' : ''}`}
                key={index}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <img src={slide.image} alt={slide.alt} className="slide-image" />
              </div>
            ))}
            <a className="prev" onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}>
              &#10094;
            </a>
            <a className="next" onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}>
              &#10095;
            </a>
          </div>
        </section>
      )}
      <section className="decoration-by-occasion">
        <h2>{selectedCategory ? `Images for ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Decoration By Occasions'}</h2>
        {loading && <p>Loading...</p>}
        {!selectedCategory && (
          <div className="occasion-items">
            {occasions.map((occasion) => (
              <div
                className="occasion-item"
                key={occasion.name}
                onClick={() => handleCategorySelect(occasion.name.toLowerCase().replace(' ', '_'))}
              >
                <img src={occasion.image} alt={occasion.name} />
                <p>{occasion.name}</p>
              </div>
            ))}
          </div>
        )}
        {selectedCategory && (
          <div className="occasion-items">
            {!loading && images.length > 0 ? (
              images.map((image) => (
                <div className="occasion-item" key={image.id}>
                  <img src={image.src.medium} alt={image.alt} />
                  <p>{image.alt}</p>
                </div>
              ))
            ) : (
              !loading && <p>No images available for this category or search.</p>
            )}
            <button className="reset-button" onClick={resetCategory}>Back to Occasions</button>
          </div>
        )}
      </section>
    </main>
  );
};

export default MainContent;
