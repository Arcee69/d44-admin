
import React, { useState } from 'react'
import { appUrls } from '../../../../services/urls'
import { api } from '../../../../services/api'
import { toast } from 'react-toastify'
import { CgSpinner } from 'react-icons/cg'

const DeleteProject = ({ handleClose, data }) => {
    const [loading, setLoading] = useState(false)
    // console.log(data?.id, "pink")

    const deleteProject = async () => {
        setLoading(true)
        await api.delete(appUrls?.PROJECT_URL + `/${data?.id}`)
        .then((res) => {
            toast("Project Deleted Successfully", {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
            handleClose()
            window.location.reload()
        })
        .catch((err) => {
            toast(`${err?.data}`, {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
            })
            setLoading(false)
        })
    }
  return (
    <div className='flex flex-col bg-[#fff] w-8/12 md:w-[327px] xs:h-[150px] md:h-[250px] p-8'>
        <div className='flex flex-col text-center gap-3'>
            <p className='text-[#000] font-bold text-3xl'>Are you sure?</p>
            <p className='text-[#000] '>Once you click Delete the project can't be retrieve again</p>
        </div>
        <div className='flex justify-between mt-10'>
            <button type="button" onClick={handleClose} className='bg-primary p-3 text-white rounded border-none'>Cancel</button>
            <button 
                type='submit' 
                onClick={() => deleteProject()} 
                className='bg-RED-_100 p-3 text-white flex items-center justify-center rounded border-none'
            >
                <p className='text-[#fff] text-sm  text-center  font-semibold'>{loading ? <CgSpinner className=" animate-spin text-lg  " /> : 'Delete'}</p>
            </button>
        </div>

    </div>
  )
}

export default DeleteProject