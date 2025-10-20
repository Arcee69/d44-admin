import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function AnalyticsTable({ data, column }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          {
            column.map((col) => (
                <TableCell key={col.id}  style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}}>
                  {col.name}
                </TableCell>
            ))
          }
          </TableRow>
          {/* <TableRow>
            <TableCell style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}}>Participant</TableCell>
            <TableCell style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}} align="left">Email</TableCell>
            <TableCell style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}} align="left">Entries</TableCell>
            <TableCell style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}} align="left">Date Created</TableCell>
            <TableCell style={{fontFamily: "Poppins", fontWeight: 500, fontSize: 14}} align="left">Status</TableCell>
          </TableRow> */}
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
           
            >
              <TableCell component="th" scope="row" className='flex shadow-none border-none'>
                 <TableCell align="left"><img src={row.image} alt="Analytics-image"/></TableCell>
                 <TableCell align="left" style={{fontWeight: "bold"}}>{row.contest || "Not Available"}</TableCell>
        
              </TableCell>
              <TableCell align="left" style={{fontWeight: "bold"}}>{row.category || "Not Available"}</TableCell>
              <TableCell align="left" style={{fontWeight: "bold"}}>{row.views || "Not Available"}</TableCell>
              <TableCell align="left" style={{fontWeight: "bold"}}>{row.participation || "Not Available"}</TableCell>
              <TableCell align="left" style={{fontWeight: "bold"}}>{row.votes || "Not Available"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
