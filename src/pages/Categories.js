// Libraries
import React, {useContext} from "react";

// App Context
import {AppContext} from "../contexts/AppContext";

// Component
const Categories = () => {
  // Get Notes & Its Methods
  const state = useContext(AppContext);

  let x = {
    id: "1",
    name: "Personal",
    color: "#ff5656"
  };
  let newX = {
    id: "1",
    name: "Personal",
    color: "#005656"
  };
  let y = {
    id: "2",
    name: "Work",
    color: "#333333"
  };
  let newY = {
    id: "2",
    name: "Work",
    color: "#003333"
  };
  return (
    <div>
      <button onClick={() => state.add("categories", x)}>Add 1</button>
      <button onClick={() => state.add("categories", y)}>Add 2</button>
      <button onClick={() => state.update("categories", newX)}>Update 1</button>
      <button onClick={() => state.update("categories", newY)}>Update 2</button>
      <button onClick={() => state.remove("categories", x.id)}>Delete 1</button>
      <button onClick={() => state.remove("categories", y.id)}>Delete 2</button>
      <button onClick={() => state.clearAll("categories")}>Clear</button>
    </div>
  );
};

// Export Component
export default Categories;
