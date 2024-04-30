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
import axios from 'axios';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import moment from "moment";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { selectClasses } from '@mui/material';
export default function MessageData() {
    const [user, setUser] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [filterValue, setFilterValue] = useState("");
    const [searchApiData, setSearchApiData] = useState([]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handlMessagedata = () => {
        axios.get(`http://13.51.205.211:2001/api/getAll_contact`).then((response) => {
            console.log(response.data.all_contact_Details)
            setUser(response.data.all_contact_Details)
            setSearchApiData(response.data.all_contact_Details)
        }).catch((error) => {
            console.log(error)
        })

    }
    useEffect(() => {
        handlMessagedata()
    }, [])

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
            .delete(`http://13.51.205.211:2001/api/delete_contactPage_details/${deleteId}`)
            .then((response) => {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                handlMessagedata()
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleFilter = (event) => {
        if (event.target.value === "") {
            setUser(searchApiData);
        } else {
            const filterResult = searchApiData.filter((item) => {
                const fullName = `${item.userName}`.toLowerCase();
                // const emailMatches = item.job_Desciption.toLowerCase();
                // const addresMatches = item.company_Address.toLowerCase();
                const searchValue = event.target.value.toLowerCase();

                // Check if the full name, last name, or email includes the search value
                return (
                    fullName.includes(searchValue) 
                     
                );
            });
            setUser(filterResult);
        }
        setFilterValue(event.target.value);
    };
    // const addJobsData = () => {
    //     navigate("/admin/add-jobs");
    // };
    const handleClearFilter = () => {
        setFilterValue("");
        setUser(searchApiData);
    };
    {/*List of All Message*/}
    return (
        <div>
            <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Messages List
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
                                    UserName
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "100px" }}>
                                    Message
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "100px" }}>
                                    Company
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "85px" }}>
                                    Subject
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "85px" }}>
                                    User Phone
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "85px" }}>
                                    User Email
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "95px", "white-space": "nowrap" }}>
                                    Job expired Date
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "95px", "white-space": "nowrap" }}>
                                    createdAt
                                </TableCell>
                                <TableCell align="left" style={{ minWidth: "60px" }}>
                                    Delete
                                </TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user
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

                                            <TableCell>{row.userName}</TableCell>
                                            <TableCell align="left">
                                                {" "}
                                                {row.message.length > 20 ? `${row.message.substring(0, 18)}...` : row.message}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.Company
                                                    ? truncateAddress(row.Company)
                                                    : "_"}
                                            </TableCell>
                                            <TableCell align="left">{row.Subject}</TableCell>

                                            <TableCell align="left">{row.user_phone}</TableCell>
                                            <TableCell align="center">
                                                {row.user_Email}
                                            </TableCell>
                                            <TableCell align="center">
                                                {row.user_phone}
                                            </TableCell>
                                            <TableCell align="center">
                                                {moment(row.createdAt).format("MMM Do YY")}
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

                                                </Stack>
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
                    count={user.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}
