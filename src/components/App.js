// Libraries
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import ReadNotes from "../pages/ReadNotes";
import CreateNote from "../pages/CreateNote";
import UpdateNote from "../pages/UpdateNote";
import UserProfile from "../pages/UserProfile";
import Categories from "../pages/Categories";

// App Contexts
import AppContextProvider from "../contexts/AppContext";

// Component
const App = () => {
  return (
    <Router>
      <Switch>
        <AppContextProvider>
          <Route exact path="/" component={ReadNotes} />
          <Route path="/create" component={CreateNote} />
          <Route path="/update" component={UpdateNote} />
          <Route path="/categories" component={Categories} />
          <Route path="/profile" component={UserProfile} />
        </AppContextProvider>
      </Switch>
    </Router>
  );
};

// Export Component
export default App;
