// Libraries
import React, {useContext} from "react";

// App Context
import {AppContext} from "../contexts/AppContext";

// Component
const UserProfile = () => {
  // Get Notes & Its Methods
  const state = useContext(AppContext);

  let x = {
    avatar: "new.jpg",
    username: "salahineo",
    theme: "dark"
  };
  return (
    <div>
      <button onClick={() => state.updateProfile(x)}>Update</button>
    </div>
  );
};

// Export Component
export default UserProfile;
