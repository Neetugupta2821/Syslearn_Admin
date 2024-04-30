import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "./BlogDetails.css";
import Rating from "@mui/material/Rating";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CommentIcon from "@mui/icons-material/Comment";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Table } from "antd";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
function TabPanel(props) {
  const location = useLocation();
  console.log(location.state.response);
  const selectedUser = location.state.response.filter((item) => {
    return item._id === location.state.id;
  });

  const getData = selectedUser[0];
  console.log(getData);
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function BlogDetails() {
  const [rating, setRating] = useState();
  const location = useLocation();
  console.log(location.state);

  const selectedUser = location.state.response.filter((item) => {
    return item._id === location.state.id;
  });

  const getData = selectedUser[0];
  console.log(getData);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    axios
      .post(`${baseUrl}user/rating`, {
        // id: getData.visitor_id,
      })
      .then((responce) => {
        console.log(responce.data.response.overall_rating);
        setRating(responce.data.response.overall_rating);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
    {/*Detail of clicked Blog [English]*/}
      <div className="main_div">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              {getData.blogImage ? (
                <img
                  alt="not found"
                  className="rounded-circle mt-5"
                  width="150px"
                  src={`http://192.168.1.43:2001/${getData.blogImage}`}
                />
              ) : (
                <img
                  alt="not found"
                  className="rounded-circle mt-5"
                  width="150px"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                />
              )}
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12">
              <div className="row">
                <h4 className="mt-3 host_style">Blog Details</h4>
              </div>
              <div className="row">
                <div className="col-12">
                  <Box sx={{ width: "100%" }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                      >
                        <Tab label="Blog Detais" {...a11yProps(0)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <div className="container">
                        <div className="row">
                          <div className="col-6">
                            <p className="paragraf_style">Blog Id</p>
                            <p className="paragraf_style">Blog Name</p>
                            <p className="paragraf_style">Blog Email</p>
                            <p className="paragraf_style">Blog Description</p>
                            <p className="paragraf_style">Blog Heading </p>
                            <p className="paragraf_style">Blog createdAt</p>
                            <p className="paragraf_style">Blog Status</p>
                          </div>
                          <div className="col-6">
                            <p className="paragraf_style">{getData._id}</p>
                            <p className="paragraf_style">
                              {getData.adminName}
                            </p>
                            <p className="paragraf_style">
                              {getData.admin_email ? getData.admin_email : "_"}
                            </p>
                            <p className="paragraf_style">
                              {" "}
                              {getData.blog_Desciption
                                ? getData.blog_Desciption
                                : "_"}
                            </p>
                            <p className="paragraf_style">
                              {getData.blog_Heading
                                ? getData.blog_Heading
                                : "_"}
                            </p>
                            <p className="paragraf_style">
                              {getData.createdAt ? getData.createdAt : "_"}
                            </p>
                            {getData.blog_status == "0" ? (
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
                    </TabPanel>
                  </Box>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogDetails;
