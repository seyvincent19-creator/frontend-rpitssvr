import React, { useEffect, useState } from "react";
import "./ContentSection.css";
import { Link } from "react-router-dom";
import {
  FaEye,
  FaShareAlt,
  FaFacebookF,
  FaTelegramPlane,
} from "react-icons/fa";
import { BiFontFamily } from "react-icons/bi";

const API_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles";
// BASE_URL is no longer needed for images since the API provides full URLs.
// const BASE_URL = "http://rpi-news-dashboard.test"; 

// Reusable ShareDropdown component
const ShareDropdown = () => (
  <div className="dropdown" style={{ position: "relative" }}>
    <button
      className="btn btn-sm btn-outline-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      <FaShareAlt />
    </button>
    <ul className="dropdown-menu dropdown-menu-end">
      <li>
        <a className="dropdown-item" href="#">
          <FaFacebookF className="me-2" />
          Facebook
        </a>
      </li>
      <li>
        <a className="dropdown-item" href="#">
          <FaTelegramPlane className="me-2" />
          Telegram
        </a>
      </li>
    </ul>
  </div>
);


const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='100' viewBox='0 0 150 100'%3E%3Crect width='150' height='100' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='12' fill='%236c757d'%3ENo Image%3C/text%3E%3C/svg%3E`;

const SmallContentCard = ({ item }) => {
  const BASE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
  const imageUrl = item.thumbnail
  ? BASE_URL + item.thumbnail
  : PLACEHOLDER;

  //console.log("Image URL:", imageUrl);
  return (
    <div className="card mb-2 shadow-sm" data-aos="fade-left">
      <div className="row g-0">
        <div className="col-md-4">
          <Link to={`/article/${item.id}`} className="d-block h-100">
            <img
              src={imageUrl}
              className="img-fluid rounded-start"
              alt={item.title}
              style={{ height: "100%", objectFit: "cover" }}
              onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
            />
  

          </Link>
        </div>
        <div className="col-md-8 position-relative">
          <div className="card-body p-2 d-flex flex-column justify-content-between h-100">
            <div>
              <Link
                to={`/article/${item.id}`}
                className="text-decoration-none text-dark"
              >
                <h6
                  className="card-title mb-1 article-title"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    color: "blue",
                    fontSize: "14px",
                    lineHeight: "1.8",
                  }}
                  title={item.title}
                >
                  {item.title}
                </h6>
              </Link>
              <p className="text-muted small mb-1">
                {new Date(item.created_at).toLocaleDateString("en-GB")}
              </p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
              <span className="text-muted small d-flex align-items-center gap-1">
                <FaEye />
                {/* {item.views_count.toLocaleString()} */}
              </span>
              <Link
                to={`/article/${item.id}`}
                className="btn btn-link p-0 text-nowrap small"
              >
                Read More →
              </Link>
              <ShareDropdown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added basic error state

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.data || []); 
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
        setError(error.message); // Set the error message
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;


  const featuredArticle = articles[0];
  const smallerArticles = articles.slice(1, 5); // Display next 4 as smaller cards

  return (
    <div className="container py-3">
      <div className="row gx-4">
        <div className="col-lg-12">
          <div className="row h-100">
            <div className="col-lg-6 mb-3 mb-lg-0">
              {featuredArticle ? (
                <FeaturedContentCard item={featuredArticle} />
              ) : (
                <div className="text-center p-5">No featured content available.</div>
              )}
            </div>
            <div className="col-lg-6 d-flex flex-column gap-3">
              {smallerArticles.map((item) => (
                <SmallContentCard key={item.article_id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedContentCard = ({ item }) => {
  // --- CORRECTED LOGIC ---
  // Use the 'featured_image_url' from your API data.
  const BASE_URL1 = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
  const imageUrl1 = item.thumbnail
    ? BASE_URL1 + item.thumbnail
    : PLACEHOLDER;
  console.log("Featured Image URL:", imageUrl1);
  return (
    <div className="card shadow-sm h-100" data-aos="fade-right">
      <Link to={`/article/${item.id}`} className="d-block">
        <img
          src={imageUrl1}
          className="card-img-top"
          alt={item.title}
          style={{ maxHeight: "220px", objectFit: "cover" }}
          onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
        />
        {/* //<img src="https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/thumbnails/nZcTvGTTzeUGKTLbOSMEdf7TrpFgvJSpQeOvzcza.jpg" alt="" /> */}
      </Link>
      <div className="card-body d-flex flex-column">
        <Link
          to={`/article/${item.id}`}
          className="text-decoration-none text-dark"
        >
          <h5 className="card-title mb-2 article-title">{item.title}</h5>
        </Link>
        <p className="card-text small mb-2">{item.excerpt}</p>
        <p className="text-muted small mb-2">
          {new Date(item.created_at).toLocaleDateString("en-GB")}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto gap-2 flex-wrap">
          <span className="text-muted small d-flex align-items-center gap-1 mb-1">
            <FaEye />
            {/* {item.views_count.toLocaleString()} */}
          </span>
          <Link
            to={`/article/${item.id}`}
            className="btn btn-link p-0 text-nowrap small mb-1"
          >
            Read More →
          </Link>
          <ShareDropdown />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;