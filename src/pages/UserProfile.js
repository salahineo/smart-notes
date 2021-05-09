// Libraries
import React, {useContext, useState} from "react";

// Material UI Components
import {makeStyles} from "@material-ui/core/styles";
import {
  Avatar,
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
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// App Context
import {AppContext} from "../contexts/AppContext";

// Component
const UserProfile = () => {
  // Get Notes & Its Methods
  const state = useContext(AppContext);

  // Component Local State
  const [username, setUsername] = useState(state.profile.username);
  const [avatar, setAvatar] = useState(state.profile.avatar);
  const [theme, setTheme] = useState(state.profile.theme);
  const [usernameErrorState, setUsernameErrorState] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertState, setAlertState] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  // Custom CSS Classes Style
  const useStyles = makeStyles(theme => ({
      formControl: {
        marginTop: 20,
        marginBottom: 30,
        display: "block"
      },
      field: {
        marginTop: 10,
        marginBottom: 10
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
        right: 20,
        backgroundColor: state.profile.theme === 'dark' ? (alertState === 'success' ? '#495d49' : '#563a38') : ''
      },
      avatarsContainer: {
        paddingTop: 20,
        display: "flex",
        flexWrap: 'wrap'
      },

      avatarContainer: {
        position: "relative"
      },
      avatar: {
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2),
        cursor: "pointer"
      },
      activeAvatarIcon: {
        position: "absolute",
        bottom: -13,
        left: -8,
        zIndex: 3,
        color: "#55cc48",
        fontSize: 20
      }
    }
  ));

  // Classes Object
  const classes = useStyles();

  // List Of Avatars
  const avatars = [
    {
      id: 1,
      src: "/images/guest.jpg"
    },
    {
      id: 2,
      src: "/images/mafia.jpg"
    },
    {
      id: 3,
      src: "/images/boy_1.jpg"
    },
    {
      id: 4,
      src: "/images/boy_2.jpg"
    },
    {
      id: 5,
      src: "/images/boy_3.jpg"
    },
    {
      id: 6,
      src: "/images/girl_1.jpg"
    },
    {
      id: 7,
      src: "/images/girl_2.jpg"
    },
    {
      id: 8,
      src: "/images/girl_3.jpg"
    },

  ];

  // Handle Submit Form Method
  const handleSubmit = (e) => {
    // Prevent Default Action For Form Submission
    e.preventDefault();
    // Reset Error State
    setUsernameErrorState(false);
    // Check If Title Field Empty
    if (username === "") {
      // Set Title Error For Empty
      setUsernameErrorState(true);
      // Trigger Error Alert
      triggerAlert("error", "Username is Required");
    } else {
      // Trigger Success Alert
      triggerAlert("success", "Profile Saved Successfully");
      // Save Profile To State
      state.updateProfile({
        avatar: avatar,
        username: username,
        theme: theme
      });
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
        <FormControl className={classes.formControl}>
          <FormLabel color="primary">Username</FormLabel>
          <TextField
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className={classes.field}
            color="primary"
            variant="outlined"
            fullWidth
            required
            error={usernameErrorState}
          />
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel color="primary">Avatar</FormLabel>
          <div className={classes.avatarsContainer}>
            {
              // Loop Through All Avatars
              avatars.map(currentAvatar => {
                return (
                  <div key={currentAvatar.id} className={classes.avatarContainer}>
                    {
                      // Check If Current Avatar Is Active
                      currentAvatar.src === avatar ? (<CheckCircleIcon className={classes.activeAvatarIcon} />) : null
                    }
                    <Avatar src={currentAvatar.src}
                            className={classes.avatar}
                            onClick={(e) => setAvatar(e.target.getAttribute("src"))}
                    />
                  </div>
                );
              })
            }
          </div>
        </FormControl>
        <FormControl className={classes.formControl}>
          <FormLabel color="primary">Theme</FormLabel>
          <Select
            fullWidth
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            variant="outlined"
            className={classes.select}
          >
            <MenuItem key="light" value="light">Light</MenuItem>
            <MenuItem key="dark" value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Save
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

// Export Component
export default UserProfile;
