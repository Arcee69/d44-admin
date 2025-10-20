import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const ITEM_HEIGHT = 48;

export default function TableMenu({ options, action }) { 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPerformAction = (item) => {
    // action(item);
    handleClose()
  }

  return (
    <div>
      <IconButton
        aria-label="table-menu"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)"
          }
        }}
        anchorOrigin={{
          vertical: 30,
          horizontal: 20,
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div className='py-4 w-64 rounded'>
          {options.filter(op => op !== null).map((option) => (
            <p
              key={option}
              className="px-6 py-3 cursor-pointer hover:bg-[#F8F8F8] font-poppins"
              onClick={() => onPerformAction(option)}
            >
              {option}
            </p>
          ))}
        </div>
      </Menu>
    </div>
  );
}
