import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../features/Api/BaseUrl";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
  image: "",
};

const MyProfile = () => {
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const adminId = localStorage.getItem("id");
  console.log(adminId);
  const navigate = useNavigate();
  const [state, setState] = useState(defaultState);
  const [selectedImage, setSelectedImage] = useState("");
{/*Api for Get the Admin data */}
  const adminProfile = () => {
    axios
      .get(`${baseUrl}getAdmin/${adminId}`)
      .then((response) => {
        console.log(response.data.Admin_Details);
        setState((prevData) => ({
          ...prevData,
          firstName: response.data.Admin_Details.firstName,
          lastName: response.data.Admin_Details.lastName,
          email: response.data.Admin_Details.email,
          image: response.data.Admin_Details.profileImage,
        }));
        localStorage.setItem("name", response.data.Admin_Details.firstName);
        localStorage.setItem("image", response.data.Admin_Details.profileImage);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    adminProfile();
  }, []);

  const imageFunction = (event) => {
    setSelectedImage(event.target.files[0]);
    setState({ ...state, image: event.target.files[0].name });
  };

  const submitData = (event) => {
    console.log(selectedImage);
    const { name, value } = event.target;

    console.log(name, value);
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitFormData = () => {
    const bodyFormData = new FormData();

    // Create a File object with the selected image
    const file = new File([selectedImage], state.image, {
      type: "image/jpeg",
    });

    // Append profile data to FormData
    bodyFormData.append("firstName", state.firstName);
    bodyFormData.append("lastName", state.lastName);
    bodyFormData.append("email", state.email);

    // Append image file to FormData
    bodyFormData.append("profileImage", file);

    axios
      .post(`${baseUrl}updateAdminProfile/${adminId}`, bodyFormData)
      .then((response) => {
        console.log(response);
        Swal.fire(
          "Profile update successfully!",
          "You clicked the button!",
          "success"
        );
        navigate("/admin", { state: { dataValue: state } });
        adminProfile();
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  console.log(state, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>111");
  return (
    <>
      <div class=" bg-white m-0 p-0 ">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              {selectedImage ? (
                <img
                  alt="not found"
                  class="rounded-circle mt-5"
                  width="150px"
                  height="150px"
                  src={URL.createObjectURL(selectedImage)}
                />
              ) : (
                <img
                  alt="not found"
                  class="rounded-circle mt-5"
                  width="150px"
                  src={"http://13.51.205.211:2001/" + state.image}
                  defaultState={state.image}
                />
              )}
              <div style={{ marginStart: "10px" }}>
                <input
                  style={{ margin: "5px 0px 0px 50px" }}
                  className="mb-2  w-100 hidden "
                  type="file"
                  name="image"
                  defaultValue={state.image}
                  onChange={(event) => {
                    imageFunction(event);
                  }}
                />
              </div>
            </div>
          </div>
          <div class="col-md-9 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right " style={{ color: "#000000" }}>
                  {" "}
                  My Profile{" "}
                </h4>
              </div>
              <div class="form-outline mb-4">
                <TextField
                  fullWidth
                  label=" first Name"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="firstName"
                  value={state.firstName}
                />
                {/* <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors?.response?.data?.errors[0]?.msg
                    : " "}
                </span> */}
              </div>
              <div class="form-outline mb-4">
                <TextField
                  fullWidth
                  label="last Name"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="lastName"
                  value={state.lastName}
                />
                {/* <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors?.response?.data?.errors[1]?.msg
                    : " "}
                </span> */}
              </div>
              <div class="form-outline mb-4">
                <TextField
                  fullWidth
                  label="Email"
                  id="fullWidth"
                  autoComplete="off"
                  onChange={submitData}
                  name="email"
                  value={state.email}
                />
                {/* <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors?.response?.data?.errors[2]?.msg
                    : " "}
                </span> */}
              </div>
              <div class="mt-3 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitFormData}
                >
                  Update
                  <ArrowRightAltIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
