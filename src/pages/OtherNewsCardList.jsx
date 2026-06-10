import React, { useEffect, useMemo, useState } from "react";

const API_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/articles";
const ITEMS_PER_PAGE = 6;

const BASE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/"; // for thumbnails

function normalizeArticle(raw) {
  return {
    id: raw.id ?? raw.article_id ?? crypto.randomUUID(),
    title: raw.title ?? raw.name ?? "គ្មានចំណងជើង",
    image: raw.thumbnail
      ? BASE_URL + raw.thumbnail
      : "https://via.placeholder.com/600x360?text=No+Image",
    description:
      raw.description ??
      raw.excerpt ??
      raw.summary ??
      (typeof raw.content === "string"
        ? raw.content.slice(0, 120) + "..."
        : " "),
    slug: raw.slug,
  };
}

const OtherNewsCardList = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch on mount
  useEffect(() => {
    const controller = new AbortController();
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL, {
          signal: controller.signal,
          headers: {
            Accept: "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} — ${res.statusText}`);
        }

        const json = await res.json();
        // Supports both: [ ... ] or { data: [ ... ] }
        const rawList = Array.isArray(json) ? json : json?.data ?? [];
        const normalized = rawList.map(normalizeArticle);

        setArticles(normalized);
        setCurrentPage(1); // reset to first page after load
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "បរាជ័យក្នុងការទាញយកទិន្នន័យ");
        }
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => controller.abort();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(articles.length / ITEMS_PER_PAGE)),
    [articles.length]
  );

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return articles.slice(start, start + ITEMS_PER_PAGE);
  }, [articles, currentPage]);

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  const KhmerFont = { fontFamily: "Khmer OS Battambang" };

  return (
    <>
      {/* Error state */}
      {error && (
        <div className="alert alert-danger" role="alert" style={KhmerFont}>
          មិនអាចទាញយកទិន្នន័យបានទេ៖ {error}
        </div>
      )}

      {/* Grid */}
      <div className="row g-4">
        {/* Loading skeletons */}
        {loading &&
          Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <div className="col-md-4" key={`sk-${i}`}>
              <div className="card h-100 shadow-sm">
                <div
                  className="card-img-top placeholder-glow"
                  style={{ height: "180px", background: "#e9ecef" }}
                />
                <div className="card-body">
                  <h5 className="card-title placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-10"></span>
                    <span className="placeholder col-6"></span>
                  </p>
                  <div className="text-end">
                    <button className="btn btn-outline-primary btn-sm disabled placeholder col-4">
                      &nbsp;
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Loaded items */}
        {!loading &&
          paginated.map((item) => (
            
            <div className="col-md-4" key={item.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={`រូបភាព: ${item.title}`}
                  style={{ height: "180px", objectFit: "cover" }}
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/600x360?text=No+Image";
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold"
                    style={{
                      fontFamily: "Khmer OS Battambang",
                      fontSize: "1rem", // bigger than default
                      lineHeight: "1.4",
                    }}
                  >
                    {item.title}
                  </h5>
                  <p
                    className="card-text"
                    style={{
                      fontFamily: "Khmer OS Battambang",
                      fontSize: "0.90rem", // slightly smaller for body text
                      lineHeight: "1.5",
                      color: "#555", // softer than pure black
                    }}
                  >
                    {item.description}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="badge text-bg-light">#{item.id}</span>
                    <a
                      className="btn btn-outline-primary btn-sm"
                      href={`/article/${item.id}`}
                      style={{ fontFamily: "Khmer OS Battambang" }}
                    >
                      អានបន្ថែម
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

        {/* Empty state */}
        {!loading && !error && articles.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info mb-0" style={KhmerFont}>
              មិនទាន់មានអត្ថបទទេ។
            </div>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {!loading && articles.length > 0 && (
        <div className="d-flex justify-content-center align-items-center mt-4">
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            ← មុន
          </button>
          <span style={KhmerFont}>
            ទំព័រ {currentPage} / {totalPages}
          </span>
          <button
            className="btn btn-secondary btn-sm ms-2"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            បន្ទាប់ →
          </button>
        </div>
      )}
    </>
  );
};

export default OtherNewsCardList;
