import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../features/Api/BaseUrl";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useLocation } from "react-router-dom";

 

export default function EditBlogFR() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);
    const [defaultImage, setDefaultImage] = useState(""); 
    
  const [inputData, setInputData] = useState({
    jobTitle: "",
    description: "",
  });
  const [blogErr, setBlogErr] = useState(false);
  const location = useLocation();
  const updateData = () => {
    console.log(location.state.response);
    const selectedUser = location.state.response.filter((item) => {
      return item._id === location.state.id;
    });
    const getData = selectedUser[0];

    console.log(
      getData.blog_Heading,
      getData.blogImage,
      getData.blog_Desciption,
      inputData
    );
    setInputData({
      jobTitle: getData.blog_Heading_fr || "",
      description: getData.blog_Desciption_fr || "",
    });
    setDefaultImage(`http://192.168.1.43:2001/${getData.blogImage_fr}` || "");
  };

  useEffect(() => {
    updateData();
  }, []);
  console.log(selectedImage, inputData);
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

    if (selectedImage && defaultImage) {
      // Validate that only one of selectedImage or defaultImage is present
      setBlogErr((prevState) => ({ ...prevState, selectedImage: false }));
    }

    if (!selectedImage && !defaultImage) {
      // Validate that at least one of selectedImage or defaultImage is present
      setBlogErr((prevState) => ({ ...prevState, selectedImage: true }));
    }

    if (!inputData.description) {
      setBlogErr((prevState) => ({ ...prevState, description: true }));
    }

    // If any field is empty, stop the submission
    if (
      !inputData.jobTitle ||
      (!selectedImage && !defaultImage) ||
      !inputData.description
    ) {
      return;
    }

    // If all fields are filled out, proceed with the form submission
    const formData = new FormData();

    // Append the selected image if it exists
    if (selectedImage) {
      formData.append("blogImage", selectedImage);
    } else if (defaultImage) {
      // If selected image doesn't exist, append the default image
      // You may want to add a check here to ensure defaultImage is not an empty string
      formData.append("blogImage", defaultImage);
    }

    formData.append("blog_Heading_fr", inputData.jobTitle);
    formData.append("blogDescription_fr", inputData.description);

    axios
      .put(`${baseUrl}updateBlog_fr/${location.state.id}`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Blog update successfully!", "success");
        navigate("/admin/Blog-list-french");

        setBlogErr(false);
        // Reset the form fields and error state after successful submission
        setSelectedImage(null);
        setInputData({
          jobTitle: "",
          selectedImage: "",
          description: "",
        });
        setDefaultImage("");
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
    {/*Edit Clicked blog[French]*/}
      <div className="container">
        <div className="header-div">
          <span>
            <i className="fas fa-users"></i>
          </span>
          <span>Edit Blog </span>
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
                {selectedImage ? (
                  <div className="image-preview">
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected"
                      style={{ height: "100px" }}
                    />
                  </div>
                ) : (
                  <div className="image-preview">
                    <img
                      src={defaultImage}
                      alt="Default"
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
              Update
              <ArrowRightAltIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
