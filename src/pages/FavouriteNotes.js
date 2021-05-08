// Libraries
import React, {useContext, useState} from "react";
import Masonry from "react-masonry-css";

// Components
import {makeStyles} from "@material-ui/core/styles";
import {Container, Typography} from "@material-ui/core";
import NoteCard from "../components/NoteCard";

// App Context
import {AppContext} from "../contexts/AppContext";

// Custom CSS Classes Style
const useStyle = makeStyles({
  masonry_grid: {
    display: "flex",
    marginLeft: "-30px",
    width: "auto"
  },
  masonry_grid_column: {
    paddingLeft: 30,
    backgroundClip: "padding-box",
    "& > div": {
      marginBottom: 30
    },
    "& .MuiCardHeader-content > span:nth-of-type(2)": {
      textTransform: "capitalize",
      display: "inline-block",
      padding: "2px 5px 1px",
      fontSize: 11,
      borderRadius: 4,
      marginTop: 5
    }
  },
  EmptyMessage: {
    textAlign: "center",
    color: "#c1c1c1",
    marginTop: "calc((100vh - 65px) / 2)",
    transform: "translateY(-50%)"
  }
});

// Component
const ReadNotes = () => {
  // Classes Object
  const classes = useStyle();

  // Favourites State
  const [favourites, setFavourites] = useState(false);

  // Get State
  const state = useContext(AppContext);

  // Masonry CSS Breakpoints
  const breakpoints = {
    default: 3,
    1200: 2,
    992: 1
  };

  // Component View
  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className={classes.masonry_grid}
        columnClassName={classes.masonry_grid_column}
      >
        {
          // Loop Through All Notes
          state.notes.map(note => {
            // Check If Current Note Is Favourite Note
            if (note.favourite === true) {
              // Check For Favourites
              if (favourites === false) {
                // Change Favourites State
                setFavourites(true);
              }
              // Return This Note
              return (
                <div key={note.id}>
                  <NoteCard note={note} />
                </div>
              );
            } else {
              // Return Nothing
              return null;
            }
          })
        }
      </Masonry>
      {
        // Check If Favourites Still False, To Show Empty Message
        favourites === false ? (<Typography variant="h5"
                                            component="h2"
                                            className={classes.EmptyMessage}>You Don't Have Favourite Notes</Typography>) : null
      }
    </Container>
  );
};

// Export Component
export default ReadNotes;
