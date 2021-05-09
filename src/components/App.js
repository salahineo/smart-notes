// Libraries
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Pages
import ReadNotes from "../pages/ReadNotes";
import CreateNote from "../pages/CreateNote";
import UpdateNote from "../pages/UpdateNote";
import Categories from "../pages/Categories";
import CreateCategory from "../pages/CreateCategory";
import UpdateCategory from "../pages/UpdateCategory";
import FavouriteNotes from "../pages/FavouriteNotes";
import UserProfile from "../pages/UserProfile";
import Admin from "../pages/Admin";

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
            <Route path="/add-category" component={CreateCategory} />
            <Route path="/update-category" component={UpdateCategory} />
            <Route path="/profile" component={UserProfile} />
            <Route path="/admin" component={Admin} />
          </Switch>
        </Layout>
      </AppContextProvider>
    </Router>
  );
};

// Export Component
export default App;
