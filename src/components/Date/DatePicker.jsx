import Month from "./Month";
import QuickDatePicker from "./QuickDatePicker";
import BottomControl from "./BottomControl";
// import {DatePickerProvider} from "./datepickerContext"

export default function DatePicker({datePickerProps, setDatePickerProps, handleCancel, handleApply}) {

  // for datePicker to work you must provide a react state similar to the one below or simply use the useDatePicker hook in the index.js file

  // const [datePicker, setDatePicker] = useState({
  //   year: new Date().getFullYear(),
  //   month: new Date().getMonth() + 1,
  //   date: new Date().getDate(),
  //   startDate: "",
  //   endDate: "",
  //   isCustom: false,
  //   showAll: true,
  //   error: "",
  //   title: "All"
  // })
  
  return (
    <div className="flex rounded-lg">
      <QuickDatePicker setDatePicker={setDatePickerProps} datePicker={datePickerProps} />
      <div className="flex flex-col">
        <div className="px-4 flex">
          <Month datePicker={datePickerProps} setDatePicker={setDatePickerProps} />
          {
            datePickerProps.isCustom &&
            <>
              <hr className='w-[1px] h-full bg-slate-300 mx-4' />
              <Month datePicker={datePickerProps} setDatePicker={setDatePickerProps} isNextMonth />
            </>  
          } 
        </div>
        <hr className='w-full h-[1px] bg-slate-300' />
        <BottomControl datePicker={datePickerProps} handleCancel={handleCancel} handleApply={handleApply} />
      </div>
    </div>
  )
}
