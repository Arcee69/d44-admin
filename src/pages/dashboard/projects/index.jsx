import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import LongMenu from '../../../components/actionMenuIcon';
import ModalPop from '../../../components/modal/modalPop';
import PaginationControlled from '../../../components/Pagination';
import { appUrls } from '../../../services/urls';
import { api } from '../../../services/api';
import axios from 'axios';

import DeleteProject from './components/DeleteProject';
import ChangeProjectStatus from './components/ChangeProjectStatus';
import UpdateProjects from './components/UpdateProject';


const Projects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [openUpdateBlogPost, setOpenUpdateBlogPost] = useState(false);
    const [updateProjects, setUpdateProjects] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openChangeStatusModal, setOpenChangeStatusModal] = useState(false);
    const [data, setData] = useState();

    const navigate = useNavigate()
    
    let URL = import.meta.env.VITE_APP_API_URL;

    const fetchProjects = async (url = `${URL}/v1/project`) => {
        setLoading(true)
        try {
          const res = await axios.get(url);
          console.log(res, "addict")
          const data = res.data;
    
          setProjects(data?.data || []);
          setPrevPageUrl(data.pagination?.prev_page_url);
          setNextPageUrl(data.pagination?.next_page_url);
          setCurrentPage(data.pagination?.current_page);
        } catch (err) {
          console.error(err);
        } finally {
            setLoading(false)
        }
      };
    
      useEffect(() => {
        fetchProjects();
      }, []);
    
      const handlePrevPage = () => {
        if (prevPageUrl) fetchProjects(prevPageUrl);
      };
    
      const handleNextPage = () => {
        if (nextPageUrl) fetchProjects(nextPageUrl);
      };

  return (
    <div className='md:p-8 flex flex-col gap-4'>
        <p className='text-black text-xl font-semibold'>Projects</p>
        {
            loading 
            ?
            <p  className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
            :
            <div className={`${projects?.length > 0 ? "grid grid-cols-3 gap-8" :  "flex items-center justify-center"}`}>
                {
                    projects?.length > 0 ? projects?.map((project, index) => (
                        <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                            <img loading='lazy' src={project?.image} alt="" className='rounded-tl-xl rounded-tr-xl xs:w-full  h-[290px] object-cover' />
                            <div className='flex flex-col'>
                                <p className='font-bold text-lg'>{project?.title}</p>
                                <div className='flex items-end justify-end'>
                                    <LongMenu
                                        // action={(action) => handleMenuClick(action, project)} 
                                    >
                                        <div className='flex flex-col gap-3 p-3'>
                                            <p 
                                                className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                                onClick={() => {setOpenChangeStatusModal(true), setData(project)}}
                                            >
                                                Change Status
                                            </p>
                                            <p 
                                                className='cursor-pointer hover:bg-[#F8F8F8] p-1' 
                                                onClick={() => {setOpenDeleteModal(true), setData(project)}}
                                            >
                                                Delete
                                            </p>
                                            <Link 
                                                to="/update-project"
                                                state={project}
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
                    <p className='text-2xl text-[#000] text-center font-semibold'>No Projects Available</p>
                }

            </div>
        }

        <div className="flex justify-center items-center gap-4 mt-10">
            <button
                onClick={handlePrevPage}
                disabled={!prevPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !prevPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Previous
            </button>
            <p className="text-[#222222] font-bold">Page {currentPage}</p>
            <button
                onClick={handleNextPage}
                disabled={!nextPageUrl}
                className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${
                !nextPageUrl && "opacity-50 cursor-not-allowed"
                }`}
            >
                Next
            </button>
        </div>
       

        <ModalPop isOpen={openDeleteModal}>
            <DeleteProject 
                handleClose={() => setOpenDeleteModal(false)} 
                data={data}
            />
        </ModalPop>
        <ModalPop isOpen={openChangeStatusModal}>
            <ChangeProjectStatus
                handleClose={() => setOpenChangeStatusModal(false)} 
                data={data}
            />
        </ModalPop>
        <ModalPop isOpen={openUpdateBlogPost}>
            <UpdateProjects
                handleClose={() => setOpenUpdateBlogPost(false)} 
                data={updateProjects}
            />
        </ModalPop>
    </div>
  )
}

export default Projects