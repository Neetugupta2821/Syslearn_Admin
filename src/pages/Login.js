import React, { useState } from "react";
import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const defaultState = {
  email: "",
  password: "",
};

function Login() {
  const navigate = useNavigate();

  const [state, setState] = useState(defaultState);
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const loginApproved = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the API call starts
    axios
      .post(`${baseUrl}login_Admin`, {
        email: state.email,
        password: state.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          const getId = response.data.data._id;
          const getName = response.data.data.firstName;
          const image = response.data.data.profileImage;
          const email = response.data.data.email;
          localStorage.setItem("id", getId);
          localStorage.setItem("name", getName);
          localStorage.setItem("image", image);
          Swal.fire(
            "Admin login successfully!",
            "You clicked the button!",
            "success"
          );
          navigate("/admin");
        }
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      })
      .finally(() => {
        setLoading(false); // Set loading to false when the API call is complete
      });
  };

  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <>
      <div>
        <div className="wrapper">
          <div className="container-style">
            <div className="col-left">
              <div className="login-text">
                <h2>
                  <img
                    src="logo.png"
                    className="festabash-l0go mb-3"
                    style={{ width: "50px" }}
                    alt=""
                  />
                </h2>
                <p>
                  <img
                    src="logo1.png"
                    className="festabash-l0go mb-3"
                    style={{ width: "100px" }}
                    alt=""
                  />
                </p>
              </div>
            </div>
            <div className="col-right">
              <div className="login-form">
                <h2>Admin</h2>
                <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors?.response?.data?.EmailMessage
                    : " "}
                </span>
                <p>
                  <TextField
                    fullWidth
                    className="mb-1 mt-3 w-100 "
                    label="Email"
                    name="email"
                    type="text"
                    error={false}
                    autoComplete="off"
                    onChange={loginApproved}
                    value={state.email}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors.response.data.emailExistanceMessage
                      : " "}
                  </span>
                </p>
                <span style={{ color: "red" }}>
                  {error.isError
                    ? error.errors.response.data.passwordMessage
                    : " "}
                </span>
                <p>
                  <TextField
                    fullWidth
                    classNameName="mb-1 mt-3 w-100"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={loginApproved}
                    value={state.password}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors.response.data.passwordExistanceMessage
                      : " "}
                  </span>
                </p>
                <p>
                  <Button
                    variant="contained"
                    className="global_button"
                    onClick={submitData}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </p>

                <div className="text-center mt-3">
                  <span style={{ cursor: "pointer" }} onClick={forgotPassword}>
                    Forgot password?{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="credit"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
