import * as React from "react";
import { useEffect, useState } from "react";
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
import InputLabel from "@mui/material/InputLabel";
import { FormControl } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import moment from "moment";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const defaultState = {
  couponName: "",
  couponCode: "",
  discountType: "",
  discountValue: "",
  startDate: "",
  endDate: "",
};
export default function ManagePromoCodeList() {
  const [error, setError] = useState({
    errors: {},
    isError: false,
  });
  const [state, setState] = useState(defaultState);

  const [isChecked, setIsChecked] = useState(0);
  const [editPromoValueId, setEditPromoValueId] = useState("");

  const [freeCouponCreate, setFreeCouponCreate] = useState(true);

  const [sting, setString] = useState("");

  const [editActivityValue, setEditActivityValue] = useState("");
  const [editActivityValueId, setEditActivityValueId] = useState("");
  const [activity, setActivity] = useState("");

  const [openEdit, setOpenEdit] = React.useState(false);

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [dataSearch, setDataSearch] = useState();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [activityErr, setActivityErr] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getdataList = () => {
    axios
      .get(`${baseUrl}promocode`)
      .then((response) => {
        console.log(response);
        setRows(response.data.promo_code);
        setSearchApiData(response.data.promo_code);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdataList();
  }, []);

  const addCustomerData = () => {
    navigate("/admin/order/add-order");
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
      .delete(`${baseUrl}promocode/ ${deleteId}`)
      .then((response) => {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getdataList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const textActivityValue = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const submitDataActivity = () => {
    console.log(state, isChecked);
    // if (activity == "") {
    //   setActivityErr(true);
    // } else {
    //   axios
    //     .post(`${baseUrl}activity`, {
    //       activity_type: activity,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       Swal.fire(
    //         "Activity added successfully!",
    //         "You clicked the button!",
    //         "success"
    //       );
    //       getdataList();
    //       setOpen(false);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
    axios
      .post(`${baseUrl}promocode`, {
        coupon_name: state.couponName,
        coupon_code: state.couponCode,
        discount_type: state.discountType,
        discount: state.discountValue,
        start_date: state.startDate,
        end_date: state.endDate,
        free_coupon: isChecked,
      })
      .then((response) => {
        console.log(response);
        Swal.fire(
          "Promo Code  added successfully!",
          "You clicked the button!",
          "success"
        );
        getdataList();
        setState({
          couponName: "",
          couponCode: "",
          discountType: "",
          discountValue: "",
          startDate: "",
          endDate: "",
        });
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
        setError({
          errors: error,
          isError: true,
        });
      });
  };

  const editActivity = (id) => {
    setOpenEdit(true);
    const filterData = rows.filter((item) => {
      return item.id == id;
    });
    console.log(filterData);
    const getData = filterData[0];
    console.log(getData.activity_type);
    setState(getData.activity_type);
    setEditPromoValueId(getData.id);

    setState(() => ({
      couponName: getData.coupon_name,
      couponCode: getData.coupon_code,
      discountType: getData.discount_type,
      discountValue: getData.discount,
      startDate: getData.start_date,
      endDate: getData.end_date,
    }));
    setIsChecked(getData.free_coupon);
    console.log(state);
  };

  const editDataUpdate = (event) => {
    setEditActivityValue(event.target.value);
  };
  const updateActivityValue = () => {
    console.log(state);
    axios
      .put(`${baseUrl}promocode`, {
        coupon_id: editPromoValueId,
        coupon_name: state.couponName,
        coupon_code: state.couponCode,
        discount_type: state.discountType,
        discount: state.discountValue,
        start_date: state.startDate,
        end_date: state.endDate,
        free_coupon: isChecked,
      })
      .then((response) => {
        console.log(response);
        Swal.fire(
          "Promo Code Update successfully!",
          "You clicked the button!",
          "success"
        );
        getdataList();
        setOpenEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleFilter = (e) => {
    if (e.target.value == "") {
      setRows(searchApiData);
    } else {
      const filterResult = searchApiData.filter((item) =>
        item.coupon_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setRows(filterResult);
    }
    setFilterValue(e.target.value);
  };

  const randomString = (string_length) => {
    var random_string = "";
    var characters =
      "ABJAJJAJAJAJAJJAJJAJAJJAJQIQIII3211344ueuririririrroririroeuhjjjk";
    for (var i, i = 0; i < string_length; i++) {
      random_string += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    setString(random_string);
    console.log(random_string);
    setState((prevState) => {
      return {
        ...prevState,
        couponCode: random_string,
      };
    });
  };

  const dataActiveInactive = (id, data) => {
    console.log(id, data);
    axios
      .post(`${baseUrl}promo-code/status`, {
        promocode_id: id,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data.success);
        if (data == 1) {
          Swal.fire("Status!", "DeActivate.", "success");
          getdataList();
        } else {
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
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "12px" }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ padding: "20px" }}
        >
          Promo Code List
        </Typography>
        <Divider />
        <Box height={10} />
        <Stack direction="row" spacing={2} className="my-2 mb-2">
          <TextField
            sx={{ width: "25%" }}
            label="Search by Coupon Name"
            id="outlined-size-small"
            size="small"
            value={filterValue}
            onChange={(e) => handleFilter(e)}
          />
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>{" "}
          <Button
            variant="contained"
            style={{
              backgroundColor: "#572131",
              borderColor: "#572131",
              color: "white",
              fontSize: "16px",
              fontWeight: "700",
            }}
            onClick={handleClickOpen}
          >
            Add Promo Code
          </Button>
        </Stack>
        <Box height={10} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  ID
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Coupon Name
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Coupon Code
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Discount(%)
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Discount type
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Action
                </TableCell>
                <TableCell align="left" style={{ minWidth: "100px" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell align="left">
                        {row.coupon_name ? row.coupon_name : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.coupon_code ? row.coupon_code : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.discount ? row.discount : "_"}
                      </TableCell>
                      <TableCell align="left">
                        {row.discount_type ? row.discount_type : "_"}
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
                              deleteUser(row.id);
                            }}
                          />
                          <EditLocationAltIcon
                            style={{
                              fontSize: "20px",
                              color: "#572131",
                              cursor: "pointer",
                            }}
                            onClick={() => {
                              editActivity(row.id);
                            }}
                          />
                        </Stack>
                      </TableCell>
                      <TableCell align="left">
                        {
                          <BootstrapSwitchButton
                            width={100}
                            checked={Boolean(row.status)}
                            onlabel="Active"
                            offlabel="Inactive"
                            onstyle="success"
                            onChange={() => {
                              dataActiveInactive(row.id, row.status);
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
      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            sx={{ width: "500px" }}
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Add Promo Code
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <TextField
                fullWidth
                label="Enter Coupon Name"
                name="couponName"
                value={state.couponName}
                onChange={textActivityValue}
                id="outlined-size-normal"
              />
              <span style={{ color: "red" }}>
                {error.isError ? error.errors.response.data?.msg1 : " "}
              </span>
            </Typography>
            <Typography gutterBottom>
              <div className="row">
                <div className="col-6">
                  <TextField
                    className="mt-3"
                    label="Enter Coupon code"
                    name="couponCode"
                    value={state.couponCode}
                    onChange={textActivityValue}
                    id="outlined-size-normal"
                  />
                </div>
                <div className="col-1 mt-3 p-0">OR</div>
                <div className="col-5">
                  <h6
                    onClick={() => randomString(6)}
                    className="mt-3 py-3 me-4 text-center"
                    style={{ backgroundColor: "#ffd333" }}
                  >
                    Generate Coupon code
                  </h6>
                </div>
                <span style={{ color: "red" }}>
                  {error.isError ? error.errors.response.data?.msg2 : " "}
                </span>
              </div>
            </Typography>
            <Typography gutterBottom>
              <h6>
                Free Coupon
                <Checkbox
                  checked={isChecked}
                  onClick={(event) => {
                    setFreeCouponCreate(!freeCouponCreate);
                    setIsChecked(event.target.checked);
                  }}
                />
              </h6>
            </Typography>

            {freeCouponCreate ? (
              <>
                <div>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      Select Discount type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="discountType"
                      value={state.discountType}
                      label=" Select Discount type"
                      onChange={textActivityValue}
                    >
                      <MenuItem disabled>Select Discount type</MenuItem>
                      <MenuItem value="fixed">Flat Discount</MenuItem>
                      <MenuItem value="percentage">%Discount</MenuItem>
                    </Select>
                  </FormControl>
                  <span style={{ color: "red" }}>
                    {error.isError ? error.errors.response.data?.msg5 : " "}
                  </span>
                </div>
                <Typography gutterBottom>
                  <TextField
                    fullWidth
                    className="mt-2"
                    label="Enter Discount Value"
                    name="discountValue"
                    value={state.discountValue}
                    onChange={textActivityValue}
                    id="outlined-size-normal"
                  />
                  <span style={{ color: "red" }}>
                    {error.isError ? error.errors.response.data?.msg6 : " "}
                  </span>
                </Typography>
              </>
            ) : (
              ""
            )}

            <Typography gutterBottom>
              <div className="row">
                <div className="col-6">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start date"
                        name="startDate"
                        onChange={(newValue) =>
                          setState({
                            ...state,
                            startDate: moment(newValue.$d).format("YYYY/MM/DD"),
                          })
                        }
                        // onChange={
                        //   (newValue) =>
                        //     setState(moment(newValue.$d).format("YYYY/MM/DD"))
                        //   //   setInputData(moment(newValue.$d).format("MM/DD/YYYY"))
                        // }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span style={{ color: "red" }}>
                    {error.isError ? error.errors.response.data?.msg3 : " "}
                  </span>
                  {/* <span style={{ color: "red" }}>
                {error.isError
                  ? error.errors.response.data.errors[1]?.msg
                  : " "}
              </span> */}
                </div>
                <div className="col-6">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="End date"
                        name="endDate"
                        onChange={(newValue) =>
                          setState({
                            ...state,
                            endDate: moment(newValue.$d).format("YYYY/MM/DD"),
                          })
                        }
                        // onChange={
                        //   (newValue) =>
                        //     setState(moment(newValue.$d).format("YYYY/MM/DD"))

                        //   //   setInputData(moment(newValue.$d).format("MM/DD/YYYY"))
                        // }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <span style={{ color: "red" }}>
                    {error.isError ? error.errors.response.data?.msg4 : " "}
                  </span>
                </div>
              </div>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={submitDataActivity}>
              Submit
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>

      <div>
        <BootstrapDialog
          onClose={handleCloseEdit}
          aria-labelledby="customized-dialog-title"
          open={openEdit}
        >
          <BootstrapDialogTitle
            sx={{ width: "500px" }}
            id="customized-dialog-title"
            onClose={handleCloseEdit}
          >
            Edit Promo Code
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <TextField
                fullWidth
                label="Enter Coupon Name"
                name="couponName"
                value={state.couponName}
                onChange={textActivityValue}
                id="outlined-size-normal"
              />
            </Typography>
            <Typography gutterBottom>
              <div className="row">
                <div className="col-6">
                  <TextField
                    className="mt-3"
                    label="Enter Coupon code"
                    name="couponCode"
                    value={state.couponCode}
                    onChange={textActivityValue}
                    id="outlined-size-normal"
                  />
                </div>
                <div className="col-1 mt-3 p-0">OR</div>
                <div className="col-5">
                  <h6
                    onClick={() => randomString(6)}
                    className=" mt-3 py-3 me-4 text-center"
                    style={{ backgroundColor: "#ffd333" }}
                  >
                    Generate Coupon code
                  </h6>
                </div>
              </div>
            </Typography>
            <Typography gutterBottom>
              <h6>
                Free Coupon
                <Checkbox
                  checked={isChecked}
                  onClick={(event) => {
                    setFreeCouponCreate(!freeCouponCreate);
                    setIsChecked(event.target.checked);
                  }}
                />
              </h6>
            </Typography>

            {freeCouponCreate ? (
              <>
                <div>
                  <FormControl sx={{ minWidth: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      {" "}
                      Select Discount type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="discountType"
                      value={state.discountType}
                      label=" Select Discount type"
                      onChange={textActivityValue}
                    >
                      <MenuItem disabled>Select Discount type</MenuItem>
                      <MenuItem value="fixed">Flat Discount</MenuItem>
                      <MenuItem value="percentage">%Discount</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Typography gutterBottom>
                  <TextField
                    fullWidth
                    className="mt-2"
                    label="Enter Discount Value"
                    name="discountValue"
                    value={state.discountValue}
                    onChange={textActivityValue}
                    id="outlined-size-normal"
                  />
                </Typography>
              </>
            ) : (
              ""
            )}

            <Typography gutterBottom>
              <div className="row">
                <div className="col-6">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="Start date"
                        name="startDate"
                        defaultValue={dayjs(state.startDate)}
                        onChange={(newValue) =>
                          setState({
                            ...state,
                            startDate: moment(newValue.$d).format("YYYY/MM/DD"),
                          })
                        }
                        // onChange={
                        //   (newValue) =>
                        //     setState(moment(newValue.$d).format("YYYY/MM/DD"))
                        //   //   setInputData(moment(newValue.$d).format("MM/DD/YYYY"))
                        // }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
                <div className="col-6">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker"]}>
                      <DatePicker
                        label="End date"
                        // value={value}
                        name="endDate"
                        defaultValue={dayjs(state.endDate)}
                        onChange={(newValue) =>
                          setState({
                            ...state,
                            endDate: moment(newValue.$d).format("YYYY/MM/DD"),
                          })
                        }
                        // onChange={
                        //   (newValue) =>
                        //     setState(moment(newValue.$d).format("YYYY/MM/DD"))

                        //   //   setInputData(moment(newValue.$d).format("MM/DD/YYYY"))
                        // }
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={updateActivityValue}>
              Update
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </div>
  );
}
