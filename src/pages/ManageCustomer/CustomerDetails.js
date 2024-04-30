import React, { useEffect, useState } from "react";
import "./CustomerDetails.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import moment from "moment";
import { usePDF } from "react-to-pdf";

import { useLocation } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { baseUrl } from "../../features/Api/BaseUrl";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Divider from "@mui/material/Divider";
import StarsIcon from "@mui/icons-material/Stars";
function CustomerDetails() {
  const [invoiceValue, setInvoiceValue] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [rating, setRating] = useState("");

  const location = useLocation();
  console.log(location.state.response);
  const selectedUser = location.state.response.filter((item) => {
    return item._id === location.state.id;
  });

  const getData = selectedUser[0];
  console.log(getData);
  const bookingHistory = () => {
    axios
      .get(`${baseUrl}getAppliedJob/${location.state.id}`) 
      .then((responce) => {
        console.log(responce);
        setRows(responce.data.appliedJobDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    bookingHistory();
  }, []);
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <>
    {/*Detail of clicked job [English]*/}
      <div className="container emp-profile" ref={targetRef}>
        <form method="post">
          <div className="row">
            <div className="col-md-12">
              <div className="profile-head">
                <h5>
                  {getData.first_name} {getData.last_name}{" "}
                </h5>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Job Details
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Job Id</label>
                    </div>
                    <div className="col-md-6">
                      {getData._id ? <p>{getData._id}</p> : <p>_</p>}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Admin Name</label>
                    </div>
                    <div className="col-md-6">
                      {getData.adminName ? (
                        <p>{getData.adminName}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Admin Email</label>
                    </div>
                    <div className="col-md-6">
                      {getData.admin_email ? (
                        <p>{getData.admin_email}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label> Job Heading</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_Heading ? (
                        <p>{getData.job_Heading}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label> Job Description</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_Description ? (
                        <p>{getData.job_Description}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label> Company Address</label>
                    </div>
                    <div className="col-md-6 mb-2">
                      {getData.company_Address ? (
                        <p>{getData.company_Address}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label> Salary</label>
                    </div>
                    <div className="col-md-6">
                      {getData.Salary ? <p>{getData.Salary}</p> : <p>_</p>}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>createdAt</label>
                    </div>
                    <div className="col-md-6">
                      {getData.createdAt ? (
                        <p>{getData.createdAt}</p>
                      ) : (
                        <p>_</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>job_status</label>
                    </div>
                    <div className="col-md-6">
                      {getData.job_status == "0" ? (
                        <p
                          className="mb-2 mr-2 badge "
                          style={{
                            color: "#ffffff",
                            backgroundColor: "#29cc97",
                          }}
                        >
                          InActive
                        </p>
                      ) : (
                        <p
                          className="mb-2 mr-2 badge "
                          style={{
                            color: "#ffffff",
                            backgroundColor: "red",
                          }}
                        >
                          Active
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="ms-invoice-table table-responsive mt-5">
          <h6>Total apply jobs List</h6>
          <table className="table table-hover text-right thead-light">
            <thead>
              <tr className="text-capitalize">
                <th className="text-center w-5 common_style">S. No.</th>
                <th className="text-left common_style">Name</th>
                <th className="common_style">User Email</th>
                <th className="common_style">Phone No</th>
                <th className="common_style"> Date</th>
                <th className="common_style"> Resume</th>
              </tr>
            </thead>
            <tbody>
              {rows.length > 0 ? (
                rows.map((row, i) => (
                  <tr key={i}>
                    <td className="text-center common_style">{i + 1}</td>
                    <td className="text-left common_style">{row.userName}</td>
                    <td className="common_style">{row.user_Email}</td>
                    <td className="common_style">{row.phone_no}</td>
                    <td className="common_style">
                      {moment(row.createdAt).format("LLL")}
                    </td>
                    <td className="common_style">
                      {row.uploadResume ? (
                        <a
                          href={"http://13.51.205.211:2001/" + row.uploadResume}
                          target="Loading Pdf file"
                          rel="noreferrer"
                        >
                          <PictureAsPdfIcon />
                        </a>
                      ) : (
                        "_"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6"><h3>No Jobs Apply</h3></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="invoice-buttons text-right">
        {" "}
        <a onClick={() => toPDF()} className="btn_invoice btn-primary mr-2">
          Download pdf
        </a>
      </div>
    </>
  );
}

export default CustomerDetails;
