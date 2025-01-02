import { useFormik } from "formik";
import * as Yup from "yup";
import uploadIcon from "../assets/icon-upload.svg";
import infoIcon from "../assets/icon-info.svg";
import { useState } from "react";

const FormContainer = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setImage(imageFile);
      setPreview(URL.createObjectURL(imageFile));
      formik.setFieldValue("file", imageFile); // Set file value in Formik
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview(null);
    formik.setFieldValue("file", null); // Clear file value in Formik
  };

  const formik = useFormik({
    initialValues: {
      file: null,
      name: "",
      email: "",
      githubUsername: "",
    },
    validationSchema: Yup.object({
      file: Yup.mixed()
        .required("File is required")
        .test(
          "filesize",
          "File size is too large",
          (value) => value && value.size <= 2 * 1024 * 1024 // 2MB limit
        )
        .test(
          "filetype",
          "Unsupported file type",
          (value) => value && ["image/jpeg", "image/png"].includes(value.type)
        ),
      name: Yup.string()
        .min(4, "Full name should be at least 4 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted with values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="input-containers upload-container">
        {preview ? (
          <>
            <img className="uploaded-image" src={preview} alt="Uploaded preview" />
            <div className="btn-container">
              <button type="button" onClick={handleRemove}>
                Remove Image
              </button>
              <label htmlFor="file">Change Image</label>
              <input
                type="file"
                name="file"
                id="file"
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </div>
          </>
        ) : (
          <>
            <h2>Upload Avatar</h2>
            <label htmlFor="file">
              <img src={uploadIcon} alt="Upload icon" />
            </label>
            <input
              id="file"
              name="file"
              type="file"
              onChange={handleChange}
              accept="image/*"
              style={{ display: "none" }}
            />
            <p>Drag and drop or click to upload</p>
          </>
        )}
      </div>

      {formik.errors.file && formik.touched.file ? (
        <p className="upload-message" style={{ color: "#e76868" }}>
          <img src={infoIcon} alt="Info icon" />
          Upload your photo (JPG or PNG, max size: 2MB)
        </p>
      ) : (
        <p className="upload-message">
          <img src={infoIcon} alt="Info icon" />
          Upload your photo (JPG or PNG, max size: 2MB)
        </p>
      )}

      <div className="input-containers">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name && (
        <p className="upload-message" style={{ color: "#e76868" }}>
          <img src={infoIcon} alt="Info icon" />
          Please enter a valid email address
        </p>
      )}
      </div>

      <div className="input-containers">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.errors.email && formik.touched.email&& (
        <p className="upload-message" style={{ color: "#e76868" }}>
          <img src={infoIcon} alt="Info icon" />
          Please enter a valid email address
        </p>
      )}
      </div>

      <div className="input-containers">
        <label htmlFor="githubUsername">GitHub Username</label>
        <input
          id="githubUsername"
          name="githubUsername"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.githubUsername}
        />
        {/* No validation is applied to GitHub username */}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormContainer;
