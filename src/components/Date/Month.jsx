import Day from "./Day";
import lessThan from "./assets/lessThan.svg"
import greaterThan from "./assets/greaterThan.svg"
import moment from "moment"


export default function Month({ datePicker, setDatePicker, isNextMonth=false }) {

  const {month, year} = datePicker
  const newMonth = isNextMonth ? (+month < 12 ? +month + 1 : 1) : month
  const newMonthYear = isNextMonth ? (+month < 12 ? year : +year + 1) : year

  const TOTAL_DAYS = 42
  const firstDayOfMonth = getMonthFirstDay(newMonth, newMonthYear)
  const daysInMonth = moment(`${newMonthYear}-${newMonth}`, "YYYY-MM").daysInMonth()
  const previousMonthYear = +newMonth > 1 ? newMonthYear : +newMonthYear - 1
  const previousMonth = +newMonth > 1 ? +newMonth - 1 : 12
  const daysInPrevMonth = moment(`${previousMonthYear}-${previousMonth}`, "YYYY-MM").daysInMonth()
  const daysFromPreviousMonth = firstDayOfMonth - 1
  const nextMonthYear = +newMonth < 12 ? newMonthYear : +newMonthYear + 1
  const nextMonth = +newMonth < 12 ? +newMonth + 1 : 1
  // const daysInNextMonth = moment(`${nextMonthYear}-${nextMonth}`, "YYYY-MM").daysInMonth()
  const daysFromNextMonth = TOTAL_DAYS - (daysFromPreviousMonth + daysInMonth)
  const daysInMonthArray = new Array(daysInMonth).fill("current")
  const daysFromPreviousMonthArray = new Array(daysFromPreviousMonth).fill("previous")
  const daysFromNextMonthArray = new Array(daysFromNextMonth).fill("next")
  const days = daysFromPreviousMonthArray.concat(daysInMonthArray).concat(daysFromNextMonthArray)

  return (
    <div>
      <div className="mb-4 flex justify-between px-2 py-4">
        <img 
          src={lessThan} 
          alt="previous month" 
          className="cursor-pointer" 
          onClick={() => {setDatePicker(prevState => ({...prevState, month: previousMonth, year: previousMonthYear}))}} 
        />
        <strong>{`${MONTHS[+newMonth - 1]} ${newMonthYear}`}</strong>
        <img 
          src={greaterThan} 
          alt="next month" 
          className="cursor-pointer"
          onClick={() => {setDatePicker(prevState => ({...prevState, month: nextMonth, year: nextMonthYear}))}} 
        />
      </div>
      <div className="grid grid-cols-[repeat(7,1fr)] justify-center mb-3">
        {weekdayLabels.map(dayLabel => (
          <div className='text-center text-sm' key={newMonth+dayLabel}>
            {dayLabel}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[repeat(7,2.5rem)] justify-center">
        {days.map((position, index) => {

          let date;
          if (position === "previous") {
            const day = daysInPrevMonth - (daysFromPreviousMonth - (index+1))
            date = `${previousMonthYear}-${previousMonth}-${day}`
          } else if (position === "next") {
            const day = (index+1) - (daysFromPreviousMonth + daysInMonth)
            date = `${nextMonthYear}-${nextMonth}-${day}`
          } else {
            const day = (index+1) - daysFromPreviousMonth 
            date = `${newMonthYear}-${newMonth}-${day}`
          }
          
          return (
            <Day
              key={date}
              datePicker={datePicker}
              position={position}
              date={date}
              setDatePicker={setDatePicker}
              index={index+1}
            />
          )
        })}
      </div>
    </div>
  );
}

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTHS = ["January", "February","March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const getMonthFirstDay = (month, year) => {
  return +(new Date(`${year}-${`${month}`.padStart(2, '0')}-01`).getDay()) + 1;
}