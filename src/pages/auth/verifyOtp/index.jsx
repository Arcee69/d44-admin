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


const VerifyOtp = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const formValidationSchema = Yup.object().shape({
        otp: Yup.string().required('Otp is required'),
    });
    
    const submitForm = async (values) => {
        // Perform forgot password logic
        setLoading(true)
        const data = {
          otp: values?.otp
        };
    
        await api.post(appUrls?.VERIFY_OTP_URL, data) 
        .then((response) => {
          console.log(response, "data")
          localStorage.setItem("userId", response?.data?.data?.user_id)
          toast(response?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })
          setLoading(false)
          navigate("/reset-password")
        })
        .catch((error) => {
          console.log(error, "obi")
          toast(error?.data?.message, {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
          })
          setLoading(false)
        })
      };

  return (
    <div className='mb-5 bg-[#FAFAFA] h-screen flex flex-col '>
        <img src={Logo} alt='logo' className='w-[141px] px-5 mt-5 cursor-pointer'/> 
          
        <div className='w-full md:w-[480px] mx-auto mt-[5%] my-auto h-[350px] bg-[#fff] shadow rounded-lg border flex flex-col border-solid border-[#E6E7EC]  p-8 '>
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
                <p className='text-[#828282] text-sm'>Verify Otp</p>
            </div>
            <div className="h-[300px] mt-5">
                <Formik
                    initialValues={{
                        otp: "",
                    }}
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
            
                        <div className="flex flex-col ">
                        <label htmlFor='otp' className="text-xs font-normal text-[#101828]">Otp</label>
                            <input
                                name="otp"
                                placeholder="youremail@domain.com"
                                type="text" 
                                value={values.otp}
                                onChange={handleChange}
                                className="rounded-lg border-[#D0D5DD] outline-none w-[430px] mt-1.5  border-solid  p-3 border"
                            />
                            {errors.otp && touched.otp ? (
                            <div className='text-RED-_100'>{errors.otp}</div>
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

export default VerifyOtp