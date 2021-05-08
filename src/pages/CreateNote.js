// Libraries
import React, {useContext, useState} from "react";
import {v4 as uuidv4} from "uuid";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  Slide,
  TextField
} from "@material-ui/core";
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
    }
  }
));

// Component
const CreateNote = () => {
  // Get State
  const state = useContext(AppContext);

  // Classes Object
  const classes = useStyles();

  // Component Local State
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleErrorState, setTitleErrorState] = useState(false);
  const [bodyErrorState, setBodyErrorState] = useState(false);
  const [category, setCategory] = useState("Not Categorized");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Handle Submit Form Method
  const handleSubmit = (e) => {
    // Prevent Default Action For Form Submission
    e.preventDefault();
    // Reset Error State
    setTitleErrorState(false);
    setBodyErrorState(false);
    // Check If Title Field Empty
    if (title === "") {
      // Set Title Error For Empty
      setTitleErrorState(true);
    }
    // Check If Note Field Empty
    if (body === "") {
      // Set Note Error For Empty
      setBodyErrorState(true);
    }

    // Check For Alert Errors
    if (title === "" || body === "") {
      // Trigger Error Alert
      triggerAlert("error", "All Fields Are Required");
    } else {
      // Trigger Success Alert
      triggerAlert("success", "Note Saved Successfully");
      // Save Note To State
      state.add("notes", {
        id: uuidv4(),
        title: title,
        body: body,
        category: category,
        favourite: false
      });
      // Empty Fields
      setBody("");
      setTitle("");
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
          <FormLabel color="primary">Note Details</FormLabel>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={classes.field}
            label="Note Title"
            color="primary"
            variant="outlined"
            fullWidth
            required
            error={titleErrorState}
          />
          <TextField
            onChange={(e) => setBody(e.target.value)}
            value={body}
            className={classes.field}
            label="Note Body"
            variant="outlined"
            color="primary"
            multiline
            rows={5}
            fullWidth
            required
            error={bodyErrorState}
          />
        </FormControl>
        <FormControl className={classes.field}>
          <FormLabel color="primary">Category</FormLabel>
          <Select
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
            className={classes.select}
          >
            {
              state.categories.map(category => {
                return (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                );
              })
            }
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<KeyboardArrowRightIcon />}
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

export default CreateNote;
