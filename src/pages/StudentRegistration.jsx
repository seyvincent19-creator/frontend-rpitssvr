import React, { useState } from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import SectionMOU from "../components/SectionMOU";
import { User, Phone, BookOpen, Calendar, Upload, Check, X } from "lucide-react";

const img_about1 = [
  { id: 1, path: "/images/img-idustry/1.jpg" },
  { id: 2, path: "/images/img-idustry/2.jpg" },
  { id: 3, path: "/images/img-idustry/3.jpg" },
  { id: 4, path: "/images/img-aboutus/s4.JPG" },
  { id: 5, path: "/images/img-aboutus/s5.jpg" },
  { id: 6, path: "/images/img-aboutus/s6.JPG" },
  { id: 7, path: "/images/img-aboutus/s7.jpg" },
  { id: 8, path: "/images/img-idustry/4.jpg" },
  { id: 9, path: "/images/img-idustry/5.jpg" },
];

const StudentRegistration = () => {
  const [form, setForm] = useState({
    lastNameKh: "",
    firstNameKh: "",
    lastNameEn: "",
    firstNameEn: "",
    phone: "",
    email: "",
    department: "",
    major: "",
    year: "",
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const departments = ["Electric", "Mechatronic", "Civil", "Computer"];
  const majors = [
    "វិទ្យាសាស្រ្តកុំព្យូទ័រ",
    "អគ្គិសនី",
    "មេកាត្រូនិក",
    "មេកានិកឧស្សាហកម្ម",
    "អេឡិចត្រូនិក",
    "មេកានិករថយន្ត",
    "សំណង់ស៊ីវិល",
    "ជំនាញបរិក្ខាត្រជាក់",
    "អក្សរសាស្រ្តអង់គ្លេស",
    "គណនេយ្យ និងហិរញ្ញវត្ថុ",
  ];
  const years = ["Year 1", "Year 2", "Year 3", "Year 4"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0] || null;
    setForm((f) => ({ ...f, photo: file }));
    setErrors((err) => ({ ...err, photo: undefined }));
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const validate = () => {
    const e = {};
    if (!form.lastNameKh.trim()) e.lastNameKh = "សូមបញ្ចូលគោត្តនាម";
    if (!form.firstNameKh.trim()) e.firstNameKh = "សូមបញ្ចូលនាម";
    if (!form.lastNameEn.trim()) e.lastNameEn = "សូមបញ្ចូលគោត្តនាមជាអក្សរឡាតាំង";
    if (!form.firstNameEn.trim()) e.firstNameEn = "សូមបញ្ចូលនាមជាអក្សរឡាតាំង";
    if (!form.phone.trim()) e.phone = "សូមបញ្ចូលលេខទូរស័ព្ទ";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      e.email = "អ៊ីមែលមិនត្រឹមត្រូវ";
    }
    //if (!form.department) e.department = "សូមជ្រើសរើសដេប៉ាតឺម៉ង់";
    if (!form.major) e.major = "សូមជ្រើសរើសជំនាញ";
    if (!form.year) e.year = "សូមជ្រើសរើសឆ្នាំសិក្សា";
    if (form.photo) {
      const valid = ["image/jpeg", "image/png", "image/webp"];
      if (!valid.includes(form.photo.type))
        e.photo = "អាប់ឡូឯកសារប្រភេទរូបភាព (jpg, png, webp)";
      if (form.photo.size > 2 * 1024 * 1024)
        e.photo = "ទំហំរូបភាពត្រូវតែតិចជាង 2MB";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log("Submitting form...", form); // debug
    setSuccessMsg("");
    if (!validate()) {
      console.log("Validation failed", errors);
      return;
    }
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("lastNameKh", form.lastNameKh);
      payload.append("firstNameKh", form.firstNameKh);
      payload.append("lastNameEn", form.lastNameEn);
      payload.append("firstNameEn", form.firstNameEn);
      payload.append("phone", form.phone);
      payload.append("email", form.email);
      payload.append("department", form.department);
      payload.append("major", form.major);
      payload.append("year", form.year);
      if (form.photo) payload.append("photo", form.photo);
      // localhost endpoint to handle form submission server-side
      // const res = await fetch(
      //   "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/students",
      //   {
      //     method: "POST",
      //     body: payload,
      //   }
      // );
      // endpoint to handle form submission server-side
      const res = await fetch(
        "https://phplaravel-1634699-6478817.cloudwaysapps.com/api/students",
        {
          method: "POST",
          body: payload,
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Server error");
      }

      setSuccessMsg("ជោគជ័យ! អ្នកបានចុះឈ្មោះដោយជោគជ័យ។");
      setForm({
        lastNameKh: "",
        firstNameKh: "",
        lastNameEn: "",
        firstNameEn: "",
        phone: "",
        email: "",
        department: "",
        major: "",
        year: "",
        photo: null,
      });
      setPhotoPreview(null);
      setErrors({});
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        submit: err.message || "មិនអាចផ្ញើបាន",
      }));
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      lastNameKh: "",
      firstNameKh: "",
      lastNameEn: "",
      firstNameEn: "",
      phone: "",
      email: "",
      department: "",
      major: "",
      year: "",
      photo: null,
    });
    setPhotoPreview(null);
    setErrors({});
    setSuccessMsg("");
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Form Column */}
        <div className="col-md-8">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="d-inline-block p-3 bg-primary bg-opacity-10 rounded-circle mb-3">
              <User size={32} className="text-primary" />
            </div>
            <h1
              className="fw-bold mb-2"
              style={{ fontFamily: "Khmer OS Siemreap", color: "#1a202c" }}
            >
              ចុះឈ្មោះសិស្សថ្មី
            </h1>
            <p className="text-muted">Student Registration Form</p>
          </div>

          {/* Success Alert */}
          {successMsg && (
            <div
              className="alert alert-success border-0 shadow-sm d-flex align-items-center mb-4"
              role="alert"
            >
              <Check size={20} className="me-2" />
              <div>{successMsg}</div>
            </div>
          )}

          {/* Form Card */}
          <div
            className="card border-0 shadow-sm mb-5"
            style={{ borderRadius: "16px" }}
          >
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} noValidate>
                {/* Khmer Name */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <User
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      គោត្តនាម
                    </label>
                    <input
                      name="lastNameKh"
                      value={form.lastNameKh}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.lastNameKh
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="គោត្តនាម"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Khmer OS Siemreap",
                      }}
                    />
                    {errors.lastNameKh && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.lastNameKh}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <User
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      នាម
                    </label>
                    <input
                      name="firstNameKh"
                      value={form.firstNameKh}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.firstNameKh
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="នាម"
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Khmer OS Siemreap",
                      }}
                    />
                    {errors.firstNameKh && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.firstNameKh}
                      </div>
                    )}
                  </div>
                </div>

                {/* English Name */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <User
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      គោត្តនាមជាអក្សរឡាតាំង
                    </label>
                    <input
                      name="lastNameEn"
                      value={form.lastNameEn}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.lastNameEn
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="Last Name"
                      style={{ borderRadius: "12px" }}
                    />
                    {errors.lastNameEn && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.lastNameEn}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <User
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      នាមជាអក្សរឡាតាំង
                    </label>
                    <input
                      name="firstNameEn"
                      value={form.firstNameEn}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.firstNameEn
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="First Name"
                      style={{ borderRadius: "12px" }}
                    />
                    {errors.firstNameEn && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.firstNameEn}
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone + Email */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <Phone
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      លេខទូរស័ព្ទ
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.phone
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="+855 12 345 678"
                      style={{ borderRadius: "12px" }}
                    />
                    {errors.phone && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.phone}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <Phone
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      អ៊ុម៉ែល (Opitonal)
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className={`form-control form-control-lg border-2 ${
                        errors.email
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      placeholder="ដាក់អ៊ុម៉ែលរបស់អ្នក"
                      style={{ borderRadius: "12px" }}
                    />
                    {errors.email && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Major and Year */}
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <BookOpen
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      ជំនាញ
                    </label>
                    <select
                      name="major"
                      value={form.major}
                      onChange={handleChange}
                      className={`form-select form-select-lg border-2 ${
                        errors.major
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      style={{
                        borderRadius: "12px",
                        fontFamily: "Khmer OS Siemreap",
                      }}
                    >
                      <option value="">-- ជ្រើសរើស --</option>
                      {majors.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                    {errors.major && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.major}
                      </div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label
                      className="form-label fw-semibold text-dark mb-2"
                      style={{ fontFamily: "Khmer OS Siemreap" }}
                    >
                      <Calendar
                        size={16}
                        className="me-2"
                        style={{ verticalAlign: "middle" }}
                      />
                      ឆ្នាំសិក្សា
                    </label>
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className={`form-select form-select-lg border-2 ${
                        errors.year
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      style={{ borderRadius: "12px" }}
                    >
                      <option value="">-- ជ្រើសរើស --</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    {errors.year && (
                      <div
                        className="invalid-feedback"
                        style={{ fontFamily: "Khmer OS Siemreap" }}
                      >
                        {errors.year}
                      </div>
                    )}
                  </div>
                </div>

                {/* Photo Upload */}
                <div className="mb-4">
                  <label
                    className="form-label fw-semibold text-dark mb-2"
                    style={{ fontFamily: "Khmer OS Siemreap" }}
                  >
                    <Upload
                      size={16}
                      className="me-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    ឯកសារផ្ទាល់ខ្លួន (អត្តសញ្ញាប័ណ្ណ ឬ សំបុត្រកំណើត)
                  </label>
                  <p
                    className="text-muted small mb-2"
                    style={{ fontFamily: "Khmer OS Siemreap" }}
                  >
                    JPG, PNG, WEBP — ទំហំតិចជាង 2MB
                  </p>

                  <div className="position-relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhoto}
                      className={`form-control form-control-lg border-2 ${
                        errors.photo
                          ? "is-invalid border-danger"
                          : "border-secondary border-opacity-25"
                      }`}
                      style={{ borderRadius: "12px" }}
                    />
                    {errors.photo && (
                      <div className="invalid-feedback">{errors.photo}</div>
                    )}
                  </div>

                  {photoPreview && (
                    <div className="mt-3 p-3 bg-light rounded-3 d-flex align-items-center">
                      <img
                        src={photoPreview}
                        alt="preview"
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                        className="border"
                      />
                      <div className="ms-3">
                        <p
                          className="mb-0 fw-semibold"
                          style={{ fontFamily: "Khmer OS Siemreap" }}
                        >
                          មើលរូបកម្រិតមុន
                        </p>
                        <small
                          className="text-muted"
                          style={{ fontFamily: "Khmer OS Siemreap" }}
                        >
                          រូបភាពរបស់អ្នកត្រូវបានដាក់ចូល
                        </small>
                      </div>
                    </div>
                  )}
                </div>

                {/* Error Alert */}
                {errors.submit && (
                  <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4">
                    <X size={20} className="me-2" />
                    <div>{errors.submit}</div>
                  </div>
                )}

                {/* Buttons */}
                <div className="d-flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg px-5 flex-grow-1"
                    disabled={submitting}
                    style={{ borderRadius: "12px", fontWeight: "600" }}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        កំពុងផ្ញើ...
                      </>
                    ) : (
                      <>
                        <Check
                          size={18}
                          className="me-2"
                          style={{ verticalAlign: "middle" }}
                        />
                        <span style={{ fontFamily: "Khmer OS Siemreap" }}>
                          ចុះឈ្មោះ
                        </span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={resetForm}
                    style={{ borderRadius: "12px", fontWeight: "600" }}
                  >
                    <X
                      size={18}
                      className="me-2"
                      style={{ verticalAlign: "middle" }}
                    />
                    <span style={{ fontFamily: "Khmer OS Siemreap" }}>
                      លុបចោល
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-5">
            <h5
              className="fw-bold mb-4"
              style={{ fontFamily: "Khmer OS Siemreap", color: "#1a202c" }}
            >
              រូបភាពសកម្មភាពទំនាក់ទំនងជាមួយវិស័យឯកជន និងរោងចក្រឧស្សាហកម្ម
            </h5>
            <div className="row g-3">
              {img_about1.map((image) => (
                <div className="col-6 col-md-4" key={image.id}>
                  <div
                    className="position-relative overflow-hidden"
                    style={{ borderRadius: "12px" }}
                  >
                    <img
                      src={image.path}
                      alt={`Campus ${image.id}`}
                      className="img-fluid w-100"
                      style={{
                        aspectRatio: "4/3",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MOU Section */}
          <div className="mt-5">
            <SectionMOU />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <DepartmentSidebar />
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
