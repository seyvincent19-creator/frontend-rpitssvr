import React from "react";
import "./ImageSlider.css"; // Custom styles for animation

const img_slider = [
  { id: 1, path: "/images/img-slide/1.jpg", title: "Welcome to Our Platform", desc: "Discover our amazing features and content" },
  { id: 2, path: "/images/img-slide/2.jpg", title: "Learn and Grow", desc: "Start your learning journey with us today" },
  { id: 3, path: "/images/img-slide/3.jpg", title: "Stay Connected", desc: "Follow us on social media for updates" },
];

const ImageSlider = () => {
  return (
    <div className="image-slider-container">
      <div
        id="mainCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        {/* Slides */}
        <div className="carousel-inner">
          {img_slider.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={slide.path}
                className="d-block w-100"
                alt={`Slide ${slide.id}`}
              />
              <div className="carousel-caption animate__animated animate__fadeInDown">
                <h2>{slide.title}</h2>
                <p>{slide.desc}</p>
                <a
                  href="/enroll"
                  className="btn btn-lg btn-warning mt-3 shadow"
                >
                  Enroll Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
