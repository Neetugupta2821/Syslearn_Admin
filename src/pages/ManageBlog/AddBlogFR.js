import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

export default function AddBlogFR() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [values, setValues] = useState([]);
  const [inputData, setInputData] = useState({
    jobTitle: "",
    description: "",
  });
  const [blogErr, setBlogErr] = useState(false);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const submitInputdata = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitAllData = () => {
    // Reset the error state
    setBlogErr({
      jobTitle: false,
      selectedImage: false,
      description: false,
    });

    // Validate the input fields
    if (!inputData.jobTitle) {
      setBlogErr((prevState) => ({ ...prevState, jobTitle: true }));
    }
    if (!selectedImage) {
      setBlogErr((prevState) => ({ ...prevState, selectedImage: true }));
    }
    if (!inputData.description) {
      setBlogErr((prevState) => ({ ...prevState, description: true }));
    }

    // If any field is empty, stop the submission
    if (!inputData.jobTitle || !selectedImage || !inputData.description) {
      return;
    }

    // If all fields are filled out, proceed with the form submission
    const formData = new FormData();
    formData.append("blogImage", selectedImage);
    formData.append("blog_Heading_fr", inputData.jobTitle);
    formData.append("blog_Desciption_fr", inputData.description);

    axios
      .post(`${baseUrl}createBlog_fr/${localStorage.getItem("id")}`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Blog created successfully!", "success");
        navigate("/admin/Blog-list-french");

        setBlogErr(false);
        // Reset the form fields and error state after successful submission
        setSelectedImage(null);
        setInputData({
          jobTitle: "",
          selectedImage: "",
          description: "",
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "Error",
          `${error?.response?.data?.blogExistanceMessage}`,
          "error"
        );
      });
  };
  return (
    <>
      {/* Add new Job in French*/}
      <div className="container">
        <div className="header-div">
          <span>
            <i className="fas fa-users"></i>
          </span>
          <span>New Blog Add</span>
        </div>
        <div className="row row-style">
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  name="jobTitle"
                  value={inputData.jobTitle}
                  onChange={submitInputdata}
                  label="Heading"
                  size="normal"
                />
              </div>

              <span style={{ color: "red" }}>
                {blogErr && !inputData.jobTitle
                  ? "*Please Enter Your Heading"
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <h6 className=" mb-0">Upload Image</h6>
                <TextField
                  type="file"
                  //   label="Upload"
                  className="mb-1  w-100"
                  accept="image/*"
                  onChange={handleFileSelect}
                />
                {selectedImage && (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ height: "100px" }}
                    />
                  </div>
                )}
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !selectedImage ? "*Please upload your image" : ""}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  className="mb-1 mt-3 w-100"
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4.5}
                  type="text"
                  name="description"
                  value={inputData.description}
                  onChange={submitInputdata}
                  fullWidth
                />
              </div>
              <span style={{ color: "red" }}>
                {blogErr && !inputData.description
                  ? "*Please Enter Your Description"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center mt-2">
            <button
              type="button"
              className="global_button mb-3"
              style={{ borderRadius: "5px" }}
              onClick={submitAllData}
            >
              Submit
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
