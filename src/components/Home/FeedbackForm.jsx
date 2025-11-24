import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { toast } from "react-toastify";

const FeedbackForm = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  
  const [form, setForm] = useState({
    patientName: {
      en: { firstName: "", middleName: "", lastName: "" },
      ru: { firstName: "", middleName: "", lastName: "" }
    },
    description: {
      en: "",
      ru: ""
    },
    contactInfo: {
      phone: "",
      email: "",
      whatsapp: false,
      telegram: false,
      max: false
    },
    rating: 0,
    doctorId: "",
    doctorEmail: "",
    status: "Posted"
  });
  
  const [doctors, setDoctors] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [videoFiles, setVideoFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(false);

  const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "https://apimanager.health-direct.ru";
    
  // Fetch doctors list on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

const fetchDoctors = async () => {
  setDoctorsLoading(true);
  try {
    const response = await fetch(`${API_BASE}/api/doctors-profile/minimal`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
   
    
    // Extract doctors from the formattedDoctors property
    const doctorsData = data.formattedDoctors || [];
    
    console.log('Final doctors data:', doctorsData);
    setDoctors(doctorsData);
    
    if (doctorsData.length === 0) {
      console.warn('No doctors found in the response');
    }
  } catch (error) {
    console.error("Error fetching doctors:", error);
    toast.error("Failed to load doctors list");
    setDoctors([]);
  } finally {
    setDoctorsLoading(false);
  }
};

console.log(doctors)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.patientName[currentLanguage].firstName || !form.patientName[currentLanguage].lastName) {
      toast.error("Please fill in your first and last name");
      return;
    }

    if (!form.contactInfo.phone || !form.contactInfo.email) {
      toast.error("Please fill in phone and email");
      return;
    }

    if (!form.description[currentLanguage]) {
      toast.error("Please write your review");
      return;
    }

    if (form.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append('patientName', JSON.stringify(form.patientName));
      formData.append('description', JSON.stringify(form.description));
      formData.append('contactInfo', JSON.stringify(form.contactInfo));
      formData.append('rating', form.rating.toString());
      formData.append('status', form.status);
      
      // Add doctor info if selected
      if (form.doctorId) {
        formData.append('doctorId', form.doctorId);
        formData.append('doctorEmail', form.doctorEmail);
      }

      // Add profile picture
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }

      // Add video/files
      videoFiles.forEach(file => {
        formData.append('files', file);
      });

      const response = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      toast.success("Review submitted successfully!");
      
      // Reset form
      setForm({
        patientName: {
          en: { firstName: "", middleName: "", lastName: "" },
          ru: { firstName: "", middleName: "", lastName: "" }
        },
        description: {
          en: "",
          ru: ""
        },
        contactInfo: {
          phone: "",
          email: "",
          whatsapp: false,
          telegram: false,
          max: false
        },
        rating: 0,
        doctorId: "",
        doctorEmail: "",
        status: "Posted"
      });
      setProfilePicture(null);
      setVideoFiles([]);

    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.message.includes("Failed to fetch") || error.message.includes("Connection refused")) {
        toast.error("Cannot connect to server. Please make sure the backend is running.");
      } else {
        toast.error("Error submitting review. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      patientName: {
        ...prev.patientName,
        [currentLanguage]: {
          ...prev.patientName[currentLanguage],
          [field]: value
        }
      }
    }));
  };

  const handleDescriptionChange = (value) => {
    setForm(prev => ({
      ...prev,
      description: {
        ...prev.description,
        [currentLanguage]: value
      }
    }));
  };

  const handleContactChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    if (selectedDoctorId) {
      const selectedDoctor = doctors.find(doctor => doctor._id === selectedDoctorId);
      setForm(prev => ({
        ...prev,
        doctorId: selectedDoctor._id,
        doctorEmail: selectedDoctor.email
      }));
    } else {
      setForm(prev => ({
        ...prev,
        doctorId: "",
        doctorEmail: ""
      }));
    }
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles(prev => [...prev, ...files]);
  };

  const removeVideoFile = (index) => {
    setVideoFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <section id="reviews" className="w-full pt-3 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-brand1 text-center text-[2rem] leading-10 font-bold mb-8">
          {t("testimonials.title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md border border-brand4 max-w-3xl mx-auto"
        >
          {/* Doctor Selection (Optional) */}
          <div className="mb-6">
            <label className="block text-brand1 font-semibold mb-2">
              Select Doctor (Optional)
            </label>
            <select
              className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
              value={form.doctorId}
              onChange={handleDoctorChange}
            >
              <option value="">-- Select a doctor --</option>
              {doctorsLoading ? (
                <option disabled>Loading doctors...</option>
              ) : (
                doctors.map((doctor) => (
                  <option key={doctor._id} value={doctor._id}>
                    {doctor.displayName?.[currentLanguage] || 
                     `${doctor.lastName?.[currentLanguage]} ${doctor.firstName?.[currentLanguage]} ${doctor.middleName?.[currentLanguage]}`}
                  </option>
                ))
              )}
            </select>
            {form.doctorId && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: {doctors.find(d => d._id === form.doctorId)?.displayName?.[currentLanguage]}
              </p>
            )}
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-brand1 font-semibold mb-2">
                {t("contact.firstName")} *
              </label>
              <input
                type="text"
                required
                className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
                value={form.patientName[currentLanguage].firstName}
                onChange={(e) => handleNameChange('firstName', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-brand1 font-semibold mb-2">
                {t("contact.lastName")} *
              </label>
              <input
                type="text"
                required
                className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
                value={form.patientName[currentLanguage].lastName}
                onChange={(e) => handleNameChange('lastName', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-brand1 font-semibold mb-2">
                {t("contact.middleName")}
              </label>
              <input
                type="text"
                className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
                value={form.patientName[currentLanguage].middleName}
                onChange={(e) => handleNameChange('middleName', e.target.value)}
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-brand1 font-semibold mb-2">
                {t("contact.phone")} *
              </label>
              <PhoneInput
                defaultCountry="ru"
                value={form.contactInfo.phone}
                onChange={(phone) => handleContactChange('phone', phone)}
                className="rounded-lg border border-brand4 text-sm w-full"
                inputClassName="!bg-transparent !border-none !w-full !px-3 !py-2 focus:!outline-none"
              />
              <div className="flex flex-wrap gap-4 text-brand1 text-sm mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#59302a]"
                    checked={form.contactInfo.whatsapp}
                    onChange={(e) => handleContactChange('whatsapp', e.target.checked)}
                  />
                  <span>Whatsapp</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#59302a]"
                    checked={form.contactInfo.telegram}
                    onChange={(e) => handleContactChange('telegram', e.target.checked)}
                  />
                  <span>Telegram</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#59302a]"
                    checked={form.contactInfo.max}
                    onChange={(e) => handleContactChange('max', e.target.checked)}
                  />
                  <span>Max</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-brand1 font-semibold mb-2">
                {t("contact.email")} *
              </label>
              <input
                type="email"
                required
                className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
                value={form.contactInfo.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-brand1 font-semibold mb-2">
              Rating *
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  onClick={() => setForm(prev => ({ ...prev, rating: star }))}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Review Text */}
          <div className="mb-6">
            <label className="block text-brand1 font-semibold mb-2">
              {t("testimonials.yourReview")} *
            </label>
            <textarea
              className="w-full border border-brand4 rounded-lg p-3 text-brand1 focus:outline-none focus:ring-2 focus:ring-brand1"
              rows={5}
              value={form.description[currentLanguage]}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              required
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="mb-6">
            <label className="block text-brand1 font-semibold mb-2">
              Profile Picture
            </label>
            <div
              className="border border-brand4 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand1 hover:bg-brand1/5"
              onClick={() => document.getElementById("profile-picture-upload").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-brand1 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-brand1 text-center">
                {profilePicture 
                  ? `Selected: ${profilePicture.name}` 
                  : "Click to upload profile picture"}
              </p>
              <input
                id="profile-picture-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setProfilePicture(e.target.files[0] || null)}
              />
            </div>
          </div>

          {/* Video Upload */}
          <div className="mb-6">
            <label className="block text-brand1 font-semibold mb-2">
              {t("testimonials.uploadVideo")}
            </label>
            <div
              className="border border-brand4 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-brand1 hover:bg-brand1/5"
              onClick={() => document.getElementById("video-upload").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-brand1 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <p className="text-brand1 text-center">
                {t("testimonials.clickOrDrag")}
              </p>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                multiple
                className="hidden"
                onChange={handleVideoUpload}
              />
            </div>
            
            {/* Display selected video files */}
            {videoFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-brand1 font-semibold mb-2">Selected files:</p>
                {videoFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded mb-2">
                    <span className="text-brand1 text-sm">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeVideoFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-brand1 cursor-pointer text-white font-semibold rounded-lg px-8 py-3 shadow hover:bg-brand5/90 w-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
            ) : (
              t("testimonials.btn")
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;