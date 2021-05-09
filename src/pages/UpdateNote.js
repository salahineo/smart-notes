// Libraries
import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";

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
  TextField,
  Typography
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// Material UI Icons
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CloseIcon from "@material-ui/icons/Close";

// Component
const UpdateNote = () => {
  // Location Hook
  const location = useLocation();

  // Get State
  const state = useContext(AppContext);

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
      EmptyMessage: {
        textAlign: "center",
        color: state.profile.theme === 'light' ? "#c1c1c1" : "#606060",
        marginTop: "calc((100vh - 65px) / 2)",
        transform: "translateY(-50%)"
      }
    }
  ));

  // Get Note Attributes With ID From URL
  let currentNote = null;
  state.notes.map(note => {
    return note.id === location.pathname.split("/", 3)[2] ? (currentNote = note) : null;
  });

  // Classes Object
  const classes = useStyles();

  // Component Local State
  const [title, setTitle] = useState(currentNote !== null ? currentNote.title : "");
  const [body, setBody] = useState(currentNote !== null ? currentNote.body : "");
  const [titleErrorState, setTitleErrorState] = useState(false);
  const [bodyErrorState, setBodyErrorState] = useState(false);
  const [category, setCategory] = useState(currentNote !== null ? currentNote.category : "");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  if (currentNote !== null) {
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
        triggerAlert("success", "Note Edited Successfully");
        // Save Note To State
        state.update("notes", {
          id: currentNote.id,
          title: title,
          body: body,
          category: category,
          favourite: currentNote.favourite
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
            Edit
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
  } else {
    return (
      <Typography variant="h5"
                  component="h2"
                  className={classes.EmptyMessage}
      >
        No Note With This ID (Stop Playing)
      </Typography>
    );
  }
};

// Export Component
export default UpdateNote;
