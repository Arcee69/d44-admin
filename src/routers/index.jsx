import React from 'react'
import { Route, Routes} from "react-router-dom";

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes';

import Login from '../pages/auth/login';
import ForgotPassword from '../pages/auth/forgotPassword';
import VerifyOtp from '../pages/auth/verifyOtp';
import PasswordReset from '../pages/auth/passwordReset';

import BoardLayout from '../layouts/boardLayout';
import CreateBlog from '../pages/dashboard/createBlog';
import ViewBlog from '../pages/dashboard/viewBlog';
import UpdateBlog from '../pages/dashboard/viewBlog/components/UpdateBlog';


import Newsletter from '../pages/dashboard/newsletter';


import Admins from '../pages/dashboard/admins';
import AddAdmin from '../pages/dashboard/admins/components/AddAdmin';




export default function Routers () {

  return (
    <div>
        <Routes>

            <Route element={<ProtectRoutes /> }>
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/update-blog" element={<UpdateBlog />} />
              <Route path="/blog" element={<ViewBlog />} />
              <Route path="/view-blog" element={<ViewBlog />} />
         
              
      
              <Route path="/admins" element={<Admins />} />
              <Route path="/view-admins" element={<Admins />} />
              <Route path="/add-admin" element={<AddAdmin />} />
            </Route>

            <Route element={<AuthProtectRoutes />}>
                {/* <Route path='/' element={<Login />} /> */}
                <Route path='/' element={<Login />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/verify-otp' element={<VerifyOtp />} />
                <Route path='/reset-password' element={<PasswordReset />} />
             
            </Route>
        </Routes>
    </div>
  )
}
