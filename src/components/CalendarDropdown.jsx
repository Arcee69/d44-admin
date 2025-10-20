import React, {useState} from "react";
// import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import useDatePicker from "./Date";

const defaultDate = {
  startDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
  endDate: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
}

export default function CalenderDropdown({className, onChange, initialDate=defaultDate}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {datePickerProps, setDatePickerProps, DatePicker} = useDatePicker(initialDate)

  const [calendar, setCalendar] = useState({
    startDate: datePickerProps.startDate,
    endDate: datePickerProps.endDate,
    title: datePickerProps.title
  })

  return (
    <div>
      <Button
        sx={{
          backgroundColor: "white",
          color: "black",
          "&:hover": {
            backgroundColor: "white",
          },
          padding: "0",
        }}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        // endIcon={<KeyboardArrowDownIcon />}
      >
        <div className={className}>
          {calendar.title}
        </div>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: 30,
          horizontal: 150,  
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "scroll",  //visible
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            borderRadius: 3,
            padding: 0,
          },
        }}
      >
        <DatePicker 
          datePickerProps={datePickerProps} 
          setDatePickerProps={setDatePickerProps} 
          handleCancel={() => {handleClose()}}
          handleApply={(data) => {
            const {startDate, endDate, title} = data
            setCalendar({
              startDate,
              endDate,
              title
            })
            onChange && onChange(data)
            handleClose()
          }}
        />
      </Menu>
    </div>
  );
}
