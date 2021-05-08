// Libraries
import React, {useContext} from "react";
import Masonry from "react-masonry-css";

// Components
import {makeStyles} from "@material-ui/core/styles";
import {Container} from "@material-ui/core";
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
  }
});

// Component
const ReadNotes = () => {
  // Classes Object
  const classes = useStyle();

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
          state.notes.map(note => {
            return (
              <div key={note.id}>
                <NoteCard note={note} />
              </div>
            );
          })
        }
      </Masonry>
    </Container>
  );
};

// Export Component
export default ReadNotes;
