// Libraries
import React, {useContext} from "react";

// App Context
import {AppContext} from "../contexts/AppContext";

// Component
const ReadNotes = () => {
  // Get State
  const state = useContext(AppContext);

  let x = {
    id: "3a22116b-8eda-4a10-b810-d15cfcedfd09",
    title: "First Note Title",
    body: "First Note Body",
    category: "Personal"
  };
  let newX = {
    id: "3a22116b-8eda-4a10-b810-d15cfcedfd09",
    title: "New Note Title",
    body: "New Note Body",
    category: "Personal"
  };
  let y = {
    id: "5a22116b-8eda-4a10-b810-d15cfcedfd09",
    title: "First Note Title",
    body: "First Note Body",
    category: "Personal"
  };
  let newY = {
    id: "5a22116b-8eda-4a10-b810-d15cfcedfd09",
    title: "New Y",
    body: "New Y",
    category: "Personal"
  };
  return (
    <div>
      <button onClick={() => state.add("notes", x)}>Add 1</button>
      <button onClick={() => state.add("notes", y)}>Add 2</button>
      <button onClick={() => state.update("notes", newX)}>Update 1</button>
      <button onClick={() => state.update("notes", newY)}>Update 2</button>
      <button onClick={() => state.remove("notes", x.id)}>Delete 1</button>
      <button onClick={() => state.remove("notes", y.id)}>Delete 2</button>
      <button onClick={() => state.clearAll("notes")}>Clear</button>
    </div>
  );
};

// Export Component
export default ReadNotes;
