// import * as React from "react";
// import { useEffect, useState } from "react";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Box from "@mui/material/Box";
// import Stack from "@mui/material/Stack";
// // import OrderDetails from "../OrderDetails";
// import TextField from "@mui/material/TextField";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import BootstrapSwitchButton from "bootstrap-switch-button-react";
// import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
// import Swal from "sweetalert2";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import ClearIcon from "@mui/icons-material/Clear";
// import axios from "axios";
// import { baseUrl } from "../../features/Api/BaseUrl";
// import moment from "moment";

// export default function UserList() {
//   const navigate = useNavigate();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [rows, setRows] = useState([]);
//   const [filterValue, setFilterValue] = useState("");
//   const [searchApiData, setSearchApiData] = useState([]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const getdataList = () => {
//     axios
//       .get(`${baseUrl}getAllJobs `)
//       .then((response) => {
//         console.log(response.data.All_jobs);
//         setRows(response.data.All_jobs);
//         // setSearchApiData(response.data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//         // <OrderDetails />;
//       });
//   };

//   useEffect(() => {
//     getdataList();
//   }, []);

//   const deleteUser = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.value) {
//         deleteApi(id);
//       }
//     });
//   };

//   const deleteApi = (id) => {
//     let deleteId = id;
//     axios
//       .delete(`${baseUrl}deleteJob/${deleteId}`)
//       .then((response) => {
//         Swal.fire("Deleted!", "Your file has been deleted.", "success");
//         getdataList();
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const filterData = (event) => {
//     if (event.target.value == "") {
//       setRows(newData);
//     }

//     const newData = rows.filter((item) => {
//       const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
//       const emailMatches = item.email.toLowerCase();
//       const searchValue = event.target.value.toLowerCase();

//       // Check if the full name, last name, or email includes the search value
//       return (
//         fullName.includes(searchValue) || emailMatches.includes(searchValue)
//       );
//     });
//     setRows(newData);
//   };

//   const dataActiveInactive = (id, data) => {
//     console.log(id, data);
//     axios
//       .post(`${baseUrl}status`, {
//         visitorId: id,
//       })
//       .then((response) => {
//         console.log(response);
//         console.log(response.data.success);
//         if (data == 1) {
//           Swal.fire("Status!", "Deactivate.", "success");
//           getdataList();
//         } else {
//           Swal.fire("Status!", "Activate.", "success");
//           getdataList();
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   const handleFilter = (event) => {
//     if (event.target.value === "") {
//       setRows(searchApiData);
//     } else {
//       const filterResult = searchApiData.filter((item) => {
//         const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
//         const emailMatches = item.email.toLowerCase();
//         const searchValue = event.target.value.toLowerCase();

//         // Check if the full name, last name, or email includes the search value
//         return (
//           fullName.includes(searchValue) || emailMatches.includes(searchValue)
//         );
//       });
//       setRows(filterResult);
//     }
//     setFilterValue(event.target.value);
//   };
//   const handleClearFilter = () => {
//     setFilterValue("");
//     setRows(searchApiData);
//   };
//   const truncateEmail = (email) => {
//     const maxLength = 20; // You can adjust the maximum length
//     if (email.length <= maxLength) {
//       return email;
//     } else {
//       return email.substring(0, maxLength) + "...";
//     }
//   };

//   return (
//     <div>
//       <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
//         <Typography
//           gutterBottom
//           variant="h5"
//           component="div"
//           sx={{ padding: "20px" }}
//         >
//           Users List
//         </Typography>
//         <Divider />
//         <Box height={10} />
//         <Stack direction="row" spacing={2} className="my-2 mb-2">
//           <TextField
//             sx={{ width: "25%" }}
//             label="Search"
//             id="outlined-size-small"
//             size="small"
//             value={filterValue}
//             onChange={(e) => handleFilter(e)}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   {filterValue && (
//                     <IconButton onClick={handleClearFilter} edge="end">
//                       <ClearIcon />
//                     </IconButton>
//                   )}
//                 </InputAdornment>
//               ),
//             }}
//           />
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1 }}
//           ></Typography>{" "}
//         </Stack>
//         <Box height={10} />
//         <TableContainer style={{ overflowX: "auto" }}>
//           <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="left" style={{ minWidth: "150px" }}>
//                   S. No.
//                 </TableCell>

//                 <TableCell align="left" style={{ minWidth: "150px" }}>
//                   Title
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Name
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "100px" }}>
//                   Salary
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "85px" }}>
//                   Resume
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "95px" }}>
//                   Date
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "60px" }}>
//                   View
//                 </TableCell>
//                 <TableCell align="left" style={{ minWidth: "70px" }}>
//                   Action
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, i) => {
//                   console.log(row.Identify_document);

//                   return (
//                     <TableRow
//                       hover
//                       role="checkbox"
//                       tabIndex={-1}
//                       key={row.code}
//                     >
//                       <TableCell align="left">{i + 1}</TableCell>
//                       <TableCell align="left">{row.job_Heading}</TableCell>
//                       <TableCell align="left">
//                         {truncateEmail(row.adminName)}
//                       </TableCell>
//                       <TableCell align="center">
//                         {row.Salary ? row.Salary : "_"}
//                       </TableCell>
//                       {/* <TableCell align="left">
//                         {row.Salary ? row.Salary : "_"}
//                       </TableCell> */}
//                       <TableCell align="left">
//                         {row.createdAt
//                           ? moment(row.createdAt).format("LL")
//                           : "_"}
//                       </TableCell>
//                       <TableCell align="center">
//                         {row.Identify_document ? (
//                           <a
//                             href={
//                               "http://suppr.me/identification/" +
//                               row.Identify_document
//                             }
//                             target="Loading Pdf file"
//                             rel="noreferrer"
//                           >
//                             <PictureAsPdfIcon />
//                           </a>
//                         ) : (
//                           "_"
//                         )}
//                       </TableCell>
//                       <TableCell align="left">
//                         {
//                           <VisibilityIcon
//                             onClick={() =>
//                               navigate(
//                                 "/admin/manage-customer/customer-detail",
//                                 {
//                                   state: {
//                                     id: row.id,
//                                     response: rows,
//                                   },
//                                 }
//                               )
//                             }
//                           />
//                         }
//                       </TableCell>
//                       <TableCell align="left">
//                         <Stack spacing={2} direction="row">
//                           <DeleteIcon
//                             style={{
//                               fontSize: "20px",
//                               color: "red",
//                               cursor: "pointer",
//                             }}
//                             onClick={() => {
//                               deleteUser(row._id);
//                             }}
//                           />
//                         </Stack>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
// import "./CustomerDetails.css";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
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
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import Swal from "sweetalert2";
import { usePDF } from "react-to-pdf";

function CustomerDetails() {
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
      .get(`${baseUrl}getAppliedJob/${location.state.id}`, {
        // visitorId: getData.id,
      })
      .then((responce) => {
        console.log(responce.data.appliedJobDetails);
        setRows(responce.data.appliedJobDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    bookingHistory();
  }, []);

  const deleteUser = (id) => {
    alert(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = (id) => {
    let deleteId = id;
    axios
      .delete(`${baseUrl}deleteJob/${deleteId}`)
      .then((response) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        bookingHistory();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  return (
    <>
      <div ref={targetRef}>
        <div className="container emp-profile">
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
                        {getData.job_Desciption ? (
                          <p>{getData.job_Desciption}</p>
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
          <div>
            <h6>Total apply jobs</h6>
            <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
              <Divider />

              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        S. No.
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Name
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Title
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "100px" }}>
                        Salary
                      </TableCell>

                      <TableCell align="left" style={{ minWidth: "95px" }}>
                        Date
                      </TableCell>
                      <TableCell align="left" style={{ minWidth: "60px" }}>
                        Resume
                      </TableCell>
                      {/* <TableCell align="left" style={{ minWidth: "100px" }}>
                    Action
                  </TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.length > 0 ? (
                      rows.map((row, i) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          <TableCell align="left"> {i + 1} </TableCell>
                          <TableCell align="left"> {row.userName} </TableCell>
                          <TableCell align="left">{row.job_Heading}</TableCell>
                          <TableCell align="center">{row.Salary}</TableCell>
                          <TableCell align="left">
                            {moment(row.createdAt).format("LLL")}
                          </TableCell>
                          <TableCell align="left">
                            {row.uploadResume ? (
                              <a
                                href={
                                  "http://192.168.1.43:2001/" + row.uploadResume
                                }
                                target="Loading Pdf file"
                                rel="noreferrer"
                              >
                                <PictureAsPdfIcon />
                              </a>
                            ) : (
                              "_"
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          No Jobs Apply
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>

      <div className="invoice-buttons text-right mt-3">
        {" "}
        <a onClick={() => toPDF()} className="btn_invoice btn-primary mr-2">
          Download
        </a>
      </div>
    </>
  );
}

export default CustomerDetails;
