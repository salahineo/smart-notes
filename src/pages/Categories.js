// Libraries
import React, {useContext} from "react";

// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Material UI Icons
import {IconButton} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";

// App Context
import {AppContext} from "../contexts/AppContext";

// Custom CSS Classes Style
const useStyles = makeStyles({
  categoryColor: {
    width: 40,
    height: 40,
    display: 'block',
    borderRadius: '50%'
  },
  tableHead: {
    backgroundColor: '#3f51b5'
  },
  tableHeadCell: {
    fontSize: 16,
    color: '#fff'
  }
});

// Component
const Categories = () => {
  // Get Notes & Its Methods
  const state = useContext(AppContext);

  // Classes Object
  const classes = useStyles();

  // View
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Color</TableCell>
            <TableCell>Control</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell component="th" scope="category">
                {category.name}
              </TableCell>
              <TableCell><span className={classes.categoryColor} style={{backgroundColor: category.color}} /></TableCell>
              <TableCell>
                <IconButton
                  color="inherit"
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="inherit"
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// Export Component
export default Categories;
