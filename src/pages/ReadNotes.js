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

  // Get State
  const state = useContext(AppContext);

  // Component Local State
  const [empty, setEmpty] = useState(true)

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
          state.notes.map(note => {
            // Check If There Are Notes
            if (note.title) {
              // Check For Empty If True
              if (empty === true) {
                // Change Empty State
                setEmpty(false);
              }
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
        // Check If Empty Still True, To Show Empty Message
        empty === true ? (<Typography variant="h5"
                                            component="h2"
                                            className={classes.EmptyMessage}>There are No Notes Yet. Add Some !!</Typography>) : null
      }
    </Container>
  );
};

// Export Component
export default ReadNotes;
