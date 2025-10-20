import React, { useState } from 'react'
import { Form, Formik} from "formik"
import { useLocation, useNavigate } from 'react-router-dom'
import { CgSpinner } from "react-icons/cg"
import { toast } from 'react-toastify'
import * as Yup from "yup"

import Logo from "../../../assets/icons/logo.svg"
import Back from "../../../assets/icons/back-arrow.svg";

import { api } from '../../../services/api'
import { appUrls } from '../../../services/urls'
import PasswordField from '../../../components/InputFields/PasswordField'


const PasswordReset = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    
    const formValidationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
    
    const userId = localStorage.getItem("userId")
    
    const submitForm = async (values, action) => {
          setLoading(true);
        const data = {
            "user_id": userId,
            "password": values?.password,
            "password_confirmation": values?.confirmPassword
        }
          try {
            const res = await api.post(appUrls?.RESET_PASSWORD_URL, data)
            console.log(res, "appo")
            toast(`${res?.data?.message}`, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
            })  
            localStorage.removeItem("userId")
            navigate("/")
          } catch (err) {
            console.log(err, "eyes")
            toast(`${err?.data?.message}`, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
            })  
          } finally {
            setLoading(false)
          }
    }
    

  return (
    <div className='mb-5 bg-[#FAFAFA] h-screen flex flex-col '>
        <img src={Logo} alt='logo' className='w-[141px] px-5 mt-5 cursor-pointer'/> 
          
        <div className='w-full md:w-[480px] mx-auto mt-[5%] my-auto h-[420px] bg-[#fff] shadow rounded-lg border flex flex-col border-solid border-[#E6E7EC]  p-8 '>
          <div className="bg-NEUTRAL-_600 w-6 h-6 mt-0.5 rounded-3xl flex justify-center">
            <img
              src={Back}
              alt="back"
              className="cursor-pointer p-1.5"
              onClick={() => navigate(-1)}
            />
          </div>
            <div className='flex flex-col justify-center gap-1 items-center'>
                <p className="text-xl font-medium text-[#101828]">CMS Portal</p>
                <p className='text-[#828282] text-sm'>Reset Password</p>
            </div>
            <div className="h-[300px] mt-5">
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={formValidationSchema}
                    onSubmit={(values) => {
                        window.scrollTo(0, 0)
                        console.log(values, "often")
                        submitForm(values)
                    }}
                >
                {({
                    handleSubmit,
                    handleChange,
                    dirty,
                    isValid,
                    setFieldValue,
                    errors,
                    touched,
                    // setFieldTouched,
                    values,
                }) => (
                <Form onSubmit={handleSubmit} className="flex flex-col lg:items-center">
                    <div className='flex flex-col gap-6 lg:items-center h-[47px]'>
            
                        <div className="flex flex-col w-[430px]">
                            <label htmlFor='password' className="text-xs font-normal text-[#101828]">New Password</label>
                            <PasswordField 
                                name="password"
                                value={values.password}
                                placeholder="Password"
                                className="border  rounded-lg border-[#D0D5DD] mt-1.5"
                                onChange={handleChange}
                            />                
                            {errors.password && touched.password ? (
                                <div className='text-RED-_100'>{errors.password}</div>
                                ) : null}
                        </div>

                        <div className="flex flex-col w-[430px]">
                            <label htmlFor='Confirm Password' className="text-xs font-normal text-[#101828]">Confirm New Password</label>
                            <PasswordField 
                                name="confirmPassword"
                                value={values.confirmPassword}
                                placeholder="Password"
                                className="border  rounded-lg border-[#D0D5DD] mt-1.5"
                                onChange={handleChange}
                            />                
                            {errors.confirmPassword && touched.confirmPassword ? (
                                <div className='text-RED-_100'>{errors.confirmPassword}</div>
                                ) : null}
                        </div>
                

                        <button 
                            className= " bg-PURPLE-_50 border-none mt-5  text-[#fff] rounded-lg p-3 cursor-pointer w-full h-[54px] flex justify-center"
                            type="submit"
                        >
                            <p className='text-[#fff] text-sm  text-center  font-medium'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Submit'}</p>
                        </button>
                    
                    </div>
                    

                </Form>
            )}
                </Formik>
            </div>

        </div>

        
    
    </div>
  )
}

export default PasswordReset