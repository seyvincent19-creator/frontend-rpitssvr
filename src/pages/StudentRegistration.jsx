import React, { useState } from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import SectionMOU from "../components/SectionMOU";
import { FaUser, FaPhone, FaBookOpen, FaCalendar, FaUpload, FaCheck, FaTimes, FaIdCard, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";

const API_BASE = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api";

const img_about1 = [
  { id: 1, path: "/images/img-idustry/1.jpg" },
  { id: 2, path: "/images/img-idustry/2.jpg" },
  { id: 3, path: "/images/img-idustry/3.jpg" },
  { id: 4, path: "/images/img-aboutus/s4.JPG" },
  { id: 5, path: "/images/img-aboutus/s5.jpg" },
  { id: 6, path: "/images/img-aboutus/s6.JPG" },
];

const MAJORS = [
  { value: "computer_science", label: "វិទ្យាសាស្រ្តកុំព្យូទ័រ" },
  { value: "electrical", label: "អគ្គិសនី" },
  { value: "mechatronics", label: "មេកាត្រូនិក" },
  { value: "industrial_mechanics", label: "មេកានិកឧស្សាហកម្ម" },
  { value: "electronics", label: "អេឡិចត្រូនិក" },
  { value: "automotive", label: "មេកានិករថយន្ត" },
  { value: "civil", label: "សំណង់ស៊ីវិល" },
  { value: "refrigeration", label: "ជំនាញបរិក្ខាត្រជាក់" },
  { value: "english", label: "អក្សរសាស្រ្តអង់គ្លេស" },
  { value: "accounting", label: "គណនេយ្យ និងហិរញ្ញវត្ថុ" },
];

const PROVINCES = [
  "ភ្នំពេញ", "ស្វាយរៀង", "ព្រៃវែង", "ក្រចេះ", "មណ្ឌលគិរី",
  "រតនៈគិរី", "ស្ទឹងត្រែង", "កំពង់ចាម", "ត្បូងឃ្មុំ", "ខេត្តដទៃទៀត",
];

const INITIAL_FORM = {
  lastNameKh: "", firstNameKh: "",
  lastNameEn: "", firstNameEn: "",
  gender: "",
  dob: "",
  nationalId: "",
  phone: "", email: "",
  province: "", address: "",
  guardianName: "", guardianPhone: "",
  major: "", year: "",
  photo: null,
};

const StudentRegistration = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined, submit: undefined }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0] || null;
    setErrors((err) => ({ ...err, photo: undefined }));
    if (!file) { setForm((f) => ({ ...f, photo: null })); setPhotoPreview(null); return; }
    const valid = ["image/jpeg", "image/png", "image/webp"];
    if (!valid.includes(file.type)) {
      setErrors((err) => ({ ...err, photo: "អាប់ឡូឯកសារប្រភេទរូបភាព (jpg, png, webp)" }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((err) => ({ ...err, photo: "ទំហំរូបភាពត្រូវតែតិចជាង 2MB" }));
      return;
    }
    setForm((f) => ({ ...f, photo: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.lastNameKh.trim()) e.lastNameKh = "សូមបញ្ចូលគោត្តនាម";
    if (!form.firstNameKh.trim()) e.firstNameKh = "សូមបញ្ចូលនាម";
    if (!form.lastNameEn.trim()) e.lastNameEn = "សូមបញ្ចូលគោត្តនាមជាអក្សរឡាតាំង";
    if (!form.firstNameEn.trim()) e.firstNameEn = "សូមបញ្ចូលនាមជាអក្សរឡាតាំង";
    if (!form.gender) e.gender = "សូមជ្រើសរើសភេទ";
    if (!form.dob) e.dob = "សូមបញ្ចូលថ្ងៃខែឆ្នាំកំណើត";
    if (!form.phone.trim()) e.phone = "សូមបញ្ចូលលេខទូរស័ព្ទ";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) e.email = "អ៊ីមែលមិនត្រឹមត្រូវ";
    if (!form.province) e.province = "សូមជ្រើសរើសខេត្ត";
    if (!form.major) e.major = "សូមជ្រើសរើសជំនាញ";
    if (!form.year) e.year = "សូមជ្រើសរើសឆ្នាំសិក្សា";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("last_name_kh", form.lastNameKh);
      payload.append("first_name_kh", form.firstNameKh);
      payload.append("last_name_en", form.lastNameEn);
      payload.append("first_name_en", form.firstNameEn);
      payload.append("gender", form.gender);
      payload.append("dob", form.dob);
      payload.append("national_id", form.nationalId);
      payload.append("phone", form.phone);
      payload.append("email", form.email);
      payload.append("province", form.province);
      payload.append("address", form.address);
      payload.append("guardian_name", form.guardianName);
      payload.append("guardian_phone", form.guardianPhone);
      payload.append("major", form.major);
      payload.append("year", form.year);
      if (form.photo) payload.append("photo", form.photo);

      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Laravel validation errors: { errors: { field: ["msg"] } }
        if (data?.errors) {
          const mapped = {};
          Object.entries(data.errors).forEach(([key, msgs]) => {
            mapped[key] = Array.isArray(msgs) ? msgs[0] : msgs;
          });
          setErrors(mapped);
        } else {
          setErrors({ submit: data?.message || `Server error (${res.status})` });
        }
        return;
      }

      setSubmitted(true);
      setForm(INITIAL_FORM);
      setPhotoPreview(null);
    } catch (err) {
      setErrors({ submit: "មិនអាចភ្ជាប់ទៅម៉ាស៊ីនបម្រើបាន។ សូមព្យាយាមម្តងទៀត។" });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setPhotoPreview(null);
    setErrors({});
    setSubmitted(false);
  };

  const inputClass = (field) =>
    `form-control form-control-lg border-2 ${
      errors[field] ? "is-invalid border-danger" : "border-secondary border-opacity-25"
    }`;

  const selectClass = (field) =>
    `form-select form-select-lg border-2 ${
      errors[field] ? "is-invalid border-danger" : "border-secondary border-opacity-25"
    }`;

  const khStyle = { fontFamily: "Siemreap, sans-serif" };
  const fieldRadius = { borderRadius: "12px" };
  const labelStyle = { ...khStyle, fontWeight: "600" };

  if (submitted) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm p-5" style={{ borderRadius: "20px" }}>
              <div className="d-flex justify-content-center mb-4">
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: "linear-gradient(135deg, #22c55e, #16a34a)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <FaCheck size={36} color="#fff" />
                </div>
              </div>
              <h2 className="fw-bold mb-2" style={{ ...khStyle, color: "#15803d" }}>ជោគជ័យ!</h2>
              <p className="text-muted mb-1" style={khStyle}>អ្នកបានចុះឈ្មោះចូលរៀនដោយជោគជ័យ។</p>
              <p className="text-muted small mb-4" style={khStyle}>
                ក្រុមការងារនឹងទាក់ទងមកអ្នកក្នុងពេលឆាប់ៗ។
              </p>
              <button className="btn btn-primary btn-lg px-5"
                style={{ borderRadius: "12px", ...khStyle }} onClick={resetForm}>
                ចុះឈ្មោះម្តងទៀត
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Form Column */}
        <div className="col-md-8">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              }}>
              <FaGraduationCap size={28} color="#fff" />
            </div>
            <h1 className="fw-bold mb-2" style={{ ...khStyle, color: "#1a202c", fontSize: "1.8rem" }}>
              ចុះឈ្មោះសិស្សថ្មី
            </h1>
            <p className="text-muted">Student Enrollment Registration Form</p>
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
              <FaTimes className="me-2 flex-shrink-0" />
              <div style={khStyle}>{errors.submit}</div>
            </div>
          )}

          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} noValidate>

                {/* Section: Personal Info */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={khStyle}>
                    <FaUser className="me-2" />ព័ត៌មានផ្ទាល់ខ្លួន
                  </h6>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>គោត្តនាម (ខ្មែរ) *</label>
                      <input name="lastNameKh" value={form.lastNameKh} onChange={handleChange}
                        className={inputClass("lastNameKh")} placeholder="គោត្តនាម"
                        style={{ ...fieldRadius, ...khStyle }} />
                      {errors.lastNameKh && <div className="invalid-feedback" style={khStyle}>{errors.lastNameKh}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>នាម (ខ្មែរ) *</label>
                      <input name="firstNameKh" value={form.firstNameKh} onChange={handleChange}
                        className={inputClass("firstNameKh")} placeholder="នាម"
                        style={{ ...fieldRadius, ...khStyle }} />
                      {errors.firstNameKh && <div className="invalid-feedback" style={khStyle}>{errors.firstNameKh}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>គោត្តនាម (ឡាតាំង) *</label>
                      <input name="lastNameEn" value={form.lastNameEn} onChange={handleChange}
                        className={inputClass("lastNameEn")} placeholder="Last Name"
                        style={fieldRadius} />
                      {errors.lastNameEn && <div className="invalid-feedback" style={khStyle}>{errors.lastNameEn}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>នាម (ឡាតាំង) *</label>
                      <input name="firstNameEn" value={form.firstNameEn} onChange={handleChange}
                        className={inputClass("firstNameEn")} placeholder="First Name"
                        style={fieldRadius} />
                      {errors.firstNameEn && <div className="invalid-feedback" style={khStyle}>{errors.firstNameEn}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>ភេទ *</label>
                      <select name="gender" value={form.gender} onChange={handleChange}
                        className={selectClass("gender")} style={{ ...fieldRadius, ...khStyle }}>
                        <option value="">-- ជ្រើសរើស --</option>
                        <option value="male">បុរស</option>
                        <option value="female">ស្ត្រី</option>
                      </select>
                      {errors.gender && <div className="invalid-feedback" style={khStyle}>{errors.gender}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>
                        <FaCalendar className="me-1" />ថ្ងៃខែឆ្នាំកំណើត *
                      </label>
                      <input type="date" name="dob" value={form.dob} onChange={handleChange}
                        className={inputClass("dob")} style={fieldRadius} />
                      {errors.dob && <div className="invalid-feedback" style={khStyle}>{errors.dob}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label" style={labelStyle}>
                      <FaIdCard className="me-1" />លេខអត្តសញ្ញាណប័ណ្ណ (ស.ប.ស)
                    </label>
                    <input name="nationalId" value={form.nationalId} onChange={handleChange}
                      className={inputClass("nationalId")} placeholder="xxx xxx xxx"
                      style={fieldRadius} />
                  </div>
                </div>

                {/* Section: Contact */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={khStyle}>
                    <FaPhone className="me-2" />ព័ត៌មានទំនាក់ទំនង
                  </h6>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>លេខទូរស័ព្ទ *</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        className={inputClass("phone")} placeholder="+855 12 345 678"
                        style={fieldRadius} />
                      {errors.phone && <div className="invalid-feedback" style={khStyle}>{errors.phone}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>អ៊ីមែល (Optional)</label>
                      <input name="email" value={form.email} onChange={handleChange}
                        className={inputClass("email")} placeholder="example@email.com"
                        style={fieldRadius} />
                      {errors.email && <div className="invalid-feedback" style={khStyle}>{errors.email}</div>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>
                        <FaMapMarkerAlt className="me-1" />ខេត្ត/ក្រុង *
                      </label>
                      <select name="province" value={form.province} onChange={handleChange}
                        className={selectClass("province")} style={{ ...fieldRadius, ...khStyle }}>
                        <option value="">-- ជ្រើសរើស --</option>
                        {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                      {errors.province && <div className="invalid-feedback" style={khStyle}>{errors.province}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>អាសយដ្ឋាន</label>
                      <input name="address" value={form.address} onChange={handleChange}
                        className={inputClass("address")} placeholder="ភូមិ/សង្កាត់/ឃុំ"
                        style={{ ...fieldRadius, ...khStyle }} />
                    </div>
                  </div>
                </div>

                {/* Section: Guardian */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={khStyle}>
                    <FaUser className="me-2" />ព័ត៌មានអាណាព្យាបាល
                  </h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>ឈ្មោះអាណាព្យាបាល</label>
                      <input name="guardianName" value={form.guardianName} onChange={handleChange}
                        className={inputClass("guardianName")} placeholder="ឈ្មោះ"
                        style={{ ...fieldRadius, ...khStyle }} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={labelStyle}>លេខទូរស័ព្ទអាណាព្យាបាល</label>
                      <input name="guardianPhone" value={form.guardianPhone} onChange={handleChange}
                        className={inputClass("guardianPhone")} placeholder="+855 12 345 678"
                        style={fieldRadius} />
                    </div>
                  </div>
                </div>

                {/* Section: Academic */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={khStyle}>
                    <FaBookOpen className="me-2" />ព័ត៌មានសិក្សា
                  </h6>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label" style={labelStyle}>ជំនាញ *</label>
                      <select name="major" value={form.major} onChange={handleChange}
                        className={selectClass("major")} style={{ ...fieldRadius, ...khStyle }}>
                        <option value="">-- ជ្រើសរើសជំនាញ --</option>
                        {MAJORS.map((m) => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                      {errors.major && <div className="invalid-feedback" style={khStyle}>{errors.major}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label" style={labelStyle}>ឆ្នាំ *</label>
                      <select name="year" value={form.year} onChange={handleChange}
                        className={selectClass("year")} style={fieldRadius}>
                        <option value="">-- ជ្រើស --</option>
                        <option value="1">ឆ្នាំទី ១</option>
                        <option value="2">ឆ្នាំទី ២</option>
                        <option value="3">ឆ្នាំទី ៣</option>
                        <option value="4">ឆ្នាំទី ៤</option>
                      </select>
                      {errors.year && <div className="invalid-feedback" style={khStyle}>{errors.year}</div>}
                    </div>
                  </div>
                </div>

                {/* Section: Photo */}
                <div className="mb-4">
                  <h6 className="fw-bold text-primary mb-3" style={khStyle}>
                    <FaUpload className="me-2" />ឯកសារភ្ជាប់
                  </h6>
                  <label className="form-label" style={labelStyle}>
                    រូបថត ឬ ឯកសារផ្ទាល់ខ្លួន (Optional)
                  </label>
                  <p className="text-muted small mb-2" style={khStyle}>JPG, PNG, WEBP — ទំហំតិចជាង 2MB</p>
                  <input type="file" accept="image/*" onChange={handlePhoto}
                    className={`form-control form-control-lg border-2 ${errors.photo ? "is-invalid border-danger" : "border-secondary border-opacity-25"}`}
                    style={fieldRadius} />
                  {errors.photo && <div className="invalid-feedback" style={khStyle}>{errors.photo}</div>}

                  {photoPreview && (
                    <div className="mt-3 p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                      <img src={photoPreview} alt="preview"
                        style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "10px" }}
                        className="border" />
                      <div>
                        <p className="mb-0 fw-semibold small" style={khStyle}>មើលរូបកម្រិតមុន</p>
                        <small className="text-muted" style={khStyle}>រូបភាពត្រូវបានជ្រើសរើស</small>
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg flex-grow-1"
                    disabled={submitting}
                    style={{ borderRadius: "12px", fontWeight: "600", ...khStyle }}>
                    {submitting ? (
                      <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>កំពុងផ្ញើ...</>
                    ) : (
                      <><FaCheck className="me-2" />ចុះឈ្មោះ</>
                    )}
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-lg px-4"
                    onClick={resetForm} style={{ borderRadius: "12px", ...khStyle }}>
                    <FaTimes className="me-2" />លុបចោល
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4" style={{ ...khStyle, color: "#1a202c" }}>
              រូបភាពសកម្មភាព
            </h5>
            <div className="row g-3">
              {img_about1.map((image) => (
                <div className="col-6 col-md-4" key={image.id}>
                  <div className="overflow-hidden" style={{ borderRadius: "12px" }}>
                    <img src={image.path} alt={`Campus ${image.id}`}
                      className="img-fluid w-100"
                      style={{ aspectRatio: "4/3", objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <SectionMOU />
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-md-4">
          <DepartmentSidebar />

          {/* Info Card */}
          <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3" style={{ ...khStyle, color: "#1e40af" }}>ព័ត៌មានសំខាន់</h6>
              <ul className="list-unstyled mb-0" style={{ ...khStyle, fontSize: "14px", lineHeight: "2.2" }}>
                <li>✅ ចុះឈ្មោះដោយឥតគិតថ្លៃ</li>
                <li>✅ ទទួលបានការបណ្តុះបណ្តាលជំនាញ</li>
                <li>✅ មានបរិក្ខាបច្ចេកទេសទំនើប</li>
                <li>✅ គ្រូបង្រៀនមានបទពិសោធន៍</li>
                <li>📞 ទំនាក់ទំនង: 012 345 678</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
