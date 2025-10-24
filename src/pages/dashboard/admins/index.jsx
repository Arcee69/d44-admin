import React, { useState, useEffect } from 'react'

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import DeleteAdmin from './components/DeleteAdmin';

import { appUrls } from '../../../services/urls';
import { api } from '../../../services/api';
import { Link } from 'react-router-dom';



const Admins = () => {
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [adminsPerPage] = useState(10)
    const [totalPages, setTotalPages] = useState(1);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [data, setData] = useState();    


    const fetchAdmin = async () => {
        setLoading(true)
        try {
          const res = await api.get(appUrls?.USER_URL);
          console.log(res, "addict")
          const data = res.data;
    
          setAdmins(data?.data || []);
   
        } catch (err) {
          console.error(err);
        } finally {
            setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchAdmin();
      }, []);
    
      useEffect(() => {
            // Update total pages whenever filteredOrders changes
            setTotalPages(Math.ceil(admins?.length / adminsPerPage));
        }, [admins?.length, adminsPerPage]);
      
    // Calculate indices for paginated data
    const indexOfLastBranch = currentPage * adminsPerPage;
    const indexOfFirstBranch = indexOfLastBranch - adminsPerPage;
    const currentAdmins = admins?.slice(indexOfFirstBranch, indexOfLastBranch);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
        
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Admins</p>
        {
            loading 
            ?
            <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
            :
            <div className={`${currentAdmins?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                {
                    currentAdmins?.length > 0 ? currentAdmins?.map((admin, index) => (
                        <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                            <div className='flex flex-col'>
                                <p className='font-bold text-sm'>Full Name: <span className="font-medium text-lg">{admin?.name}</span></p>
                                <p className='font-bold text-sm'>Email: <span className="font-medium text-lg">{admin?.email}</span></p>
                                <div className='flex items-end justify-end'>
                                    <LongMenu>
                                        <div className='flex flex-col gap-3 p-3'>
                                            <p 
                                            className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                            onClick={() => {setOpenDeleteModal(true), setData(admin)}}
                                            >
                                                Delete
                                            </p>
                                            <Link 
                                                to="/edit-admin"
                                                state={admin}
                                                className='cursor-pointer hover:bg-[#F8F8F8] p-1'
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </LongMenu>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p className='text-2xl text-[#000] text-center font-semibold'>No Admins Available</p>
                }

            </div>
        }

        <div className="flex justify-center items-center gap-4 mt-10">
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                currentPage === 1 && "opacity-50 cursor-not-allowed"
                }`}
            >
                Previous
            </button>
            <p className="text-[#222222] font-bold">Page {currentPage}</p>
            <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                currentPage === totalPages && "opacity-50 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
       

        <ModalPop isOpen={openDeleteModal}>
            <DeleteAdmin
                handleClose={() => setOpenDeleteModal(false)} 
                data={data}
            />
        </ModalPop>
        
    </div>
  )
}

export default Admins