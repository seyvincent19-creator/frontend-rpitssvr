import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./ArticleDetail.css"; // Import your CSS for styling

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [allArticles, setAllArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(
          `https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles/${id}`
        );
        setArticle(response.data); // API returns article directly
      } catch (error) {
        console.error("Failed to fetch article:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllArticles = async () => {
      try {
        const response = await axios.get(
          "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles"
        );
        setAllArticles(response.data.data); // Assuming all articles are inside `data`
      } catch (error) {
        console.error("Failed to fetch all articles:", error);
      }
    };

    fetchArticle();
    fetchAllArticles();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container py-5 text-center">
        <h2>Article Not Found</h2>
        <p>The article you are looking for does not exist.</p>
        <Link to="/" className="btn btn-primary">
          <FaArrowLeft className="me-2" /> Back to Home
        </Link>
      </div>
    );
  }

  const relatedArticles = allArticles
    .filter((item) => item.id !== parseInt(id))
    .slice(0, 3);

  const recentPosts = allArticles
    .filter((item) => item.id !== parseInt(id))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 4);

  const articleCategories = [
    "Technology",
    "Education",
    "Community",
    "Programs",
    "Innovation",
    "Career",
  ];

  const advertisementBlock = (
    <div className="alert alert-warning text-center small mb-0" role="alert">
      <p className="mb-1 fw-bold">Special Offer!</p>
      <p className="mb-0">Enroll in our AI course and get 20% off!</p>
      <Link to="/enrollment" className="btn btn-sm btn-info mt-2">
        Learn More
      </Link>
    </div>
  );
  const BASE_URL1 = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
  const BASE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
  const imageUrl = article.thumbnail
    ? BASE_URL + article.thumbnail
    : "https://via.placeholder.com/150";
  return (
  <div className="container py-4">
    <div className="row">
      <div className="col-lg-8">
        <Link to="/" className="btn btn-secondary btn-sm mb-3">
          <FaArrowLeft className="me-2" /> Back to Articles
        </Link>
        <h1 className="mb-3 article-title" style={{ color:"blue", lineHeight:"1.8", fontFamily: "Moul", fontStyle: 'normal'}}>{article.title}</h1>
        <p className="text-muted small mb-4">
          Published on: {new Date(article.created_at).toLocaleDateString()} |
          Views: {article.created_at?.toLocaleString()}
        </p>
        <img
          src={imageUrl}
          alt={article.title}
          className="img-fluid rounded mb-4"
          style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
        />

        <div
          className="mb-5 article-title" style={{ lineHeight: "2" }}
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Related Images */}
        {article.images && article.images.length > 0 && (
          <div className="mb-4">
            {/* <h5>Related Images</h5> */}
            <div className="row g-2">
              {article.images.map((img) => (
                <img
                  key={img.id}
                  src={BASE_URL1 + img.image_path}
                  alt={`Article image ${img.id}`}
                  style={{ maxHeight: "450px", width: "100%", objectFit: "cover" }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar and Recent Posts */}
      <div className="col-lg-4">
        <Sidebar
          relatedArticles={relatedArticles}
          categories={articleCategories}
          otherContent={advertisementBlock}
        />
        <div className="mt-4 p-3 bg-light rounded">
          <h5 className="mb-3">Recent Posts</h5>
          {recentPosts.length > 0 ? (
            <ul className="list-unstyled mb-0">
              {recentPosts.map((post) => (
                <li key={post.article_id} className="mb-2">
                  <Link
                    to={`/article/${post.article_id}`}
                    className="text-decoration-none"
                  >
                    {post.title}
                  </Link>
                  <p className="small text-muted mb-0">
                    {new Date(post.published_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="small text-muted">No recent posts.</p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default ArticleDetail;
