import {useState} from 'react'
import moment from 'moment'
import DatePicker from './DatePicker'
import { getQuickPicks } from './utilities'

const defaultDate = {
  startDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}

export default function useDatePicker(initialDate=defaultDate) {

  let startYear;
  let startMonth;
  let startDate;
  let initialStartDate;
  let initialEndDate;

  if(new Date(initialDate?.startDate)?.getFullYear() && new Date(initialDate?.endDate)?.getFullYear()) {
    startYear = new Date(initialDate?.startDate).getFullYear()
    startMonth = new Date(initialDate?.startDate).getMonth() + 1
    startDate = new Date(initialDate?.startDate).getDate()

    const endYear = new Date(initialDate?.startDate).getFullYear()
    const endMonth = new Date(initialDate?.startDate).getMonth() + 1
    const endDate = new Date(initialDate?.startDate).getDate()

    initialStartDate = `${startYear}-${startMonth}-${startDate}`
    initialEndDate = `${endYear}-${endMonth}-${endDate}`

  } else {
    throw new Error("Invalid Date")
  }


  const title = getQuickPicks().find(pick => {
    const {startDate, endDate, title} = pick
    if (startDate && endDate && moment(initialStartDate).isSame(startDate) && moment(initialEndDate).isSame(endDate) ) {
      return true
    } else if (title === "Custom") {
      return true
    } else {
      return false
    }
    
  }).title

  const [datePickerProps, setDatePickerProps] = useState({
    title,
    isCustom: title === "Custom",
    year: startYear,
    month: startMonth,
    date: startDate,
    startDate: initialStartDate,
    endDate: initialEndDate,
    showAll: false,
    error: "",
  })

  return {datePickerProps, setDatePickerProps, DatePicker}
}

// usage

//step 1: create initialDate (optional)
// const initialDate = {startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD"}

// step 2: call the hook
// const {datePickerProps, setDatePickerProps, DatePicker} = useDatePicker(initialDate)
// If you don't pass the initialDate prop, the hook automatically uses the currentDate

// step 3: render the component and pass the props need
// <DatePicker datePickerProps={datePickerProps} setDatePickerProps={setDatePickerProps} />
