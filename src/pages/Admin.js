// Libraries
import React, {useContext} from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {Button, Container, Divider, Typography} from "@material-ui/core";

// Material UI Icons
import TransitEnterexitIcon from "@material-ui/icons/TransitEnterexit";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import RestoreIcon from "@material-ui/icons/Restore";

// Material UI Colors
import red from "@material-ui/core/colors/red";


// Component
const Admin = () => {
  // Get State
  const state = useContext(AppContext);

  // Custom CSS Classes Style
  const useStyles = makeStyles(theme => ({
      icon: {
        transform: "rotate(180deg)"
      },
      section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        marginBottom: 20,
        "&:nth-of-type(2)": {
          marginTop: 20
        }
      },
      button: {
        margin: "20px 0 0",
        flexGrow: 0
      },
      dangerButton: {
        margin: "20px 0 0",
        backgroundColor: state.profile.theme === "light" ? red[500] : red[400],
        color: "#ffffff",
        "&:hover": {
          backgroundColor: state.profile.theme === "light" ? red[600] : red[500]
        }
      }
    }
  ));

  // Classes Object
  const classes = useStyles();

  // Sweet Alert Library
  const MySwal = withReactContent(Swal);

  // Handle Export Method
  const handleExport = () => {
    // Trigger Dialogue With Data
    MySwal.fire({
      title: "Export All Data",
      text: "Copy data shown in the next text field, and save it on your machine. Come back with this data anytime to import & restore it",
      input: "text",
      inputValue: state.exportData(),
      inputAttributes: {
        "readonly": true,
        "style": "font-size: 14px"
      },
      confirmButtonText: "Ok, I copied it."
    });
  };

  // Handle Import Method
  const handleImport = async () => {
    // Trigger Dialogue To Get Data
    const {value: data} = await MySwal.fire({
      title: "Export All Data",
      text: "Paste data which you have exported before, to restore it. If application breakdown (due to note correct data) , route to '/admin', then restore every thing",
      input: "text",
      inputPlaceholder: "Paste data here",
      inputAttributes: {
        "style": "font-size: 14px"
      },
      confirmButtonText: "Restore",
      inputValidator: (value) => {
        if (!value) {
          return "You need to paste data to restore it!";
        }
      }
    });
    // Check If Data Pasted
    if (data) {
      // Restore Data
      await state.importData(data);
    }
  };

  // Handle Restore To Defaults Method
  const handleRestore = () => {
    // Trigger Dialogue With Data
    MySwal.fire({
      title: "Restore To Defaults",
      text: "Restore application data to defaults, will remove all notes, categories, & profile data",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Restore"
    }).then((result) => {
      if (result.isConfirmed) {
        // Restore Data
        state.restore();
        // Success Dialogue
        MySwal.fire(
          "Deleted!",
          `Application data restored`,
          "success"
        );
      }
    });
  };

  // Handle Clear All Method
  const handleClearAll = (property) => {
    // Confirmation Dialogue
    MySwal.fire({
      title: `Are you sure to delete all ${property}?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Check For Categories Property
        if (property === "categories") {
          // Assign All Notes To 'Not Categorized' Category
          let temp = state.notes.map(note => {
            // Return Nothing
            return {
              id: note.id,
              title: note.title,
              body: note.body,
              category: "Not Categorized",
              favourite: note.favourite
            };
          });
          // Update All Notes Method
          state.updateAllNotes(temp);
        }
        // Clear All Notes
        state.clearAll(property);
        // Success Dialogue
        MySwal.fire(
          "Deleted!",
          `All ${property} have been deleted`,
          "success"
        );
      }
    });
  };

  return (
    <Container>
      <div className={classes.section}>
        <Typography variant="h6" component="h2" color="textSecondary">Export & Import Your Data</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TransitEnterexitIcon className={classes.icon} />}
          className={classes.button}
          onClick={handleExport}
          size="small"
        >
          Export Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<TransitEnterexitIcon />}
          className={classes.button}
          onClick={handleImport}
          size="small"
        >
          Import Data
        </Button>
      </div>
      <Divider />
      <div className={classes.section}>
        <Typography variant="h6" component="h2" color="error">Danger Zone</Typography>
        <Button
          variant="contained"
          startIcon={<ErrorIcon />}
          className={classes.dangerButton}
          onClick={() => handleClearAll("notes")}
          size="small"
        >
          Clear All Notes
        </Button>
        <Button
          variant="contained"
          startIcon={<WarningIcon />}
          className={classes.dangerButton}
          onClick={() => handleClearAll("categories")}
          size="small"
        >
          Clear All Categories
        </Button>
        <Button
          variant="contained"
          startIcon={<RestoreIcon />}
          className={classes.dangerButton}
          onClick={handleRestore}
          size="small"
        >
          Restore Defaults
        </Button>
      </div>
    </Container>
  );

};

// Export Component
export default Admin;
