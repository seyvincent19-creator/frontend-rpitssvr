import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./ELibraryUI.css";
import { Link } from "react-router-dom";
import NavSection from "./components/NavSection";

// Localhost API endpoints
// const API_EBOOKS = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/ebooks";
// const API_THESES = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/thesis";
// Server API endpoints
 const API_EBOOKS = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/ebooks";
 const API_THESES = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/thesis";
// Public disk base URL (after `php artisan storage:link`)
const BASE_STORAGE_URL = "https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/";

export default function ELibraryUI() {
  const [ebooks, setEbooks] = useState([]);
  const [thesis, setThesis] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(""); // skill/category
  const [searchText, setSearchText] = useState(""); // live text search

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Fetch ebooks whenever major or text changes
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();

    if (selectedMajor) {
      params.append("category", selectedMajor); // Laravel index() reads category
    }

    if (searchText.trim() !== "") {
      params.append("q", searchText.trim());
    }

    const url =
      API_EBOOKS + (params.toString() ? `?${params.toString()}` : "");

    fetch(url, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setEbooks(data.data || data);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error fetching ebooks:", err);
        }
      });

    return () => controller.abort();
  }, [selectedMajor, searchText]);

  // Fetch thesis once
  useEffect(() => {
    fetch(API_THESES)
      .then((res) => res.json())
      .then((data) => setThesis(data.data || data))
      .catch((err) => console.error("Error fetching thesis:", err));
  }, []);

  return (
    <div>
      {/* Header + select + search */}
      <NavSection
        selectedMajor={selectedMajor}
        onMajorChange={setSelectedMajor}
        searchText={searchText}
        onSearchTextChange={setSearchText}
      />

      {/* E-books section */}
      <Section
        title="e-book"
        items={ebooks}
        imageField="image" // change to 'cover_image_path' if needed
        titleField="title"
        subTitleField="author"
      />

      {/* Theses section */}
      <Section
        title="Thesis"
        items={thesis}
        imageField="image"
        titleField="title"
        subTitleField="student"
      />
    </div>
  );
}

function Section({
  title,
  items,
  imageField,
  titleField,
  subTitleField,
  category = title.toLowerCase(),
}) {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3 type-library p-2">
        <h4 className="fw-bold mb-0">{title}</h4>
        <h5 className="text-primary mb-0" style={{ cursor: "pointer" }}>
          <Link
            to={`/e-library/see-all/${title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            See More...
          </Link>
        </h5>
      </div>

      {items.length === 0 ? (
        <div className="text-center text-muted py-4">
          មិនមានទិន្នន័យសម្រាប់ប្រភេទនេះទេ
        </div>
      ) : (
        <div className="row">
          {items.map((item) => {
            const rawPath = item[imageField] || "";
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
                className="col-12 col-sm-6 col-md-3 mb-3"
                data-aos="fade-up"
              >
                <div className="card p-3 h-100">
                  <img
                    src={imgSrc}
                    alt={item[titleField]}
                    className="card-img-top mb-2"
                    style={{ height: "auto", objectFit: "cover" }}
                  />
                  <h6 className="text-danger fw-bold">{item[titleField]}</h6>
                  <small className="text-muted">{item[subTitleField]}</small>
                  <Link
                    to={`/e-library/detail/${category}/${item.id}`}
                    className="btn btn-primary mt-2 khmer-google-font"
                  >
                    ចូលអានឯកសារ
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
