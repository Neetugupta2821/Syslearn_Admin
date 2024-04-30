import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import axios from "axios";
import "./AddJobs.css";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { baseUrl } from "../../features/Api/BaseUrl";
function AddJobs() {
  const navigate = useNavigate();

  const [values, setValues] = useState([]);
  const [jobErr, setJobErr] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [age, setAge] = useState("");
  const adminId = localStorage.getItem("id");
  console.log(adminId);
  useEffect(() => {
    axios
      .get("http://18.117.217.61:5000/api/get/category")
      .then((response) => {
        console.log(response.data);
        setValues(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [inputData, setInputData] = useState({
    jobTitle: "",
    location: "",
    description: "",
    salary: "",
    publicationDate: "",
    Job_Experience: " ",
    JobImage: ""
  });

  let name, value;

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };
  const submitInputdata = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;
    setInputData({ ...inputData, [name]: value });
  };

  const submitAllData = () => {
    // Validate the form fields
    setJobErr({
      jobTitle: false,
      location: false,
      description: false,
      salary: false,
      publicationDate: false,
      Job_Experience: false,
      JobImage: false
    });
    
    // Validate the input fields
    if (!inputData.jobTitle) {
      setJobErr((prevState) => ({ ...prevState, jobTitle: true }));
    }
    if (!selectedImage) {
      setJobErr((prevState) => ({ ...prevState, selectedImage: true }));
    }
    if (!inputData.description) {
      setJobErr((prevState) => ({ ...prevState, description: true }));
    }
    if (!inputData.location) {
      setJobErr((prevState) => ({ ...prevState, location: true }));
    }
    if (!inputData.salary) {
      setJobErr((prevState) => ({ ...prevState, salary: true }));
    }
    if (!inputData.publicationDate) {
      setJobErr((prevState) => ({ ...prevState, publicationDate: true }));
    }
    if (!inputData.Job_Experience) {
      setJobErr((prevState) => ({ ...prevState, Job_Experience: true }));
    }

    // If any field is empty, stop the submission
    if (!inputData.jobTitle || !selectedImage || !inputData.description || !inputData.salary || !inputData.publicationDate || !inputData.Job_Experience || !inputData.location) {
      return;
    }
    const formData = new FormData();
    formData.append("JobImage", selectedImage);
    formData.append("job_Heading", inputData?.jobTitle);
    formData.append("company_Address", inputData?.location);
    formData.append("job_Desciption", inputData?.description);
    formData.append("Salary", inputData?.salary);
    formData.append("job_expired_Date", inputData?.publicationDate);
    formData.append("Job_Experience", inputData?.Job_Experience);

    // Perform additional validation if needed

    // If all validations pass, proceed with the API call
    axios
      .post(`${baseUrl}createJob/${adminId}`, formData)
      .then((response) => {
        console.log(response);
        Swal.fire("Success", "Job added successfully!", "success");
        navigate("/admin/jobs-list");
        setJobErr(false)
        setSelectedImage(null);
        setInputData({
          jobTitle: "",
          location: "",
          description: "",
          salary: "",
          publicationDate: "",
          Job_Experience: " ",
          JobImage: ""
        })
      })
      .catch((error) => {
        console.log(error);
        Swal.fire("Error", `${error?.response?.data?.message}`, "error");
      });
  };
  console.log({
    jobTitle: "",
    location: "",
    description: "",
    salary: "",
    publicationDate: "",
    Job_Experience: "",
    JobImage: "",
  })
  return (
    <>{/* Form for Add new job [English]*/}
      <div className="container">
        <div className="header-div">
          <span>
            <i class="fas fa-users"></i>
          </span>
          <span>New Job Add</span>
        </div>
        <div className="row row-style">
          <div className="col-12 d-flex justify-content-center image-div"></div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  label="Title"
                  name="jobTitle"
                  value={inputData.jobTitle}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.jobTitle
                  ? "*Please Enter  Title Value"
                  : ""}
              </span>
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  label="Job Experience"
                  name="Job_Experience"
                  value={inputData.Job_Experience}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.Job_Experience
                  ? "*Please Enter Your Job Experience"
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  label="Salary"
                  name="salary"
                  value={inputData.salary}
                  onChange={submitInputdata}
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.salary
                  ? "*Please Enter  Salary Value"
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    type="date"
                    className="w-100 mt-3"
                    onChange={(newValue) =>
                      setInputData({
                        ...inputData,
                        publicationDate: moment(newValue.$d).format(
                          "DD-MM-YYYY"
                        ),
                      })
                    }
                    label="Expired date"
                  />
                </LocalizationProvider>
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.publicationDate
                  ? "*Please Select Date"
                  : ""}
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  fullWidth
                  className="mb-1 mt-3 w-100"
                  type="text"
                  name="location"
                  value={inputData.location}
                  onChange={submitInputdata}
                  label="Address"
                  size="normal"
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.location
                  ? "*Please Enter Your Location"
                  : ""}
              </span>
              <div className="col-12 d-flex justify-content-center">
                <TextField
                  className="mb-1 mt-3 w-100"
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4.5}
                  type="file"
                  name="description"
                  value={inputData.description}
                  onChange={submitInputdata}
                  fullWidth
                />
              </div>
              <span style={{ color: "red" }}>
                {jobErr && !inputData.description
                  ? "*Please Enter Description  "
                  : ""}
              </span>
              <div className="col-12  justify-content-center">
                <h6 className=" mb-0">Upload Image</h6>
                <TextField
                  type="file"

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
                {jobErr && !selectedImage ? "*Please upload your image" : ""}
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

export default AddJobs;
