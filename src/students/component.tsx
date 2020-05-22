import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import { Student } from '../interfaces/student';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import {
  Link
} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});


export default function ListStudents({ students, onDelete }: { students: Student[], onDelete: (id: string) => void }) {
  const classes = useStyles();

  return (<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Last Name</TableCell>
          <TableCell>Phone Number</TableCell>
          <TableCell align="right">GPA</TableCell>
          <TableCell align="right">
            <IconButton component={Link} to={`/create`} aria-label="create">
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {students.map((row) => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.firstName}
            </TableCell>
            <TableCell>{row.lastName}</TableCell>
            <TableCell>{row.phoneNumber}</TableCell>
            <TableCell align="right">{row.gpa}</TableCell>
            <TableCell align="right">
              <IconButton component={Link} to={`/${row.id}`} aria-label="delete">
                <OpenInNewIcon />
              </IconButton>
              <IconButton onClick={() => onDelete(row.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>)
}