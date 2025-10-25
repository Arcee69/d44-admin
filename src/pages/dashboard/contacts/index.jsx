import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { CgSpinner } from 'react-icons/cg';
import ModalPop from '../../../components/modal/modalPop';
import View from './components/View';
import LongMenu from '../../../components/actionMenuIcon';

const Contacts = () => {
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [allContacts, setAllContacts] = useState([])
    const [prevPageUrl, setPrevPageUrl] = useState(null);
    const [nextPageUrl, setNextPageUrl] = useState(null);
    const [openViewModal, setOpenViewModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [contactData, setContactData] = useState([])

    let URL = import.meta.env.VITE_APP_API_URL;
    const token = localStorage.getItem('token');

    const fetchContacts = async (url = `${URL}/v1/contact`) => {
        setLoading(true)
        try {
            const res = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log(res, "contacts response")
            const data = res.data;

            setAllContacts(data?.data || []);
            setPrevPageUrl(data.pagination?.prev_page_url);
            setNextPageUrl(data.pagination?.next_page_url);
            setCurrentPage(data.pagination?.current_page || 1);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);


    // Filter contacts based on search
    const filteredContacts = allContacts?.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handlePrevPage = () => {
        if (prevPageUrl) fetchContacts(prevPageUrl);
    };

    const handleNextPage = () => {
        if (nextPageUrl) fetchContacts(nextPageUrl);
    };

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
        <div className='p-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>Contacts</h1>
                <div className='text-sm text-gray-600'>
                    <input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className='placeholder:text-grey-50 bg-[#fff] border rounded p-2 w-[350px]  focus:outline-none'
                        placeholder="Search Name"
                    />
                </div>
            </div>



            {
                loading
                    ?
                    <p className='text-2xl text-[#000] text-center font-semibold'>Loading...</p>
                    :
                    <div className={`${filteredContacts?.length > 0 ? "grid grid-cols-3 gap-8" : "flex items-center justify-center"}`}>
                        {
                            filteredContacts?.length > 0 ? filteredContacts?.map((contact, index) => (
                                <div key={index} className="rounded-tl-xl bg-white p-3 rounded-tr-xl xs:w-full md:min-w-[280px]">
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-medium text-base'>Name: <span className='font-bold text-lg'>{contact?.name}</span></p>
                                        <p className='font-medium text-base'>Email: <span className='font-bold text-lg'>{contact?.email}</span></p>
                                        <p className='font-medium text-base'>Phone: <span className='font-bold text-lg'>{contact?.phone}</span></p>
                                        <div className='flex items-end justify-end'>
                                            <LongMenu>
                                                <div className='flex flex-col gap-3 p-3'>
                                                    <p
                                                        className='cursor-pointer hover:bg-[#F8F8F8] p-1'
                                                        onClick={() => { setOpenViewModal(true), setContactData(contact) }}
                                                    >
                                                        View
                                                    </p>
                                                </div>
                                            </LongMenu>
                                        </div>
                                    </div>
                                </div>
                            ))
                                :
                                <p className='text-2xl text-[#000] text-center font-semibold'>No Contacts Available</p>
                        }

                    </div>
            }

            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    onClick={handlePrevPage}
                    disabled={!prevPageUrl}
                    className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${!prevPageUrl && "opacity-50 cursor-not-allowed"
                        }`}
                >
                    Previous
                </button>
                <p className="text-[#222222] font-bold">Page {currentPage}</p>
                <button
                    onClick={handleNextPage}
                    disabled={!nextPageUrl}
                    className={`px-4 py-2 bg-[#00AA55] text-white font-bold rounded ${!nextPageUrl && "opacity-50 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>


            <ModalPop isOpen={openViewModal}>
                <View
                    handleClose={() => setOpenViewModal(false)}
                    data={contactData}
                />
            </ModalPop>

        </div>
    )
}

export default Contacts