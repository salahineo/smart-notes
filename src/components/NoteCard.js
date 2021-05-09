// Libraries
import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// Material-UI Components
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import {Delete, Edit, MoreVertOutlined, Star, StarOutline} from "@material-ui/icons";

// Helpers
import {CheckLightOrDark} from "../helpers/CheckLightOrDark";

// App Context
import {AppContext} from "../contexts/AppContext";

// Component
const NoteCard = ({note}) => {
  // App State
  const state = useContext(AppContext);

  // History Hooks
  const history = useHistory();

  // Custom CSS Classes Style
  const useStyle = makeStyles({
    avatarBackground: {
      backgroundColor: state.profile.theme === "light" ? "#3f51b5" : "#7f91ff"
    },
    cardTitle: {
      fontSize: 16,
      display: "block"
    },
    CardBody: {
      whiteSpace: "break-spaces",
      wordBreak: `break-all`
    },
    MenuItemEdit: {
      transition: "0.15s",
      "& > svg": {
        marginRight: 10
      },
      "&:hover": {
        color: state.profile.theme === "light" ? "#ff7700" : "#ff9940"
      }
    },
    MenuItemDelete: {
      transition: "0.15s",
      "& > svg": {
        marginRight: 10
      },
      "&:hover": {
        color: state.profile.theme === "light" ? "#ff4e5e" : "#ff6775"
      }
    }
  });

  // Classes Object
  const classes = useStyle();

  // Sweet Alert Library
  const MySwal = withReactContent(Swal);

  // Get Category Background Of This Note
  let categoryBackground;
  // Loop Through Categories
  state.categories.map(category => {
    // Check Current Note Category
    if (category.name === note.category) {
      // Assign Color To Variable
      categoryBackground = category.name === 'Not Categorized' ? (state.profile.theme === 'light' ? '#dedede' : '#303030') : category.color;
    }
    // Return Nothing
    return null;
  });
  // Check For Background Color (Dark Or Light Color), To Determine Foreground Color
  let categoryColor = CheckLightOrDark(categoryBackground);

  // Note Menu Local State
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Handle Menu Element Function
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Handle Menu Close Function
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Handle Favourite Method
  const handleFavourite = (note) => {
    // Close Menu
    handleClose();
    // Updated Note Attributes
    let newNote = {
      id: note.id,
      title: note.title,
      body: note.body,
      category: note.category,
      favourite: !(note.favourite)
    };
    // Trigger Update Method
    state.update("notes", newNote);
  };

  // Handle Delete Method
  const handleNoteDelete = (id) => {
    // Close Menu
    handleClose();
    // Confirmation Dialogue
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dd3333",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        // Trigger Note Delete Method
        state.remove("notes", id);
        // Success Dialogue
        MySwal.fire(
          "Deleted!",
          "This note has been deleted.",
          "success"
        );
      }
    });
  };

  // Component View
  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatarBackground}>
              {note.title[0].toUpperCase()}
            </Avatar>
          }
          action={
            <div>
              <IconButton
                onClick={() => handleFavourite(note)}
                color="primary"
              >
                {
                  note.favourite === true ? (<Star />) : (<StarOutline />)
                }
              </IconButton>
              <IconButton
                onClick={handleMenu}
                color="primary"
              >
                <MoreVertOutlined />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem className={classes.MenuItemEdit} onClick={() => history.push(`/update-note/${note.id}`)}><Edit /> Edit</MenuItem>
                <MenuItem className={classes.MenuItemDelete}
                          onClick={() => handleNoteDelete(note.id)}><Delete /> Delete</MenuItem>
              </Menu>
            </div>
          }
          title={<Typography variant="body2" component="span" className={classes.cardTitle}>{note.title}</Typography>}
          subheader={<Typography component="span"
                                 style={{
                                   backgroundColor: categoryBackground,
                                   color: categoryColor
                                 }}>{note.category}</Typography>}
        />
        <CardContent>
          <Typography variant="body2" component="pre" color="textSecondary" className={classes.CardBody} dir="auto">
            {note.body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

// Export Component
export default NoteCard;
