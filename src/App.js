import "./App.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
// import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
// import MainLayout from "./components/MainLayout";
import MyProfile from "./pages/MyProfile";
import ChangePassword from "./pages/ChangePassword";
import Protected from "./pages/Protected";
import CustomerDetails from "../src/pages/ManageCustomer/CustomerDetails";
import ResetPassword from "./pages/ResetPassword";

import PageNotFound from "./pages/PageNotFound";
// import ManageCustomer from "../src/pages/ManageCustomer/ManageCustomer";
// import Invoice from "./pages/Invoice";
// import ManagesBooking from "../src/pages/ManagesBooking/ManagesBooking";
import ManagePromoCodeList from "./pages/ManagePromoCode/ManagePromoCodeList";
import OtpGenerate from "./pages/OtpGenrate";
import AddJobs from "./pages/ManageCustomer/AddJobs";
import EditJobs from "./pages/ManageCustomer/EditJobs";
import BlogDetails from "./pages/ManagesBooking/BlogDetails";
import AddBlog from "./pages/ManagesBooking/AddBlog";
import EditBlog from "./pages/ManagesBooking/EditBlog";
 import AddJobFR from "./pages/Managejob/AddJobFR";
 import EditJobFR from './pages/Managejob/EditJobFR'
 import CustemerDetailFR from "./pages/Managejob/CustemerDetailFR";
 import AddBlogFR from './pages/ManageBlog/AddBlogFR'
 import EditBlogFR from './pages/ManageBlog/EditBlogFR'
 import CreatedetailBlog from "./pages/ManageBlog/CreatedetailBlog";




function App() {
  const Main = lazy(() => import('./components/MainLayout'))
  const ManagesBooking = lazy(() => import('../src/pages/ManagesBooking/ManagesBooking'))
  const ManageCustomer = lazy(() => import('../src/pages/ManageCustomer/ManageCustomer'))
  const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'))
  const MessageData = lazy(() => import('./pages/MangeMessage/MessageData'))
  const ManageJob = lazy(() => import('./pages/Managejob/ManageJob'))
  const ManageBlog = lazy(() => import('./pages/ManageBlog/ManageBlog'))

  console.log("date=04-3-2024 time=02:21")
  return (
    <Router basename='syslearn.fr'>
      <Suspense fallback={<h1>loading......</h1>}>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/otp-generate" element={<OtpGenerate />} />

          <Route path="/admin" element={<Protected Component={Main} />}>
            <Route index element={<Dashboard />} />
            <Route path="jobs-list" element={<ManageCustomer />} />
            <Route path="users-list" element={<ManagesBooking />} />
            <Route path="jobs-list/job-details" element={<CustomerDetails />} />
            <Route
              path="manage-customer/customer-details"
              element={<CustomerDetails />}
            />
            <Route path="*" element={<PageNotFound />} />

            <Route path="add-jobs" element={<AddJobs />} />
            <Route path="edit-jobs" element={<EditJobs />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="edit-blog" element={<EditBlog />} />
            {/* <Route path="invoice" element={<Invoice />} /> */}
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="blogs-list" element={<ManagesBooking />} />
            <Route path="blogs-list/blog-details" element={<BlogDetails />} />
            <Route path="manage-promo-code" element={<ManagePromoCodeList />} />
            <Route path="message-list" element={<MessageData />} />
            <Route path="jobs-list-french" element={<ManageJob />} />
            <Route path="Blog-list-french" element={<ManageBlog />} />
            <Route path="Add-job-franch" element={<AddJobFR/>} />
            <Route path="edit-jobs-French" element={<EditJobFR/>}/>
            <Route path="jobs-Detail-French" element={<CustemerDetailFR/>}/>
            <Route path="Add-Blog-French" element={<AddBlogFR/>}/> 
            <Route path="edit-Blog-French" element={<EditBlogFR/>}/>
            <Route path="Blog-Detail-French" element={<CreatedetailBlog/>}/>
          
          </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}
export default App;

// pazination code- https://codesandbox.io/s/create-pagination-in-react-js-using-reacthooks-cgq18?from-embed=&file=/src/App.js:854-869
