import { useFormik } from "formik";
import * as Yup from "yup";

const FormContainer = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
      name: "",
      email: "",
      githubUsername: "", // If this isn't required, you can leave it as an empty string.
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
      <div className="input-containers">
        <label htmlFor="file">Upload File</label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(event) => {
            formik.setFieldValue("file", event.currentTarget.files[0]);
          }}
        />
        {formik.errors.file && formik.touched.file && (
          <div>{formik.errors.file}</div>
        )}
      </div>

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
          <div>{formik.errors.name}</div>
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
        {formik.errors.email && formik.touched.email && (
          <div>{formik.errors.email}</div>
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
        {/* No validation is applied to GitHub username in this example */}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default FormContainer;
