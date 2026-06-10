import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";

// SkillPages.js
const SkillPages = ({ 
  title_eng, 
  title_khmer, 
  description, 
  skills, 
  images, 
  courses 
}) => {
  // 🔹 Group courses by year
  const groupedByYear = courses.reduce((acc, course) => {
    if (!acc[course.year]) {
      acc[course.year] = {};
    }
    course.semesters.forEach(semester => {
      acc[course.year][semester.name] = semester.subjects;
    });
    return acc;
  }, {});
  
  const descriptionImages = images.filter(img => img.type === "description");
  const slideImages = images.filter(img => img.type === "slide");

  return (
    <div style={{ fontFamily: "'Siemreap', sans-serif", color: "#2c3e50" }}>
      {/* Title */}
      <h1 style={{ color: "#2c3e50", fontWeight: "700" }}>{title_eng}</h1>
      <h3 style={{ color: "#16a085", fontWeight: "600" }}>{title_khmer}</h3>
      {/* // Inside the return JSX, add this before the description section */}
      {slideImages && slideImages.length > 0 && (
  <div id="slideShowCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
    <div className="carousel-inner">
      {slideImages.map((image, index) => {
        const imageUrl = image.path.startsWith("http") 
          ? image.path 
          : `https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/${image.path}`;
        return (
          <div key={image.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <img 
              src={imageUrl} 
              className="d-block w-100 rounded shadow-sm" 
              alt={`Slide ${index + 1}`} 
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        );
      })}
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#slideShowCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#slideShowCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
)}
      {/* Display description */}
      <div className="mt-4">
        <h4 style={{ color: "#2980b9" }}>Description</h4>
        <p style={{ color: "#444", lineHeight: "1.8" }}>{description}</p>
        <button className="btn btn-primary">ចុះឈ្មោះសិក្សា</button>
      </div>

      {/* Display skills */}
      {skills && skills.length > 0 && (
        <div className="mt-4">
          <h4 style={{ color: "#2980b9" }}>អាជីពអនាគត</h4>
          <ul>
            {skills.map(skill => (
              <li 
                key={skill.id} 
                style={{ 
                  color: "#16a085", 
                  marginBottom: "5px" 
                }}
              >
                {skill.skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display courses */}
      {courses && courses.length > 0 && (
        <div className="mt-4">
          <h4 style={{ color: "#2980b9" }}>Curriculum</h4>
          <table className="table table-bordered align-middle">
            <thead className="text-center" style={{ backgroundColor: "#ecf9f6" }}>
              <tr>
                <th style={{ width: "15%", color: "#2c3e50" }}>Year</th>
                <th style={{ width: "40%", color: "#2c3e50" }}>Semester 1</th>
                <th style={{ width: "40%", color: "#2c3e50" }}>Semester 2</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedByYear).map(year => (
                <tr key={year}>
                  <td className="fw-bold text-center" style={{ backgroundColor: "#f7fdfc" }}>
                    Year {year}
                  </td>

                  {/* Semester 1 */}
                  <td>
                    {groupedByYear[year]["Semester 1"] ? (
                      <ul className="mb-0">
                        {groupedByYear[year]["Semester 1"].map(subject => (
                          <li 
                            key={subject.id} 
                            style={{ color: "#34495e", marginBottom: "4px" }}
                          >
                            {subject.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "#bbb" }}>-</span>
                    )}
                  </td>

                  {/* Semester 2 */}
                  <td>
                    {groupedByYear[year]["Semester 2"] ? (
                      <ul className="mb-0">
                        {groupedByYear[year]["Semester 2"].map(subject => (
                          <li 
                            key={subject.id} 
                            style={{ color: "#34495e", marginBottom: "4px" }}
                          >
                            {subject.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span style={{ color: "#bbb" }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Display description images only */}
      {descriptionImages && descriptionImages.length > 0 && (
        <div className="m-4">
          <h4 style={{ color: "#2980b9" }}>Images</h4>
          <div className="row g-3">
            {descriptionImages.map(image => {
              const imageUrl = image.path.startsWith("http") 
                ? image.path 
                : `https://phplaravel-1634699-6478817.cloudwaysapps.com/storage/${image.path}`;
              return (
                <div className="col-md-12" key={image.id}>
                  <img 
                    src={imageUrl} 
                    alt={`Description ${image.id}`} 
                    className="img-fluid rounded shadow-sm border" 
                    style={{ borderColor: "#16a085" }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillPages;
