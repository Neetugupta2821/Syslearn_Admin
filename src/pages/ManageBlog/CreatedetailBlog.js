import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import "./BlogDetails.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../features/Api/BaseUrl";
 
 

// function TabPanel(props) {
//     const location = useLocation();
//     console.log(location.state.response);
//     const selectedUser = location.state.response.filter((item) => {
//       return item._id === location.state.id;
//     });
//   }
 

export default function CreatedetailBlog() {
    const location = useLocation();
    console.log(location.state.response);
    console.log(location.state.id);
    const getArrayData = location.state.response.filter((info)=>{
         return info._id===location.state.id
    })
    console.log(getArrayData)
   const getData=getArrayData[0]

    return (
        <>
        {/*Detail of Clicked Blog [French]*/}
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
                                                // value={value}
                                                // onChange={handleChange}
                                                aria-label="basic tabs example"
                                            >
                                                 
                                            </Tabs>
                                        </Box>
                                        {/* value={value} index={0} */}
                                       
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
                                                            {getData.blog_Desciption_fr
                                                                ? getData.blog_Desciption_fr
                                                                : "_"}
                                                        </p>
                                                        <p className="paragraf_style">
                                                            {getData.blog_Heading_fr
                                                                ? getData.blog_Heading_fr
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
