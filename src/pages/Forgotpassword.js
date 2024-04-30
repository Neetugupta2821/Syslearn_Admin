import React, { useState } from "react";
// import "./Login.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { baseUrl } from "../features/Api/BaseUrl";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const defaultState = {
  email: "",
};
function Forgotpassword() {
  const [state, setState] = useState(defaultState);
  const [emailErr, setEmailErr] = useState("");
  const [forgotErr, setForgotErr] = useState(false);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  const navigate = useNavigate();
  const forgotPassword = () => {
    navigate("/forgot-password");
  };

  const forgotPass = (event) => {
    const { name, value } = event.target;

    console.log(name, value);

    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitData = (e) => {
    console.log(state);
    console.log(state.email);
    if (state.email == "") {
      setForgotErr(true);
    } else {
      setForgotErr(false);

      axios
        .post(`${baseUrl}forgetPassOTP `, {
          email: state.email,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            const forgotToken = response.data.token;
            localStorage.setItem("token", forgotToken);
            Swal.fire(
              "Check your email a password reset email was sent!",
              "You clicked the button!",
              "success"
            );
            navigate("/otp-generate");
          }
        })
        .catch((error) => {
          console.log(error);
          setError({
            errors: error,
            isError: true,
          });
          // handdale error in proper way
        });
    }

    // if (state.email == "mobappssolutions160@gmail.com") {
    //   setEmailErr("Check your email a password reset email was sent");
    // } else {
    //   setEmailErr("please Enter Valid Email Address");
    // }
  };
  return (
    <>
      <div>
        <div class="wrapper">
          <div class="container-style">
            <div class="col-left">
              <div class="login-text">
                <h2>
                  {" "}
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
            <div class="col-right">
              <div class="login-form">
                <h2>Forgot Password ?</h2>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "rgb(117, 117, 117)",
                  }}
                >
                  Enter your email to recover your password
                </p>
                <p>
                  <span style={{ color: "red" }}>
                    {forgotErr ? "Please enter your Email address!" : " "}
                  </span>
                  <TextField
                    fullWidth
                    classNameName="mb-1 mt-3 w-100"
                    label="Email"
                    name="email"
                    type="text"
                    autoComplete="off"
                    onChange={forgotPass}
                    value={state.email}
                    size="normal"
                  />
                  <span style={{ color: "red" }}>
                    {error.isError
                      ? error.errors?.response?.data?.message
                      : " "}
                  </span>
                </p>

                <p>
                  <Button
                    variant="contained"
                    className="global_button"
                    onClick={submitData}
                  >
                    Send Otp
                  </Button>
                </p>
              </div>
            </div>
          </div>
          <div class="credit"></div>
        </div>
      </div>
    </>
  );
}

export default Forgotpassword;
