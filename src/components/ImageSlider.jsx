import React from "react";
import { Link } from "react-router-dom";
import "./ImageSlider.css";

const slides = [
  {
    id: 1,
    path: "/images/img-slide/1.jpg",
    tag: "ការអប់រំបច្ចេកទេស",
    title: "បង្កើតអនាគតរបស់អ្នក",
    titleEn: "Build Your Future With Us",
    desc: "វិទ្យាស្ថានពហុបច្ចេកទេសភូមិភាគតេជោសែនស្វាយរៀង ផ្តល់ការបណ្តុះបណ្តាលវិជ្ជាជីវៈគុណភាពខ្ពស់",
  },
  {
    id: 2,
    path: "/images/img-slide/2.jpg",
    tag: "អាហារូបករណ៍ ១០០%",
    title: "ឱកាសសម្រាប់គ្រប់គ្នា",
    titleEn: "Opportunities For Everyone",
    desc: "ទទួលបានអាហារូបករណ៍ពេញលេញ និងប្រាក់ឧបត្ថម្ភ ២៨ម៉ឺនរៀល/ខែ សម្រាប់គ្រួសារក្រីក្រ",
  },
  {
    id: 3,
    path: "/images/img-slide/3.jpg",
    tag: "ចូលរួមផ្នែកវិស្វកម្ម",
    title: "ជំនាញដែលពិភពលោកត្រូវការ",
    titleEn: "Skills The World Needs",
    desc: "ស្វែងយល់ពីការបណ្តុះបណ្តាលផ្នែកបច្ចេកវិទ្យា ថាមពល និងសំណង់ ៖ ១០ ជំនាញឯកទេស",
  },
];

const ImageSlider = () => (
  <div className="hero-slider">
    <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">
      <div className="carousel-inner">
        {slides.map((s, i) => (
          <div key={s.id} className={`carousel-item ${i === 0 ? "active" : ""}`}>
            <img src={s.path} className="hero-slide-img" alt={s.titleEn} />
            <div className="hero-overlay" />
            <div className="hero-caption">
              <span className="hero-tag">{s.tag}</span>
              <h1 className="hero-title-kh">{s.title}</h1>
              <p className="hero-title-en">{s.titleEn}</p>
              <p className="hero-desc">{s.desc}</p>
              <div className="hero-btns">
                <Link to="/enrollment" className="hero-btn-primary">ចុះឈ្មោះឥឡូវ</Link>
                <Link to="/aboutus" className="hero-btn-secondary">ស្វែងយល់បន្ថែម</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Indicators */}
      <div className="hero-indicators">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <button className="hero-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
        <span>&#8249;</span>
      </button>
      <button className="hero-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
        <span>&#8250;</span>
      </button>
    </div>
  </div>
);

export default ImageSlider;
