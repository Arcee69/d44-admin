import React from 'react'
import moment from 'moment'
import { getQuickPicks } from './utilities'

export default function QuickDatePicker({datePicker, setDatePicker}) {

  const {startDate, endDate, isCustom, showAll} = datePicker
  const dateFormat = "YYYY-MM-DD"

  const getIsSelected = (pick) => {
    if(pick.title === "Custom" && isCustom) {
      return true 
    } else if(pick.title === "All" && showAll) {
      return true
    } else if (!isCustom && moment(startDate).isSame(pick.startDate) && moment(endDate).isSame(pick.endDate) ) {
      return true
    } else {
      return false
    }
  }

  const handleClick = (pick) => {
    if(pick.title === "Custom") {
      setDatePicker(prevState => ({
        ...prevState,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        startDate: "", 
        endDate: "", 
        isCustom: true, 
        showAll: false,
        error: "",
        title: pick.title
      }))
    } else if(pick.title === "All") {
      setDatePicker(prevState => ({
        ...prevState,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        date: new Date().getDate(),
        startDate: "", 
        endDate: "",  
        isCustom: false, 
        showAll: true,
        error: "",
        title: pick.title
      }))
    } else {
      setDatePicker(prevState => ({
        ...prevState,
        year: moment(pick.startDate, dateFormat).get("year"),
        month: moment(pick.startDate, dateFormat).get("month") + 1, 
        startDate: pick.startDate, 
        endDate: pick.endDate, 
        showAll: false, 
        isCustom: false,
        error: "",
        title: pick.title
      }))
    }
  }

  return (
    <div className='flex'>
      <div className='flex flex-col p-4'>
        {getQuickPicks().map(pick => {
          const isSelected = getIsSelected(pick)
          return (
            <p 
              onClick={() => handleClick(pick)}
              key={pick.title} 
              className={`pl-4 pr-10 py-2 text-sm rounded-lg ${isSelected ? "bg-[#EDF2F7] text-[#0048D3]" : ""} hover:bg-[#EDF2F7] hover:text-[#0048D3] cursor-pointer`}
            >
              {pick.title}
            </p>
          )
        })}
      </div>
      <hr className='w-[1px] h-full bg-slate-300' />
    </div>
  )
}
