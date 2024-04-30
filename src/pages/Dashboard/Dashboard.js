import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Chart from "react-apexcharts";
import { baseUrl } from "../../features/Api/BaseUrl";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [totaldata, setTotaldata] = useState("");
  const getdataList = () => {
    axios
      .get(`${baseUrl}getAllDetailsCount`)
      .then((response) => {
        console.log(response);
        setTotaldata(response.data.details);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getdataList();
  }, []);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: " Total Jobs",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 40, 45, 50, 49],
      color: "#aeee48",
    },
    {
      name: "Total Blogs",
      data: [10, 9, 15, 20, 19, 20, 30, 41, 10, 15, 20, 29],
      color: "#3c763b",
    },

  ]);
  const totalJobs = () => {
    navigate("/admin/jobs-list");
  };

  const totalBlogs = () => {
    navigate("/admin/blogs-list");
  };

  return (
 <>
 {/*API to show the count of job and Blog */}
   <div className="">
         
         <div className="row">
           <div class="cards">
             <div class="dashboard-card" onClick={totalJobs}>
               <div class="card-content">
                 <div class="number">{totaldata.total_Jobs}</div>
                 <div class="card-name">Total Jobs</div>
               </div>
               <div class="icon-box">
                 <i class="fas fa-user-graduate"></i>
               </div>
             </div>
             <div class="dashboard-card" onClick={totalBlogs}>
               <div class="card-content">
                 <div class="number">{totaldata.total_Blogs}</div>
                 <div class="card-name">Total Blogs</div>
               </div>
               <div class="icon-box">
                 <i class="fas fa-chalkboard-teacher"></i>
               </div>
             </div>
             <div class="dashboard-card">
               <div class="card-content">
                 <div class="number">68</div>
                 <div class="card-name">All</div>
               </div>
               <div class="icon-box">
                 <i class="fas fa-users"></i>
               </div>
             </div>
             <div class="dashboard-card">
               <div class="card-content">
                 <div class="number">$ 4500</div>
                 <div class="card-name">Earnings</div>
               </div>
               <div class="icon-box">
                 <i class="fas fa-dollar-sign"></i>
               </div>
             </div>
           </div>
         </div>
         {/* <div className="row mt-3 ">
           <div className="  col-lg-3 col-md-6 col-sm-12  mt-2">
             <div className="bg-white p-2 pending_style">
               <div>
                 <p className="desc">000</p>
                 <h4 className="mb-0 sub-title">Restaurants</h4>
               </div>
             </div>
           </div>
           <div className="  col-lg-3 col-md-6 col-sm-12  mt-2">
             <div className="bg-white p-2 active_style">
               <div>
                 <p className="desc">Total Revenue</p>
                 <h4 className="mb-0 sub-title">000</h4>
               </div>
             </div>
           </div>
         </div> */}
         <div className="row">
           <div className="col-12 mt-4">
             <h6 className="desc">MONTHLY REVENUE</h6>
           </div>
           <div className="col-12">
             <Chart options={options} series={series} type="bar" width="100%" />
           </div>
         </div>
       </div></>
   
  );
};
export default Dashboard;
