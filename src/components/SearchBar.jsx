import React from 'react'
import search from "../assets/icons/search.svg";
// import filter from "assets/icons/filter.svg";
import Menu from "@mui/material/Menu";
// import Text from './Typography/Typography';
// import { IconButton, List, ListItem } from '@material-ui/core';
// import { Close } from '@material-ui/icons';
import { Button } from '@mui/material';
// import Filter from './Filter';

export default function SearchBar({ placeholder, showExport = false, onFocus, handleSearch, value, ifFilter, FilterComponent, filterComponentProps, readOnly }) {

  const [exportAnchor, setExportAnchor] = React.useState(null);
  const openExport = Boolean(exportAnchor);

  const handleExportClick = (event) => {
    setExportAnchor(event.currentTarget);
  };
  const handleExportClose = () => {
    setExportAnchor(null);
  };

  return (
    <div className="flex items-center w-full mt-2">
      <div className='flex gap-4 w-full'>
        <div className={`${showExport ? "w-[90%]" : "w-full"}`}>
          <div className="flex items-center font-normal focus:outline-none relative">
            <img
              src={search}
              alt="search"
              className="absolute left-3 w-4 h-4"
              loading="lazy"
            />
            <input
              onChange={(e) => handleSearch(e)}
              onFocus={onFocus}
              readOnly={readOnly}
              placeholder={placeholder}
              className="text-TITLE text-base outline-none bg-[#EDF2F7] opacity-70 rounded-md pl-10 p-3.5"
              style={{ width: "100%" }}
              defaultValue={value || ""}
            />
            {/* {ifFilter && <Filter FilterComponent={FilterComponent} filterComponentProps={filterComponentProps} />} */}
          </div>
        </div>
        {showExport && <Button onClick={handleExportClick} sx={{ padding: "8px 40px", border: "1px solid #E8E9EB", color: "black", textTransform: "capitalize", fontFamily: `"DM Sans"`, fontSize: "16px", width: "10%" }}>Export</Button>}
      </div>
      {showExport && (
        <Menu
          id="exportButton"
          anchorEl={exportAnchor}
          open={openExport}
          onClose={handleExportClose}
          anchorOrigin={{
            vertical: 55,
            horizontal: 125,
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          MenuListProps={{
            "aria-labelledby": "basic-export-button",
          }}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              width: "300px"
            },
          }}
        >
          <div className='py-4 rounded'>
            {exportOptions.map((option) => (
              <p
                key={option}
                className="px-6 py-3 cursor-pointer hover:bg-[#F8F8F8] font-poppins"
                onClick={() => handleExportClose()}
              >
                {option}
              </p>
            ))}
          </div>
        </Menu>
      )}
    </div>
  )
}

const exportOptions = ["CSV", "PDF", "Excel"]
