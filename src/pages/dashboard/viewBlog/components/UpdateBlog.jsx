import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { useLocation } from 'react-router-dom';

import uploadLogo from "../../../../assets/Icons/uploadLogo.svg"

import { api } from '../../../../services/api';
import { appUrls } from '../../../../services/urls';
import { toast } from 'react-toastify';
import axios from 'axios';
import { CustomToolbar } from './CustomToolbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CgSpinner } from 'react-icons/cg';

const UpdateBlog = () => {
    const [loading, setLoading] = useState(false)

    const { state } = useLocation()
    // console.log(state, "opor")
    const token = localStorage.getItem("token")

    const formValidationSchema = Yup.object().shape({
        title: Yup.string().required("Blog Title is Required"),
        imageDoc: Yup.mixed().required('Blog Image is required'),
        description: Yup.mixed().required("Contest Description is Required")
    });

    const submitForm = async (values, actions) => {
        setLoading(true)
        console.log(values, "ododo")
        const formData = new FormData()

        formData.append("title", values?.title);
        formData.append("body", values?.description);
        formData.append("image", values?.imageDoc);
        formData.append("status", "publish");

        await api.post(appUrls?.UPDATE_POST_URL +`/${state?.id}`, formData)
        .then((res) => {
            // console.log(res, "try")
            toast("Blog Updated Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            actions.resetForm()
            setLoading(false)
        })
        .catch((err) => {
            // console.log(err, "soso")
            toast(`${err?.data?.message}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
        })
    }

    // const updateImage = async (values, actions) => {
    //     const formData = new FormData()

    //     formData.append("post_id", state?.id);
    //     formData.append("image", values?.imageDoc);

    //     await  axios.post(`https://api.admin.noa.gov.ng/api/post/update-image`, formData, {
    //         headers: {
    //             "Authorization": `Bearer ${token}`,
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })
    //     .then((res) => {
    //         console.log(res, "pop");
    //         setLoading(false)
    //         toast(`${res?.data?.message}`, { 
    //             position: "top-right",
    //             autoClose: 3500,
    //             closeOnClick: true,
    //         });
    //         actions.resetForm()
    //     }) 
    //     .catch((err) => {
    //         console.log(err, "pop");
    //         setLoading(false)
    //         toast(`${err?.data?.message}`, { 
    //             position: "top-right",
    //             autoClose: 3500,
    //             closeOnClick: true,
    //         });
    //     })
    // }
  

  return (
    <div className='md:p-8 flex flex-col gap-4'>
       
        <p className='text-black text-xl font-semibold'>Update Blog</p>

        <div className="flex items-center ">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                className=""
            >
                <div className='flex flex-col gap-6 lg:w-[607px] border border-solid p-8'> {/* h-[670px] */}
                    
                    <div className="h-auto">
                        <Formik
                        initialValues={{
                            title: state?.title || "",
                            description: state?.body || "",
                            imageDoc: "",
                        }}
                        validationSchema={formValidationSchema}
                        // enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            // window.scrollTo(0, 0)
                            console.log(values, "often")
                            submitForm(values, actions)
                            // if(values?.imageDoc) {
                            //     updateImage(values, actions)
                            // }
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
                        <Form onSubmit={handleSubmit} className="flex flex-col">
                            <div className='flex flex-col gap-6 lg:items-center'>

                                <div className="flex flex-col mx-2  ">
                                    <label htmlFor='title' className="text-base text-left font-semibold text-[#000000]">Title</label>
                                    <input
                                        name="title"
                                        placeholder="Blog Title"
                                        type="text" 
                                        value={values.title}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid  p-3 border"
                                    />
                                    {errors.title && touched.title ? (
                                    <div className='text-RED-_100'>{errors.title}</div>
                                    ) : null}
                                </div>

                                <div className="flex flex-col xs:mt-4 lg:mt-0 lg:w-12/12">
                                    {values?.imageDoc
                                    ? 
                                        <div className="pt-0 " >
                                            <img alt="upload" width={"300px"} height={"100px"} src={URL.createObjectURL(values?.imageDoc)} />
                                        </div>
                                    
                                    :
                                    <label className="flex flex-col xs:w-full  h-56 py-4 px-0  border-2 bg-BLUE-_300 border-BLUE-_200 border-dashed">
                                    <div className="flex flex-col my-auto items-center">
                                        <img src={uploadLogo} alt="upload" />
                                        <div className="text-center font-medium text-sm text-black">
                                            Click to upload <span className='block text-black'>PNG or JPG (max 5mb)</span>
                                        </div>   
                                    </div>
                                    <input
                                        type="file"
                                        name="imageDoc"
                                        value={values?.imageDoc}
                                        className="opacity-0"
                                        onChange={(e) => {setFieldValue("imageDoc", e.target.files[0])}}
                                        id="upload"
                                        accept={"image/*"}
                                        multiple={false}
                                    />
                                    </label>
                                    }
                                        {errors.imageDoc && touched.imageDoc ? 
                                        <div className='text-RED-_100'>{errors.imageDoc}</div> 
                                        : null
                                        }
                                </div> 

                                <div className='flex flex-col px-1'>
                                    <label htmlFor='title' className="text-base text-left font-semibold text-[#000000]">Body</label>
                                    <CustomToolbar />
                                    <ReactQuill 
                                        theme="snow" 
                                        value={values.description} 
                                        onChange={(e) => setFieldValue("description", e)}
                                        modules={modules}
                                        formats={formats}
                                        style={{ backgroundColor: "#fff", minHeight: "193px", border: '1px solid #ccc', borderRadius: '4px', padding: '10px'}}
                                        className="lg:w-[507px] h-[193px] mt-1.5 outline-none"     
                                    />
                                    
                                    {errors.description && touched.description ? 
                                        <div className='text-RED-_100'>{errors.description}</div> 
                                        : null
                                    }
                                </div>
                                
                                {/* <div className='flex flex-col '>
                                    <label htmlFor='title' className="text-base text-left font-semibold text-[#000000]">Description</label>
                                    <textarea
                                        name="description"
                                        placeholder="Blog Description"
                                        type="text"
                                        rows="5"
                                        className="lg:w-[507px] rounded  h-[193px]  bg-white border border-solid mt-1.5 p-3 outline-none"                               
                                        value={values.description}
                                        onChange={handleChange}
                                    >
                                    </textarea>
                                    {errors.description && touched.description ? 
                                        <div className='text-RED-_100'>{errors.description}</div> 
                                        : null
                                    }
                                </div> */}
                    
                        

                            
                            </div>

                           <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                <button 
                                type="submit" 
                                className="w-6/12 bg-PURPLE-_50 border-none p-3 text-white flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md "
                                style={{ width: "130px" }}
                                >
                                    <p className='text-[#fff] text-sm  text-center  font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Submit'}</p>
                                </button>
                            </div>
                            

                        </Form>
                    )}
                        </Formik>
                    </div>

                </div>
                
            </motion.div>
            </div>

    </div>
  )
}

const modules = {
    toolbar: {
      container: "#toolbar",
    }
  };
  
  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

export default UpdateBlog