import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavSection from "./components/NavSection";
import "./DetailItem.css";

export default function DetailItem() {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);
  const [relatedEbooks, setRelatedEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [relatedLoading, setRelatedLoading] = useState(true);
  const [error, setError] = useState(null);
  // local API base URL
  //const BASE_API_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api";
  //const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";

  // Server Api category normalization
  const BASE_API_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api";
  const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";

  function normalizeCategoryName(cat) {
    if (cat === "e-book") return "ebooks";
    if (cat === "thesis") return "thesis";
    if (cat === "e-publication") return "epubs";
    if (cat === "journal") return "journals";
    if (cat === "video") return "videos";
    if (cat === "audio") return "audios";
    return cat;
  }

  const apiCategory = normalizeCategoryName(category);

  useEffect(() => {
    async function fetchDetail() {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}/${apiCategory}/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setItem(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setItem(null);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [apiCategory, id]);

  useEffect(() => {
    if (!item) return;

    async function fetchRelated() {
      try {
        setRelatedLoading(true);
        const relatedResponse = await fetch(
          `${BASE_API_URL}/ebooks?exclude=${id}&limit=4`
        );
        if (!relatedResponse.ok) {
          throw new Error("Failed to fetch related ebooks");
        }
        const relatedData = await relatedResponse.json();
        setRelatedEbooks(relatedData.data || relatedData);
      } catch {
        setRelatedEbooks([]);
      } finally {
        setRelatedLoading(false);
      }
    }

    fetchRelated();
  }, [item, id]);

  if (loading) return <p className="container py-5">Loading...</p>;

  if (error) {
    return (
      <div className="container py-5">
        <p>Error loading item: {error}</p>
        <Link to="/e-library" className="btn btn-secondary">
          Back to Library
        </Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="container py-5">
        <p>Item not found.</p>
        <Link to="/e-library" className="btn btn-secondary">
          Back to Library
        </Link>
      </div>
    );
  }

  const coverRaw = item.image || "";
  const coverPath =
    typeof coverRaw === "string" && coverRaw.startsWith("/")
      ? coverRaw.substring(1)
      : coverRaw;
  const coverSrc = coverPath
    ? BASE_STORAGE_URL + coverPath
    : "https://via.placeholder.com/400x550?text=No+Cover";

  return (
    <div>
      {/* Simple header, no filter/search row */}
      <NavSection />

      <div
        className="container-fluid"
        style={{ background: "#f8f9fa", minHeight: "100vh", paddingTop: 32 }}
      >
        <div className="container py-4 bg-white rounded shadow">
          <div className="mb-3">
            <Link
              to={`/e-library/see-all/${category}`}
              className="btn btn-outline-primary"
            >
              « Back to list
            </Link>
          </div>

          <div className="row g-4">
            {/* Left: cover + actions */}
            <div className="col-md-5 mb-4">
              <div className="d-flex gap-3 mb-4">
                {item.url && (
                  <>
                    <a
                      href={item.url}
                      className="btn btn-outline-primary flex-grow-1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="bi bi-file-earmark-pdf me-2"></i> Read PDF
                    </a>
                    <a
                      href={item.url}
                      className="btn btn-outline-success flex-grow-1"
                      download
                    >
                      <i className="bi bi-download me-2"></i> Download
                    </a>
                  </>
                )}
              </div>
              <div className="card shadow-sm rounded border-primary border-2">
                <img
                  src={coverSrc}
                  alt={item.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "550px",
                    objectFit: "contain",
                  }}
                  className="mx-auto d-block p-3"
                />
              </div>
            </div>

            {/* Right: metadata */}
            <div className="col-md-7 mb-4">
              <div className="p-4 bg-light rounded">
                <div className="text-uppercase fw-semibold text-primary mb-3">
                  {category && category.toUpperCase()}
                </div>
                <h3 className="mb-4 fw-bold">{item.title}</h3>
                <div className="mb-4">
                  <div className="row g-3">
                    {item.student && (
                      <>
                        <div className="col-5 text-secondary">STUDENT</div>
                        <div className="col-7">{item.student}</div>
                      </>
                    )}
                    {item.supervisor && (
                      <>
                        <div className="col-5 text-secondary">SUPERVISOR</div>
                        <div className="col-7">{item.supervisor}</div>
                      </>
                    )}
                    {item.major && (
                      <>
                        <div className="col-5 text-secondary">MAJOR</div>
                        <div className="col-7">{item.major}</div>
                      </>
                    )}
                    {item.author && !item.student && (
                      <>
                        <div className="col-5 text-secondary">AUTHOR</div>
                        <div className="col-7">{item.author}</div>
                      </>
                    )}

                    <div className="col-5 text-secondary">YEAR</div>
                    <div className="col-7">{item.year}</div>

                    <div className="col-5 text-secondary">TYPE</div>
                    <div className="col-7">{item.type || "PDF"}</div>

                    <div className="col-5 text-secondary">CATEGORY</div>
                    <div className="col-7">{item.category}</div>

                    <div className="col-5 text-secondary">LANGUAGE</div>
                    <div className="col-7">{item.language}</div>

                    <div className="col-5 text-secondary">PAGES</div>
                    <div className="col-7">{item.pages}</div>
                  </div>
                </div>
                <div className="fw-bold mb-2 text-primary">Description</div>
                <div className="text-dark">
                  {item.description?.trim() ? item.description : "N/A"}
                </div>
              </div>
            </div>
          </div>

          {/* Related Ebooks Section */}
          <div className="mt-5">
            <h4 className="mb-4 text-primary border-bottom border-3 border-primary pb-2">
              Related Ebooks
            </h4>
            {relatedLoading && <p>Loading related ebooks...</p>}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
              {relatedEbooks.length === 0 && !relatedLoading && (
                <p className="text-muted">No related ebooks found.</p>
              )}
              {relatedEbooks.map((rel) => {
                const relRaw = rel.image || "";
                const relPath =
                  typeof relRaw === "string" && relRaw.startsWith("/")
                    ? relRaw.substring(1)
                    : relRaw;
                const relSrc = relPath
                  ? BASE_STORAGE_URL + relPath
                  : "https://via.placeholder.com/300x400?text=No+Image";

                return (
                  <div key={rel.id} className="col">
                    <div className="card h-100 shadow-sm border-primary hover-shadow rounded">
                      <img
                        src={relSrc}
                        alt={rel.title}
                        className="card-img-top"
                        style={{ height: "160px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title text-truncate text-primary">
                          {rel.title}
                        </h6>
                        <small className="text-secondary">
                          {rel.author || rel.student || ""}
                        </small>
                        <Link
                          to={`/e-library/detail/e-book/${rel.id}`}
                          className="btn btn-primary btn-sm mt-auto"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
