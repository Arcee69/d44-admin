/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import moment from "moment";

export default function Day({ datePicker, setDatePicker, position, date, index }) {

  const { startDate, endDate } = datePicker
  // const month = moment(date).get("month")
  // const year = moment(date).get("year")
  const day = moment(date).get("date")
  const isRightEdge = index % 7 === 0
  const isLeftEdge = index % 7 === 1
  const [isStartDate, setIsStartDate] = useState(false)
  const [isEndDate, setIsEndDate] = useState(false)
  const [dateIsWithinRange, setDateIsWithinRange] = useState(false)

  const setStartOrEndDate = () => {
    const isStartDate = startDate ? moment(startDate).isSame(date) : false
    const isEndDate = endDate ? moment(endDate).isSame(date) : false
    setIsEndDate(isEndDate)
    setIsStartDate(isStartDate)
  }

  const setRange = () => {
    if (startDate && endDate) {
      const isRange = moment(date).isBetween(startDate, endDate)
      setDateIsWithinRange(isRange)
    } else {
      setDateIsWithinRange(false)
    }
  }

  useEffect(() => {
    setStartOrEndDate()
    setRange()
  }, [datePicker])

  const handleClick = (e) => {

    let inValidRange
    if (startDate && !endDate) {
      inValidRange = moment(date).isBefore(startDate)
      inValidRange && setDatePicker(prevState => ({ ...prevState, error: "End date cannot be before start date" }))
    }
    if (!inValidRange) {
      setDatePicker(prevState => {
        return (
          !prevState.startDate ?
            { ...prevState, startDate: date, isCustom: true, showAll: false, error: "" } :
            !prevState.endDate ?
              { ...prevState, endDate: date, error: "" } :
              { ...prevState, startDate: date, endDate: "", isCustom: true, showAll: false, error: "" }
        )
      })
    }


  }

  const onMouseEnter = (e) => {
    // console.log(e.target);
  }

  return (
    <button
      onClick={handleClick}
      // onKeyDown={onKeyDown}
      onMouseEnter={onMouseEnter}
      // tabIndex={tabIndex}
      type="button"
      // ref={dayRef}
      className={`text-sm p-2 w-10 h-10 border-0 hover:bg-[#EDF2F7] hover:text-[#0048D3] hover:rounded-full ${dateIsWithinRange || isStartDate || isEndDate ? "bg-[#EDF2F7]" : ""} ${isStartDate || (dateIsWithinRange && isLeftEdge) ? "rounded-tl-full rounded-bl-full" : ""} ${positionMapping[position]} relative ${isEndDate || (dateIsWithinRange && isRightEdge) ? "rounded-tr-full rounded-br-full" : ""} mb-1`}
    >
      {day}
      {(isStartDate || isEndDate) && <div className="absolute w-full h-full flex items-center justify-center top-0 left-0 rounded-full text-white bg-[#0048D3]">{day}</div>}
    </button>
  );
}

// const colorMapping = {
//   selectedFirstOrLastColor: "text-[#FFFFFF]",
//   normalColor: "text-[#001217]",
//   selectedColor: "text-[#0048D3]",
//   rangeHoverColor: "text-[#0048D3]",
//   disabledColor: "text-[#808285]"
// }

// const bgMapping = {
//   selectedFirstOrLastColor: "bg-[#0048D3]",
//   normalColor: "bg-[#FFFFFF]",
//   selectedColor: "bg-[#EDF2F7]",
//   rangeHoverColor: "bg-[#EDF2F7]",
//   disabledColor: "bg-[#FFFFFF]"
// }

const positionMapping = {
  current: "text-[#344054]",
  previous: "text-[#667085]",
  next: "text-[#667085]"
}
