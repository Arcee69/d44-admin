import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import uploadLogo from "../../../../assets/icons/uploadLogo.svg"

import { appUrls } from '../../../../services/urls';
import { CustomToolbar } from './CustomToolbar';
import { CgSpinner } from 'react-icons/cg';
import axios from 'axios';
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';

const UpdateProject = () => {
    const [loading, setLoading] = useState(false)
    const [keyFeatures, setKeyFeatures] = useState(['']);
    const [existingImage, setExistingImage] = useState('');

    const token = localStorage.getItem('token')
    let baseURL = import.meta.env.VITE_APP_API_URL;

    const { state } = useLocation()
    const navigate = useNavigate();

    const categoryOptions = ["industrial", "estate", "individual"]

    // Initialize form with existing data
    useEffect(() => {
        if (state) {
            // Set key features from existing data
            if (state.key_features && state.key_features.length > 0) {
                setKeyFeatures(state.key_features);
            }
            
            // Set existing image URL if available
            if (state.image) {
                setExistingImage(state.image);
            }
        }
    }, [state]);

    const formValidationSchema = Yup.object().shape({
        title: Yup.string().required("Project Title is Required"),
        category: Yup.string().required("Category is Required"),
        description: Yup.mixed().required("Project Description is Required")
        // imageDoc is optional for update since user might not want to change it
    });

    const addKeyFeature = () => {
        setKeyFeatures([...keyFeatures, '']);
    };

    const removeKeyFeature = (index) => {
        if (keyFeatures.length > 1) {
            const updatedFeatures = keyFeatures.filter((_, i) => i !== index);
            setKeyFeatures(updatedFeatures);
        }
    };

    const updateKeyFeature = (index, value) => {
        const updatedFeatures = [...keyFeatures];
        updatedFeatures[index] = value;
        setKeyFeatures(updatedFeatures);
    };

    const submitForm = async (values, actions) => {
        setLoading(true)
        
        // Validate that at least one key feature is provided
        const validKeyFeatures = keyFeatures.filter(feature => feature.trim() !== '');
        if (validKeyFeatures.length === 0) {
            toast("Please add at least one key feature", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            });
            setLoading(false);
            return;
        }

        const formData = new FormData()
        formData.append("title", values?.title);
        formData.append("status", "publish");
        formData.append("desc", values?.description);
        formData.append("category", values?.category);
        
        // Only append image if a new one was selected
        if (values?.imageDoc && values.imageDoc instanceof File) {
            formData.append("image", values?.imageDoc);
        }

        // Add key_features to formData
        validKeyFeatures.forEach((feature, index) => {
            formData.append(`key_features[${index}]`, feature.trim());
        });

        // Log form data for debugging
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        try {
            await axios.post(`${baseURL}${appUrls?.PROJECT_URL}/${state?.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((res)=> {
                toast("Project updated successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    closeOnClick: true,
                })
                setLoading(false)
                // Navigate back or to projects list
                navigate('/projects'); // Adjust this route as needed
            })
        } catch (err) {
            console.log(err, "error")
            toast(err?.response?.data?.message || "Project update failed", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
        }
    }

    // If no state data is passed, show error
    if (!state) {
        return (
            <div className='md:p-8 flex flex-col gap-4'>
                <p className='text-red-500 text-xl font-semibold'>No project data provided. Please go back and select a project to edit.</p>
            </div>
        )
    }

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Update Project</p>

        <div className="flex items-center ">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ease: "easeIn", duration: 0.5 }}
                className=""
            >
                <div className='flex flex-col gap-6 lg:w-[607px] border border-solid p-8'>
                    
                    <div className="h-auto">
                        <Formik
                        initialValues={{
                          title: state?.title || "",
                          category: state?.category || "",
                          imageDoc: "",
                          description: state?.desc || "",
                        }}
                        validationSchema={formValidationSchema}
                        enableReinitialize={true}
                        onSubmit={(values, actions) => {
                            console.log(values, "form values")
                            submitForm(values, actions)
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
                            values,
                        }) => (
                        <Form onSubmit={handleSubmit} className="flex flex-col w-full">
                            <div className='flex flex-col gap-6 lg:items-center'>

                                {/* Title Field */}
                                <div className="flex flex-col mx-2">
                                    <label htmlFor='title' className="text-base text-left font-semibold text-[#000000]">Title</label>
                                    <input
                                        name="title"
                                        placeholder="Project Title"
                                        type="text" 
                                        value={values.title}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid p-3 border"
                                    />
                                    {errors.title && touched.title ? (
                                    <div className='text-RED-_100'>{errors.title}</div>
                                    ) : null}
                                </div>

                                {/* Category Field */}
                                <div className="flex flex-col mx-2">
                                    <label htmlFor='category' className="text-base text-left font-semibold text-[#000000]">Category</label>
                                    <select
                                        name="category"
                                        value={values.category}
                                        onChange={handleChange}
                                        className="rounded outline-none shadow lg:w-[507px] h-[44px] border-solid p-3 border"
                                    >
                                        <option value="">Select Category</option>
                                        {categoryOptions?.map((item, index) => (
                                          <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                    {errors.category && touched.category ? (
                                    <div className='text-RED-_100'>{errors.category}</div>
                                    ) : null}
                                </div>

                                {/* Key Features Field */}
                                <div className="flex flex-col mx-2 gap-3">
                                    <label className="flex items-center justify-between">
                                        <p className="text-base text-left font-semibold text-[#000000]">Key Features</p>
                                        <button 
                                            type="button"
                                            onClick={addKeyFeature}
                                            className="ml-4 text-sm bg-GREEN-_100 text-white px-2 py-1 rounded flex items-center gap-1"
                                        >
                                            <IoIosAdd className="text-lg" />
                                            Add Feature
                                        </button>
                                    </label>
                                    
                                    {keyFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2 w-full mb-2">
                                            <input
                                                placeholder={`Key feature ${index + 1}`}
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateKeyFeature(index, e.target.value)}
                                                className="rounded outline-none shadow lg:w-[450px] h-[44px] border-solid p-3 border"
                                            />
                                            {keyFeatures.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeKeyFeature(index)}
                                                    className="bg-RED-_100 text-white p-2 rounded hover:bg-red-600"
                                                >
                                                    <IoIosRemove className="text-lg" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    
                                    {keyFeatures.filter(f => f.trim() === '').length === keyFeatures.length && (
                                        <div className='text-yellow-600 text-sm'>Add at least one key feature</div>
                                    )}
                                </div>

                                {/* Image Upload Field */}
                                <div className="flex flex-col xs:mt-4 lg:mt-0 w-11/12">
                                    {values?.imageDoc ? (
                                        <div className="pt-0">
                                            <img 
                                                alt="upload preview" 
                                                width={"450px"} 
                                                src={URL.createObjectURL(values?.imageDoc)} 
                                                className="rounded"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setFieldValue("imageDoc", "")}
                                                className="mt-2 text-sm text-RED-_100 hover:text-red-700"
                                            >
                                                Remove New Image
                                            </button>
                                        </div>
                                    ) : existingImage ? (
                                        <div className="pt-0 ">
                                            <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                            <img 
                                                alt="existing project" 
                                                width={"450px"} 
                                                src={existingImage} 
                                                className="rounded "
                                            />
                                            <div className="mt-2">
                                                <label className="text-sm bg-BLUE-_100 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600">
                                                    Change Image
                                                    <input
                                                        type="file"
                                                        name="imageDoc"
                                                        className="opacity-80 absolute"
                                                        onChange={(e) => {setFieldValue("imageDoc", e.target.files[0])}}
                                                        accept={"image/*"}
                                                        multiple={false}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col w-full h-56 py-4 px-0 border-2 bg-BLUE-_300 border-BLUE-_200 border-dashed rounded cursor-pointer">
                                            <div className="flex flex-col my-auto items-center">
                                                <img src={uploadLogo} alt="upload" />
                                                <div className="text-center font-medium text-sm text-black">
                                                    Click to upload <span className='block text-black'>PNG or JPG (max 5mb)</span>
                                                </div>   
                                            </div>
                                            <input
                                                type="file"
                                                name="imageDoc"
                                                className="opacity-0 absolute"
                                                onChange={(e) => {setFieldValue("imageDoc", e.target.files[0])}}
                                                id="upload"
                                                accept={"image/*"}
                                                multiple={false}
                                            />
                                        </label>
                                    )}
                                    {errors.imageDoc && touched.imageDoc ? 
                                        <div className='text-RED-_100'>{errors.imageDoc}</div> 
                                        : null
                                    }
                                </div>

                                {/* Description Field */}
                                <div className='flex flex-col px-1'>
                                    <label htmlFor='description' className="text-base text-left font-semibold text-[#000000]">Description</label>
                                    <CustomToolbar />
                                    <ReactQuill 
                                        theme="snow" 
                                        value={values.description} 
                                        onChange={(e) => setFieldValue("description", e)}
                                        modules={modules}
                                        formats={formats}
                                        style={{ 
                                            backgroundColor: "#fff", 
                                            minHeight: "193px", 
                                            border: '1px solid #ccc', 
                                            borderRadius: '4px', 
                                            padding: '10px'
                                        }}
                                        className="lg:w-[507px] h-[193px] mt-1.5 outline-none"     
                                    />
                                   
                                    {errors.description && touched.description ? 
                                        <div className='text-RED-_100'>{errors.description}</div> 
                                        : null
                                    }
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className='flex xs:mt-4 md:mt-5 lg:mt-5 gap-4 justify-center'>
                                {/* <button 
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="w-6/12 bg-gray-500 border-none p-3 text-white flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md"
                                    style={{ width: "130px" }}
                                >
                                    <p className='text-[#fff] text-sm text-center font-semibold'>
                                        Cancel
                                    </p>
                                </button> */}
                                <button 
                                    type="submit" 
                                    className="w-6/12 bg-PURPLE-_50 border-none p-3 text-white flex items-center justify-center text-sm rounded-tl-2xl rounded-tr-md rounded-b-md"
                                    style={{ width: "130px" }}
                                    disabled={loading}
                                >
                                    <p className='text-[#fff] text-sm text-center font-semibold'>
                                        {loading ? <CgSpinner className="animate-spin text-lg" /> : 'Update'}
                                    </p>
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

export default UpdateProject