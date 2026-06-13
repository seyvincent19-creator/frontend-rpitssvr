import React, { useState } from "react";
import DepartmentSidebar from "./departments/DepartmentSidebar";
import SectionMOU from "../components/SectionMOU";
import { FaUser, FaPhone, FaBookOpen, FaCalendar, FaUpload, FaCheck, FaTimes, FaIdCard, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

const API_BASE = "https://phplaravel-1634699-6478817.cloudwaysapps.com/api";

const img_about1 = [
  { id: 1, path: "/images/img-idustry/1.jpg" },
  { id: 2, path: "/images/img-idustry/2.jpg" },
  { id: 3, path: "/images/img-idustry/3.jpg" },
  { id: 4, path: "/images/img-aboutus/s4.JPG" },
  { id: 5, path: "/images/img-aboutus/s5.jpg" },
  { id: 6, path: "/images/img-aboutus/s6.JPG" },
];

const MAJOR_KEYS = [
  { value: "computer_science",      tKey: "major_computer_science" },
  { value: "electrical",            tKey: "major_electrical" },
  { value: "mechatronics",          tKey: "major_mechatronics" },
  { value: "industrial_mechanics",  tKey: "major_industrial_mechanics" },
  { value: "electronics",           tKey: "major_electronics" },
  { value: "automotive",            tKey: "major_automotive" },
  { value: "civil",                 tKey: "major_civil" },
  { value: "refrigeration",         tKey: "major_refrigeration" },
  { value: "english",               tKey: "major_english" },
  { value: "accounting",            tKey: "major_accounting" },
];

const PROVINCE_KEYS = [
  { value: "ភ្នំពេញ",          tKey: "prov_phnom_penh" },
  { value: "ស្វាយរៀង",         tKey: "prov_svay_rieng" },
  { value: "ព្រៃវែង",          tKey: "prov_prey_veng" },
  { value: "ក្រចេះ",            tKey: "prov_kratie" },
  { value: "មណ្ឌលគិរី",        tKey: "prov_mondulkiri" },
  { value: "រតនៈគិរី",         tKey: "prov_ratanakiri" },
  { value: "ស្ទឹងត្រែង",       tKey: "prov_stung_treng" },
  { value: "កំពង់ចាម",         tKey: "prov_kampong_cham" },
  { value: "ត្បូងឃ្មុំ",       tKey: "prov_tboung_khmum" },
  { value: "ខេត្តដទៃទៀត",     tKey: "prov_other" },
];

const INITIAL_FORM = {
  lastNameKh: "", firstNameKh: "",
  lastNameEn: "", firstNameEn: "",
  gender: "", dob: "", nationalId: "",
  phone: "", email: "",
  province: "", address: "",
  guardianName: "", guardianPhone: "",
  major: "", year: "",
  photo: null,
};

const StudentRegistration = () => {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const kh = lang === 'kh' ? { fontFamily: "Siemreap, sans-serif" } : {};
  const fieldRadius = { borderRadius: "12px" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((err) => ({ ...err, [name]: undefined, submit: undefined }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0] || null;
    setErrors((err) => ({ ...err, photo: undefined }));
    if (!file) { setForm((f) => ({ ...f, photo: null })); setPhotoPreview(null); return; }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setErrors((err) => ({ ...err, photo: t('reg_photo_type_error') }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((err) => ({ ...err, photo: t('reg_photo_size_error') }));
      return;
    }
    setForm((f) => ({ ...f, photo: file }));
    setPhotoPreview(URL.createObjectURL(file));
  };

  const validate = () => {
    const e = {};
    if (!form.lastNameKh.trim())  e.lastNameKh  = t('err_last_name_kh');
    if (!form.firstNameKh.trim()) e.firstNameKh = t('err_first_name_kh');
    if (!form.lastNameEn.trim())  e.lastNameEn  = t('err_last_name_en');
    if (!form.firstNameEn.trim()) e.firstNameEn = t('err_first_name_en');
    if (!form.gender)             e.gender      = t('err_gender');
    if (!form.dob)                e.dob         = t('err_dob');
    if (!form.phone.trim())       e.phone       = t('err_phone');
    if (!form.province)           e.province    = t('err_province');
    if (!form.major)              e.major       = t('err_major');
    if (!form.year)               e.year        = t('err_year');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = new FormData();
      payload.append("last_name_kh",    form.lastNameKh);
      payload.append("first_name_kh",   form.firstNameKh);
      payload.append("last_name_en",    form.lastNameEn);
      payload.append("first_name_en",   form.firstNameEn);
      payload.append("gender",          form.gender);
      payload.append("dob",             form.dob);
      payload.append("national_id",     form.nationalId);
      payload.append("phone",           form.phone);
      payload.append("email",           form.email);
      payload.append("province",        form.province);
      payload.append("address",         form.address);
      payload.append("guardian_name",   form.guardianName);
      payload.append("guardian_phone",  form.guardianPhone);
      payload.append("major",           form.major);
      payload.append("year",            form.year);
      if (form.photo) payload.append("photo", form.photo);

      const res = await fetch(`${API_BASE}/students`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload,
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
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
    } catch {
      setErrors({ submit: t('reg_network_error') });
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

  const inputClass  = (f) => `form-control form-control-lg border-2 ${errors[f] ? "is-invalid border-danger" : "border-secondary border-opacity-25"}`;
  const selectClass = (f) => `form-select form-select-lg border-2 ${errors[f] ? "is-invalid border-danger" : "border-secondary border-opacity-25"}`;

  if (submitted) {
    return (
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card border-0 shadow-sm p-5" style={{ borderRadius: "20px" }}>
              <div className="d-flex justify-content-center mb-4">
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FaCheck size={36} color="#fff" />
                </div>
              </div>
              <h2 className="fw-bold mb-2" style={{ ...kh, color: "#15803d" }}>{t('reg_success_title')}</h2>
              <p className="text-muted mb-1" style={kh}>{t('reg_success_subtitle')}</p>
              <p className="text-muted small mb-4" style={kh}>{t('reg_success_msg')}</p>
              <button className="btn btn-primary btn-lg px-5" style={{ borderRadius: "12px", ...kh }} onClick={resetForm}>
                {t('reg_new')}
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
        <div className="col-md-8">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
              <FaGraduationCap size={28} color="#fff" />
            </div>
            <h1 className="fw-bold mb-2" style={{ ...kh, color: "#1a202c", fontSize: "1.8rem" }}>
              {t('reg_page_title')}
            </h1>
          </div>

          {errors.submit && (
            <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center mb-4" role="alert">
              <FaTimes className="me-2 flex-shrink-0" />
              <div style={kh}>{errors.submit}</div>
            </div>
          )}

          <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit} noValidate>

                {/* Personal */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={kh}><FaUser className="me-2" />{t('reg_section_personal')}</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_last_name_kh')}</label>
                      <input name="lastNameKh" value={form.lastNameKh} onChange={handleChange}
                        className={inputClass("lastNameKh")} placeholder="គោត្តនាម"
                        style={{ ...fieldRadius, fontFamily: "Siemreap, sans-serif" }} />
                      {errors.lastNameKh && <div className="invalid-feedback">{errors.lastNameKh}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_first_name_kh')}</label>
                      <input name="firstNameKh" value={form.firstNameKh} onChange={handleChange}
                        className={inputClass("firstNameKh")} placeholder="នាម"
                        style={{ ...fieldRadius, fontFamily: "Siemreap, sans-serif" }} />
                      {errors.firstNameKh && <div className="invalid-feedback">{errors.firstNameKh}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_last_name_en')}</label>
                      <input name="lastNameEn" value={form.lastNameEn} onChange={handleChange}
                        className={inputClass("lastNameEn")} placeholder="Last Name" style={fieldRadius} />
                      {errors.lastNameEn && <div className="invalid-feedback">{errors.lastNameEn}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_first_name_en')}</label>
                      <input name="firstNameEn" value={form.firstNameEn} onChange={handleChange}
                        className={inputClass("firstNameEn")} placeholder="First Name" style={fieldRadius} />
                      {errors.firstNameEn && <div className="invalid-feedback">{errors.firstNameEn}</div>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_gender')}</label>
                      <select name="gender" value={form.gender} onChange={handleChange}
                        className={selectClass("gender")} style={{ ...fieldRadius, ...kh }}>
                        <option value="">{t('reg_gender_select')}</option>
                        <option value="male">{t('reg_gender_male')}</option>
                        <option value="female">{t('reg_gender_female')}</option>
                      </select>
                      {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}><FaCalendar className="me-1" />{t('reg_dob')}</label>
                      <input type="date" name="dob" value={form.dob} onChange={handleChange}
                        className={inputClass("dob")} style={fieldRadius} />
                      {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label" style={{ ...kh, fontWeight: 600 }}><FaIdCard className="me-1" />{t('reg_national_id')}</label>
                    <input name="nationalId" value={form.nationalId} onChange={handleChange}
                      className={inputClass("nationalId")} placeholder="xxx xxx xxx" style={fieldRadius} />
                  </div>
                </div>

                {/* Contact */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={kh}><FaPhone className="me-2" />{t('reg_section_contact')}</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_phone')}</label>
                      <input name="phone" value={form.phone} onChange={handleChange}
                        className={inputClass("phone")} placeholder="+855 12 345 678" style={fieldRadius} />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_email')}</label>
                      <input name="email" value={form.email} onChange={handleChange}
                        className={inputClass("email")} placeholder="example@email.com" style={fieldRadius} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}><FaMapMarkerAlt className="me-1" />{t('reg_province')}</label>
                      <select name="province" value={form.province} onChange={handleChange}
                        className={selectClass("province")} style={{ ...fieldRadius, ...kh }}>
                        <option value="">{t('reg_province_select')}</option>
                        {PROVINCE_KEYS.map((p) => (
                          <option key={p.value} value={p.value}>{t(p.tKey)}</option>
                        ))}
                      </select>
                      {errors.province && <div className="invalid-feedback">{errors.province}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_address')}</label>
                      <input name="address" value={form.address} onChange={handleChange}
                        className={inputClass("address")} placeholder={lang === 'kh' ? "ភូមិ/សង្កាត់/ឃុំ" : "Village / Commune / District"}
                        style={{ ...fieldRadius, ...kh }} />
                    </div>
                  </div>
                </div>

                {/* Guardian */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={kh}><FaUser className="me-2" />{t('reg_section_guardian')}</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_guardian_name')}</label>
                      <input name="guardianName" value={form.guardianName} onChange={handleChange}
                        className={inputClass("guardianName")} placeholder={lang === 'kh' ? "ឈ្មោះ" : "Full Name"}
                        style={{ ...fieldRadius, ...kh }} />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_guardian_phone')}</label>
                      <input name="guardianPhone" value={form.guardianPhone} onChange={handleChange}
                        className={inputClass("guardianPhone")} placeholder="+855 12 345 678" style={fieldRadius} />
                    </div>
                  </div>
                </div>

                {/* Academic */}
                <div className="mb-4 pb-2 border-bottom">
                  <h6 className="fw-bold text-primary mb-3" style={kh}><FaBookOpen className="me-2" />{t('reg_section_academic')}</h6>
                  <div className="row">
                    <div className="col-md-8 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_major')}</label>
                      <select name="major" value={form.major} onChange={handleChange}
                        className={selectClass("major")} style={{ ...fieldRadius, ...kh }}>
                        <option value="">{t('reg_major_select')}</option>
                        {MAJOR_KEYS.map((m) => (
                          <option key={m.value} value={m.value}>{t(m.tKey)}</option>
                        ))}
                      </select>
                      {errors.major && <div className="invalid-feedback">{errors.major}</div>}
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_year')}</label>
                      <select name="year" value={form.year} onChange={handleChange}
                        className={selectClass("year")} style={fieldRadius}>
                        <option value="">{t('reg_year_select')}</option>
                        <option value="1">{lang === 'kh' ? 'ឆ្នាំទី ១' : 'Year 1'}</option>
                        <option value="2">{lang === 'kh' ? 'ឆ្នាំទី ២' : 'Year 2'}</option>
                        <option value="3">{lang === 'kh' ? 'ឆ្នាំទី ៣' : 'Year 3'}</option>
                        <option value="4">{lang === 'kh' ? 'ឆ្នាំទី ៤' : 'Year 4'}</option>
                      </select>
                      {errors.year && <div className="invalid-feedback">{errors.year}</div>}
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className="mb-4">
                  <h6 className="fw-bold text-primary mb-3" style={kh}><FaUpload className="me-2" />{t('reg_section_photo')}</h6>
                  <label className="form-label" style={{ ...kh, fontWeight: 600 }}>{t('reg_photo_label')}</label>
                  <input type="file" accept="image/*" onChange={handlePhoto}
                    className={`form-control form-control-lg border-2 ${errors.photo ? "is-invalid border-danger" : "border-secondary border-opacity-25"}`}
                    style={fieldRadius} />
                  {errors.photo && <div className="invalid-feedback">{errors.photo}</div>}
                  {photoPreview && (
                    <div className="mt-3 p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                      <img src={photoPreview} alt="preview"
                        style={{ width: 72, height: 72, objectFit: "cover", borderRadius: "10px" }} className="border" />
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg flex-grow-1"
                    disabled={submitting} style={{ borderRadius: "12px", fontWeight: 600, ...kh }}>
                    {submitting
                      ? <><span className="spinner-border spinner-border-sm me-2" />{t('reg_submitting')}</>
                      : <><FaCheck className="me-2" />{t('reg_submit')}</>
                    }
                  </button>
                  <button type="button" className="btn btn-outline-secondary btn-lg px-4"
                    onClick={resetForm} style={{ borderRadius: "12px", ...kh }}>
                    <FaTimes className="me-2" />{lang === 'kh' ? 'លុបចោល' : 'Reset'}
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Gallery */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4" style={{ ...kh, color: "#1a202c" }}>
              {lang === 'kh' ? 'រូបភាពសកម្មភាព' : 'Campus Activities'}
            </h5>
            <div className="row g-3">
              {img_about1.map((image) => (
                <div className="col-6 col-md-4" key={image.id}>
                  <div className="overflow-hidden" style={{ borderRadius: "12px" }}>
                    <img src={image.path} alt={`Campus ${image.id}`} className="img-fluid w-100"
                      style={{ aspectRatio: "4/3", objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5"><SectionMOU /></div>
        </div>

        <div className="col-md-4">
          <DepartmentSidebar />
          <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: "16px" }}>
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3" style={{ ...kh, color: "#1e40af" }}>
                {lang === 'kh' ? 'ព័ត៌មានសំខាន់' : 'Important Info'}
              </h6>
              <ul className="list-unstyled mb-0" style={{ ...kh, fontSize: "14px", lineHeight: "2.2" }}>
                {lang === 'kh' ? <>
                  <li>✅ ចុះឈ្មោះដោយឥតគិតថ្លៃ</li>
                  <li>✅ ទទួលបានការបណ្តុះបណ្តាលជំនាញ</li>
                  <li>✅ មានបរិក្ខាបច្ចេកទេសទំនើប</li>
                  <li>✅ គ្រូបង្រៀនមានបទពិសោធន៍</li>
                  <li>📞 ទំនាក់ទំនង: +85588 953 2 333</li>
                </> : <>
                  <li>✅ Free enrollment registration</li>
                  <li>✅ Professional skills training</li>
                  <li>✅ Modern technical equipment</li>
                  <li>✅ Experienced instructors</li>
                  <li>📞 Contact: +85588 953 2 333</li>
                </>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;
