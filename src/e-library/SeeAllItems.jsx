import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavSection from "./components/NavSection";
// local API
// const API_ENDPOINTS = {
//   "e-book": "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/ebooks",
//   thesis: "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/thesis",
//   "e-publications": "https://your-api-link.com/api/e-publications",
//   audios: "https://your-api-link.com/api/audios",
//   journals: "https://your-api-link.com/api/journals",
//   videos: "https://your-api-link.com/api/videos",
// };

// const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
// Server API
const API_ENDPOINTS = {
  "e-book": "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/ebooks",
  thesis: "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/thesis",
  // "e-publications": "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/e-publications",
  // audios: "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/audios",
  // journals: "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/journals",
  // videos: "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/videos",
};

const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";
const titleFieldMap = {
  "e-book": "title",
  thesis: "title",
  // "e-publications": "title",
  // audios: "title",
  // journals: "title",
  // videos: "title",
};

const subTitleFieldMap = {
  "e-book": "author",
  thesis: "student",
  "e-publications": "author",
  audios: "author",
  journals: "author",
  videos: "creator",
};

const imageFieldMap = {
  "e-book": "image",
  thesis: "image",
  "e-publications": "image",
  audios: "image",
  journals: "image",
  videos: "image",
};

function SeeAllItems() {
  const { category } = useParams();
  const normalizedCategory = category.toLowerCase();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state (client-side)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter/search state for ebooks
  const [selectedMajor, setSelectedMajor] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setItems([]);
      setCurrentPage(1);

      const baseUrl = API_ENDPOINTS[normalizedCategory];
      if (!baseUrl) {
        setError("Invalid category");
        setLoading(false);
        return;
      }

      try {
        let url = baseUrl;

        // Only ebooks support category + q filtering in your API
        if (normalizedCategory === "e-book") {
          const params = new URLSearchParams();
          if (selectedMajor) {
            params.append("category", selectedMajor);
          }
          if (searchText.trim() !== "") {
            params.append("q", searchText.trim());
          }
          if (params.toString()) {
            url += `?${params.toString()}`;
          }
        }

        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${normalizedCategory} data`);
        }

        const data = await res.json();
        const itemList = data.data || data;
        setItems(itemList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [normalizedCategory, selectedMajor, searchText]);

  // Pagination logic
  const totalPages = Math.ceil(items.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const itemsToShow = items.slice(startIndex, startIndex + pageSize);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const titleField = titleFieldMap[normalizedCategory] || "title";
  const subTitleField = subTitleFieldMap[normalizedCategory] || "";
  const imageField = imageFieldMap[normalizedCategory] || "";

  return (
    <div>
      {/* Pass filters only for ebooks; NavSection will still render for other categories but filter affects only ebooks */}
      <NavSection
        selectedMajor={selectedMajor}
        onMajorChange={setSelectedMajor}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 style={{ textTransform: "capitalize" }}>
            {category.replace("-", " ")}
          </h2>
          <Link to="/e-library" className="btn btn-secondary">
            Back to Library
          </Link>
        </div>

        {loading ? (
          <p>Loading items...</p>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : items.length === 0 ? (
          <p>មិនមានទិន្នន័យសម្រាប់ប្រភេទនេះទេ</p>
        ) : (
          <>
            <div className="row">
              {itemsToShow.map((item) => {
                const rawPath = imageField ? item[imageField] : "";
                const normalizedPath =
                  typeof rawPath === "string" && rawPath.startsWith("/")
                    ? rawPath.substring(1)
                    : rawPath;
                const imgSrc = normalizedPath
                  ? BASE_STORAGE_URL + normalizedPath
                  : "https://via.placeholder.com/300x400?text=No+Image";

                return (
                  <div
                    key={item.id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                  >
                    <div className="card h-100 shadow-sm rounded">
                      <img
                        src={imgSrc}
                        alt={item[titleField]}
                        className="card-img-top"
                        style={{ height: "160px", objectFit: "cover" }}
                      />

                      <div className="card-body">
                        <h5 className="card-title">{item[titleField]}</h5>
                        {subTitleField && (
                          <p className="text-muted">
                            {item[subTitleField]}
                          </p>
                        )}
                        <Link
                          to={`/e-library/detail/${normalizedCategory}/${item.id}`}
                          className="btn btn-primary"
                        >
                          ចូលអានឯកសារ
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li
                  className={`page-item ${
                    currentPage === 1 ? "disabled" : ""
                  }`}
                  onClick={() => goToPage(currentPage - 1)}
                >
                  <button className="page-link" tabIndex="-1">
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    onClick={() => goToPage(i + 1)}
                  >
                    <button className="page-link">{i + 1}</button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}
                  onClick={() => goToPage(currentPage + 1)}
                >
                  <button className="page-link">Next</button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export default SeeAllItems;
