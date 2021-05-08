// Libraries
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import ReadNotes from "../pages/ReadNotes";
import CreateNote from "../pages/CreateNote";
import UpdateNote from "../pages/UpdateNote";
import UserProfile from "../pages/UserProfile";
import Categories from "../pages/Categories";
import FavouriteNotes from "../pages/FavouriteNotes";

// Components
import Layout from "./Layout";

// App Contexts
import AppContextProvider from "../contexts/AppContext";

// Component
const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={ReadNotes} />
            <Route path="/add-note" component={CreateNote} />
            <Route path="/update-note/:note" component={UpdateNote} />
            <Route path="/favourites" component={FavouriteNotes} />
            <Route path="/categories" component={Categories} />
            <Route path="/add-category" component={Categories} />
            <Route path="/update-category" component={Categories} />
            <Route path="/profile" component={UserProfile} />
          </Switch>
        </Layout>
      </AppContextProvider>
    </Router>
  );
};

// Export Component
export default App;
