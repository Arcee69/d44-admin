import React from 'react'
import { IoMdClose } from 'react-icons/io'

const View = ({ handleClose, data }) => {


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    
    return (
        <div className='flex flex-col bg-[#fff] w-10/12 md:w-[627px] h-[450px] overflow-y-auto ' style={{ zIndex: 9999 }}>
            <div className='flex items-center justify-between p-6'>
                <p className='font-medium text-base text-[#000]'>View Information</p>
                <button className="flex justify-center items-center" onClick={handleClose}>
                    <IoMdClose className='text-black w-5 h-5' />
                </button>
            </div>
            <hr />
            <div className='flex flex-col gap-2 p-6'>
                <p className='font-medium text-base'>Name: <span className='font-bold text-lg'>{data?.name}</span></p>
                <p className='font-medium text-base'>Email: <span className='font-bold text-lg'>{data?.email}</span></p>
                <p className='font-medium text-base'>Phone: <span className='font-bold text-lg'>{data?.phone}</span></p>
                <p className='font-medium text-base'>Sent At: <span className='font-bold text-lg'>{formatDate(data.created_at)}</span></p>
                <div className='flex items-start gap-1'>
                    <p className='font-medium text-base mt-0.5'>Services:</p>
                    {data.services && data.services?.length > 0 ? (
                        <div className="flex flex-col gap-1">
                            {data.services?.map((service, index) => (
                                <span
                                    key={index}
                                    className="font-bold text-lg"
                                >
                                    {service}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <span className="font-bold text-lg">No services</span>
                    )}
                </div>
                                <p className='font-medium text-base'>Message: <span className='font-bold text-lg'>{data.body}</span></p>
            </div>

        </div>
    )
}

export default View