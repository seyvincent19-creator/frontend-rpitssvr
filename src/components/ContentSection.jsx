import React, { useEffect, useState } from "react";
import "./ContentSection.css";
import { Link } from "react-router-dom";
import { FaEye, FaShareAlt, FaFacebookF, FaTelegramPlane, FaNewspaper } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles";
const BASE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23e9ecef'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%236c757d'%3ENo Image%3C/text%3E%3C/svg%3E`;

const getImageUrl = (thumbnail) =>
  thumbnail ? BASE_URL + thumbnail : PLACEHOLDER;

const ShareDropdown = ({ item }) => (
  <div className="dropdown">
    <button
      className="btn btn-sm btn-outline-secondary dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
      data-bs-boundary="viewport"
      data-bs-strategy="fixed"
    >
      <FaShareAlt />
    </button>
    <ul className="dropdown-menu dropdown-menu-end" style={{ zIndex: 9999, position: "fixed" }}>
      <li>
        <a
          className="dropdown-item"
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}/article/${item?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaFacebookF className="me-2" />
          Facebook
        </a>
      </li>
      <li>
        <a
          className="dropdown-item"
          href={`https://t.me/share/url?url=${window.location.origin}/article/${item?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaTelegramPlane className="me-2" />
          Telegram
        </a>
      </li>
    </ul>
  </div>
);

const FeaturedCard = ({ item, t }) => (
  <div className="content-featured-card h-100">
    <Link to={`/article/${item.id}`} className="d-block featured-img-wrap">
      <img
        src={getImageUrl(item.thumbnail)}
        alt={item.title}
        className="featured-img"
        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
      />
      <span className="featured-badge">{t('news_featured')}</span>
    </Link>
    <div className="content-card-body">
      <Link to={`/article/${item.id}`} className="text-decoration-none">
        <h5 className="content-title featured-title">{item.title}</h5>
      </Link>
      <p className="content-excerpt">{item.excerpt}</p>
      <div className="content-footer">
        <span className="content-date">
          {new Date(item.created_at).toLocaleDateString("en-GB")}
        </span>
        <div className="d-flex align-items-center gap-2">
          <Link to={`/article/${item.id}`} className="btn btn-primary btn-sm rounded-pill px-3">
            {t('news_read_more')}
          </Link>
          <ShareDropdown item={item} />
        </div>
      </div>
    </div>
  </div>
);

const SmallCard = ({ item, t }) => (
  <div className="content-small-card">
    <Link to={`/article/${item.id}`} className="small-card-img-wrap">
      <img
        src={getImageUrl(item.thumbnail)}
        alt={item.title}
        className="small-card-img"
        onError={(e) => { e.target.onerror = null; e.target.src = PLACEHOLDER; }}
      />
    </Link>
    <div className="small-card-body">
      <Link to={`/article/${item.id}`} className="text-decoration-none">
        <h6 className="content-title small-title">{item.title}</h6>
      </Link>
      <div className="content-footer mt-auto">
        <span className="content-date">
          {new Date(item.created_at).toLocaleDateString("en-GB")}
        </span>
        <div className="d-flex align-items-center gap-2">
          <Link to={`/article/${item.id}`} className="btn btn-outline-primary btn-sm rounded-pill px-2" style={{ fontSize: "12px" }}>
            {t('news_read_more_short')}
          </Link>
          <ShareDropdown item={item} />
        </div>
      </div>
    </div>
  </div>
);

const ContentSection = () => {
  const { t } = useLanguage();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // handle both {data: [...]} and direct array responses
        const list = Array.isArray(data) ? data : (data.data || data.articles || []);
        const sorted = [...list].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setArticles(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("ContentSection fetch error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="content-section">
      <div className="content-section-header">
        <FaNewspaper className="me-2" />
        <span>{t('news_header')}</span>
      </div>
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">{t('news_loading')}</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="content-section">
      <div className="content-section-header">
        <FaNewspaper className="me-2" />
        <span>{t('news_header')}</span>
      </div>
      <div className="alert alert-warning py-3">{t('news_error')} ({error})</div>
    </div>
  );

  const featured = articles[0];
  const rest = articles.slice(1, 5);

  return (
    <div className="content-section">
      <div className="content-section-header">
        <FaNewspaper className="me-2" />
        <span>{t('news_header')}</span>
      </div>

      {articles.length === 0 ? (
        <div className="alert alert-info py-3">{t('news_empty')}</div>
      ) : (
        <div className="row g-3">
          <div className="col-lg-6">
            {featured ? <FeaturedCard item={featured} t={t} /> : null}
          </div>
          <div className="col-lg-6 d-flex flex-column gap-2">
            {rest.map((item) => (
              <SmallCard key={item.id ?? item.article_id} item={item} t={t} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
