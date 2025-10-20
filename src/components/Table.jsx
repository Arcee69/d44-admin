import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({ data, column }) {
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
              <TableCell component="th" scope="row" className='flex flex-col gap-1'>
                <p>{row.participant || ""}</p>
                <p className='text-NEUTRAL-_1100 text-sm'>{row.participantEmail || ""}</p>
              </TableCell>
              <TableCell align="left">{row.email || row.votes || ""}</TableCell>
              <TableCell align="left">{row.entries || ""}</TableCell>
              <TableCell align="left">{row.dateCreated || ""}</TableCell>
              <TableCell align="left">{row.status|| ""}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
