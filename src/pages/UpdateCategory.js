// Libraries
import React, {useContext, useState} from "react";
import {useLocation} from "react-router-dom";
import {ColorPicker} from "material-ui-color";

// App Context
import {AppContext} from "../contexts/AppContext";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {Button, Container, FormControl, FormLabel, IconButton, Slide, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// Material UI Icons
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import CloseIcon from "@material-ui/icons/Close";

// Component
const UpdateCategory = () => {
  // Get State
  const state = useContext(AppContext);

  // Location Hook
  const location = useLocation();

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
      },
      EmptyMessage: {
        textAlign: "center",
        color: state.profile.theme === 'light' ? "#c1c1c1" : "#606060",
        marginTop: "calc((100vh - 65px) / 2)",
        transform: "translateY(-50%)"
      }
    }
  ));

  // Classes Object
  const classes = useStyles();

  // Get Category Attributes With ID From URL
  let currentCategory = null;
  state.categories.map(category => {
    return category.id === location.pathname.split("/", 3)[2] ? (currentCategory = category) : null;
  });

  // Component Local State
  const [color, setColor] = useState(currentCategory !== null ? currentCategory.color : "#fd4f4f");
  const [category, setCategory] = useState(currentCategory !== null ? currentCategory.name : "");
  const [categoryErrorState, setCategoryErrorState] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

 if(currentCategory !== null ) {
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
       // Assign This Category Notes To 'Not Categorized'
       state.notes.map(note => {
         // If Current Note Has The Same Deleted Category
         if (note.category === currentCategory.name) {
           // Update This Note Category To 'Not Categorized'
           state.update("notes", {
             id: note.id,
             title: note.title,
             body: note.body,
             category: category,
             favourite: note.favourite
           });
         }
         // Return Nothing
         return null;
       })
       // Trigger Success Alert
       triggerAlert("success", "Category Edited Successfully");
       // Save Note To State
       state.update("categories", {
         id: currentCategory.id,
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
       No Category With This ID (Stop Playing)
     </Typography>
   )
 }
};

export default UpdateCategory;
