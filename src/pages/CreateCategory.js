// Libraries
import React, {useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {ColorPicker} from "material-ui-color";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {Button, Container, FormControl, FormLabel, IconButton, Slide, TextField} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// Material UI Icons
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CloseIcon from "@material-ui/icons/Close";

// Custom CSS Classes Style
const useStyles = makeStyles(theme => ({
    field: {
      marginTop: 20,
      marginBottom: 20,
      display: "block"
    },
    select: {
      marginTop: 20,
      marginBottom: 20
    },
    alertContainer: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    },
    alert: {
      maxWidth: "300px",
      position: "absolute",
      top: 75,
      right: 20
    },
    colorPickerContainer: {
      marginTop: 20,
      "& button": {
        width: 60,
        height: 30
      },
      "& button div": {
        width: 55,
        height: 25
      }
    },
    addButton: {
      marginTop: 25
    }
  }
));

// Component
const CreateCategory = () => {
  // Get State
  const state = useContext(AppContext);

  // Classes Object
  const classes = useStyles();

  // Component Local State
  const [color, setColor] = useState("#dedede");
  const [category, setCategory] = useState("");
  const [categoryErrorState, setCategoryErrorState] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Handle Submit Form Method
  const handleSubmit = (e) => {
    // Prevent Default Action For Form Submission
    e.preventDefault();
    // Reset Error State
    setCategoryErrorState(false);
    // Check If Note Field Empty
    if (category === "") {
      // Set Note Error For Empty
      setCategoryErrorState(true);
      // Trigger Error Alert
      triggerAlert("error", "Category Should Have a Name");
    } else {
      // Trigger Success Alert
      triggerAlert("success", "Category Saved Successfully");
      // Save Note To State
      state.add("categories", {
        id: uuidv4(),
        name: category,
        color: color
      });
      // Empty Fields
      setCategory("");
    }
  };

  // Trigger Alert Method
  const triggerAlert = (state, message) => {
    // Set Alert State
    setAlertState(state);
    // Set Alert Message
    setAlertMessage(message);
    // Open Alert
    setOpenAlert(true);
  };

  // Component View
  return (
    <Container>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <FormControl className={classes.field}>
          <FormLabel color="primary">Category Name</FormLabel>
          <TextField
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className={classes.field}
            placeholder="Category Name"
            variant="outlined"
            color="primary"
            fullWidth
            required
            error={categoryErrorState}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel color="primary">Category Color</FormLabel>
          <div className={classes.colorPickerContainer}>
            <ColorPicker value={color} hideTextfield onChange={(color) => setColor(`#${color.hex}`)} />
          </div>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<KeyboardArrowRightIcon />}
          className={classes.addButton}
        >
          Add
        </Button>
      </form>
      <Slide direction="left" in={openAlert} mountOnEnter unmountOnExit>
        <Alert
          className={classes.alert}
          severity={alertState}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpenAlert(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      </Slide>
    </Container>
  );
};

export default CreateCategory;
