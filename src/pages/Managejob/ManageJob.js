import React from 'react'
import { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
// import OrderDetails from "../OrderDetails";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import moment from "moment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";

export default function ManageJob() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const addJobsData = () => {
    navigate("/admin/Add-job-franch");
  };
  const getdataList = () => {
    axios
      .get(`${baseUrl}/getAllJobs_fr`)
      .then((response) => {
        console.log(response.data.All_jobs_fr);
        setRows(response.data.All_jobs_fr);

        setSearchApiData(response.data.All_jobs_fr);
      })
      .catch((error) => {
        console.log(error);
        // <OrderDetails />;
      });
  };

  useEffect(() => {
    getdataList();
  }, []);
  const truncateAddress = (address) => {
    const maxLength = 20; // You can adjust the maximum length
    if (address.length <= maxLength) {
      return address;
    } else {
      return address.substring(0, maxLength) + "...";
    }
  };
  const deleteUser = (id) => {
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
      .delete(`${baseUrl}deleteJob_fr/${deleteId}`)
      .then((response) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getdataList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) => {
        const fullName = `${item.job_Heading_fr}`.toLowerCase();
        // const emailMatches = item.job_Desciption.toLowerCase();
        const addresMatches = item.company_Address_fr.toLowerCase();
        const searchValue = event.target.value.toLowerCase();

        // Check if the full name, last name, or email includes the search value
        return (
          fullName.includes(searchValue) ||
          // emailMatches.includes(searchValue) ||
          addresMatches.includes(searchValue)
        );
      });
      setRows(filterResult);
    }
    setFilterValue(event.target.value);
  };
  const handleClearFilter = () => {
    setFilterValue("");
    setRows(searchApiData);
  };
  const dataActiveInactive = (id, data) => {
    console.log(id, data);
    axios
      .post(`${baseUrl}active_inactive_job/${id}`)
      .then((response) => { 
        console.log(response);
        console.log(response.data.success);
        if (data === 1) { // Deactivate when data is 1
          Swal.fire("Status!", "DeActivate.", "success");
          getdataList();
        } else { // Activate when data is 0
          Swal.fire("Status!", "Activate.", "success");
          getdataList();
        }
      })
      .catch((error) => {
        console.log(error);
      });
};
  return (
    <div>
      {/* List of All Job[French]*/}
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Jobs List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search"
            id="outlined-size-small"
            size="small"
            value={filterValue}
            onChange={(e) => handleFilter(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {filterValue && (
                    <IconButton onClick={handleClearFilter} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Button
            className="global_button"
            variant="contained"
            endIcon={<AddCircleIcon />}
            onClick={addJobsData}
          >
            Add Job
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow style={{ "white-space": "nowrap" }}>
                <TableCell align="left" style={{ minWidth: "80px" }}>
                  S. No.
                </TableCell>
                <TableCell align="left" style={{ minWidth: "150px" }}>
                  Heading
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Description
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Address
                </TableCell>
                <TableCell align="left" style={{ minWidth: "85px" }}>
                  Salary
                </TableCell>
                <TableCell align="left" style={{ minWidth: "85px" }}>
                  Job Image
                </TableCell>
                <TableCell align="left" style={{ minWidth: "85px" }}>
                  Job Experience
                </TableCell>
                <TableCell align="left" style={{ minWidth: "95px", "white-space": "nowrap" }}>
                  CreatedAt
                </TableCell>
                <TableCell align="left" style={{ minWidth: "95px", "white-space": "nowrap" }}>
                  Job expired Date
                </TableCell>
                <TableCell align="left" style={{ minWidth: "60px" }}>
                  View
                </TableCell>
                <TableCell align="left" style={{ minWidth: "70px" }}>
                  Action
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Active/Inactive
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows && rows.length > 0 && rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  console.log(row.Identify_document);

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}

                    >
                      <TableCell align="left">{i + 1}</TableCell>

                      <TableCell>{row.job_Heading_fr}</TableCell>
                      <TableCell align="left">
                        {" "}
                        {row.job_Description_fr.length > 20 ? `${row.job_Description_fr.substring(0, 18)}...` : row.job_Description_fr}
                      </TableCell>
                      <TableCell align="center">
                        {row.company_Address_fr
                          ? truncateAddress(row.company_Address_fr)
                          : "_"}
                      </TableCell>
                      <TableCell align="left">{row.Salary_fr}</TableCell>
                      <TableCell align="left">
                        {row.JobImage ? (
                          <img
                            src={"http://13.51.205.211:2001/" + row.JobImage_fr}
                            alt="loading"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="loading"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        )}</TableCell>
                      <TableCell align="left">{row.Job_Experience_fr}</TableCell>
                      <TableCell align="center">
                        {moment(row.createdAt).format("MMM Do YY")}
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.job_expired_Date_fr).format("MMM Do YY")}
                      </TableCell>
                      <TableCell align="left">
                        {
                          <VisibilityIcon
                            onClick={() =>
                              navigate("/admin/jobs-Detail-French", {
                                state: {
                                  id: row._id,
                                  response: rows,
                                },
                              })
                            }
                          />
                        }
                      </TableCell>
                      <TableCell align="left">
                        <Stack spacing={2} direction="row">
                          <DeleteIcon
                            style={{
                              fontSize: "20px",
                              color: "red",
                              cursor: "pointer",
                            }}
                          onClick={() => {
                            deleteUser(row._id);
                          }}
                          />
                          <EditLocationAltIcon
                            style={{
                              fontSize: "20px",
                              color: "#572131",
                              cursor: "pointer",
                            }}
                            onClick={() =>
                              navigate("/admin/edit-jobs-French", {
                                state: {
                                  id: row._id,
                                  response: rows,
                                },
                              })
                            }
                          />
                        </Stack>
                      </TableCell>

                      <TableCell align="left">
                        {
                          <BootstrapSwitchButton
                            width={100}
                            checked={Boolean(row.job_status_fr)}
                            onlabel="Active"
                            offlabel="Inactive"
                            onstyle="success"
                          onChange={() => {
                            dataActiveInactive(row._id, row.job_status_fr);
                          }}
                          />
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
