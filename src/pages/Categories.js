// Libraries
import React, {useContext} from "react";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

// Material UI Icons
import {Container, IconButton, Typography} from "@material-ui/core";
import {Delete, Edit} from "@material-ui/icons";

// App Context
import {AppContext} from "../contexts/AppContext";

// Custom CSS Classes Style
const useStyles = makeStyles({
  tableContainer: {
    marginTop: 20
  },
  tableHead: {
    backgroundColor: "#3f51b5",
    "& > tr th": {
      fontSize: 16,
      color: "#ffffff"
    }
  },
  categoryColorContainer: {
    display: "inline-block",
    padding: 2,
    borderRadius: "50%"
  },
  categoryColor: {
    width: 30,
    height: 30,
    display: "block",
    borderRadius: "50%"
  },
  deleteHover: {
    transition: "0.15s",
    "&:hover": {
      color: "#ff4e5e"
    }
  },
  editHover: {
    transition: "0.15s",
    "&:hover": {
      color: "#ff7700"
    }
  },
  disabled: {
    cursor: 'not-allowed !important'
  },
  note: {
    margin: "30px auto 10px",
    padding: "10px 12px",
    backgroundColor: "#efefef",
    borderLeft: "4px solid #3f51b5"
  },
  EmptyMessage: {
    textAlign: "center",
    color: "#c1c1c1",
    marginTop: "calc((100vh - 65px) / 2)",
    transform: "translateY(-50%)"
  }
});

// Component
const Categories = () => {
  // Get Notes & Its Methods
  const state = useContext(AppContext);

  // Classes Object
  const classes = useStyles();

  // History Hooks
  const history = useHistory();

  // Sweet Alert Library
  const MySwal = withReactContent(Swal);

  // Handle Delete Method
  const handleCategoryDelete = (category) => {
    // Confirmation Dialogue
    MySwal.fire({
      title: "Are you sure?",
      text: "All notes assigned to this category, will be assigned to 'Not Categorized'!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Assign This Category Notes To 'Not Categorized'
        state.notes.map(note => {
          // If Current Note Has The Same Deleted Category
          if (note.category === category.name) {
            // Update This Note Category To 'Not Categorized'
            state.update("notes", {
              id: note.id,
              title: note.title,
              body: note.body,
              category: "Not Categorized",
              favourite: note.favourite
            });
          }
          // Return Nothing
          return null;
        });
        // Trigger Note Delete Method
        state.remove("categories", category.id);
        // Success Dialogue
        MySwal.fire(
          "Deleted!",
          "This note has been deleted.",
          "success"
        );
      }
    });
  };

  // View
  return (
    <Container>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Control</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              // Loop Through All Categories
              state.categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell component="th" scope="category">
                    {category.name}
                  </TableCell>
                  <TableCell>
                    <div className={classes.categoryColorContainer} style={{
                      border: `2px solid ${category.color}`
                    }}>
                  <span className={classes.categoryColor}
                        style={{backgroundColor: category.color}} />
                    </div>
                  </TableCell>
                  {
                    // Check Not Categorized Control
                    category.name === "Not Categorized" ?
                      (
                        <TableCell>
                          <IconButton
                            color="inherit"
                            disabled
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="inherit"
                            disabled
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      )
                      : (
                        <TableCell>
                          <IconButton
                            color="inherit"
                            className={classes.editHover}
                            onClick={() => history.push(`/update-category/${category.id}`)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            onClick={() => handleCategoryDelete(category)}
                            color="inherit"
                            className={classes.deleteHover}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      )
                  }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="body2" color="textSecondary" component="p" className={classes.note}>
        " Not Categorized " category can't be edited or removed, as it is the default category for new notes.
      </Typography>
    </Container>
  );
};

// Export Component
export default Categories;
