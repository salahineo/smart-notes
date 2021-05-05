// Libraries
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import ReadNotes from "../pages/ReadNotes";
import CreateNote from "../pages/CreateNote";
import UpdateNote from "../pages/UpdateNote";
import UserProfile from "../pages/UserProfile";

// Component
const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ReadNotes} />
        <Route path="/create" component={CreateNote} />
        <Route path="/update" component={UpdateNote} />
        <Route path="/profile" component={UserProfile} />
      </Switch>
    </Router>
  );
};

// Export Component
export default App;
