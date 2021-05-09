// Libraries
import React, {createContext} from "react";
import {getItem, setItem} from "../helpers/Localstorage";

// App Context
export const AppContext = createContext();

// App Context Provider
class AppContextProvider extends React.Component {
  // Initial App State
  initialState = {
    profile: {
      avatar: "images/guest.jpg",
      username: "Guest",
      theme: "light"
    },
    categories: [
      {
        id: "0",
        name: "Not Categorized",
        color: "#dedede"
      }
    ],
    notes: []
  };

  // App State
  state = getItem("SmartNotes") === null ? this.initialState : JSON.parse(getItem("SmartNotes"));

  // Add Method
  add = async (property, content) => {
    // Add Property Value To State
    await this.setState({
      [property]: [...this.state[property], content]
    });
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Update Method
  update = async (property, content) => {
    // Temp Array To Store Updated Property
    const temp = [];
    // Loop Through Property
    await this.state[property].map(current => {
      // Check For Required Property To Be Updated
      if (current.id !== content.id) {
        // Push The Current Property
        temp.push(current);
      } else {
        // Push Updated Property
        temp.push(content);
      }
      // Return Nothing
      return null;
    });
    // Update Property State
    await this.setState({
      [property]: temp
    });
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Remove Method
  remove = async (property, id) => {
    // Remove Property With This ID
    await this.setState({
      [property]: this.state[property].filter(current => current.id !== id)
    });
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Clear All Method
  clearAll = async (property) => {
    if (property === "notes") {
      // Set Notes To Initial Value
      await this.setState({
        notes: []
      });
    } else {
      // Set Categories To Initial Value
      await this.setState({
        categories: [
          {
            id: "0",
            name: "Not Categorized",
            color: this.state.profile.theme === "light" ? "#dedede" : "#323232"
          }
        ]
      });
    }
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Update All Notes Method
  updateAllNotes = async (content) => {
    // Update All Notes
    await this.setState({
      notes: content
    });
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Update Profile Method
  updateProfile = async (profile) => {
    // Add New Profile Data To State
    await this.setState({
      profile: profile
    });
    // Check To Add Alert Dark Theme
    if (profile.theme === "dark") {
      // Create Link
      let link = document.createElement("link");
      // Add Link Attributes
      link.setAttribute("id", "SweetAlertDarkStyle");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", "/dark.min.css");
      // Append Link To Head Element
      document.documentElement.firstChild.appendChild(link);
    } else {
      // Check To Add Alert Dark Theme
      if (document.getElementById("SweetAlertDarkStyle") !== null) {
        document.getElementById("SweetAlertDarkStyle").remove();
      }
    }
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Export State (Data) Method
  exportData = async () => await JSON.stringify(this.state);

  // Import State (Data) Method
  importData = async (state) => {
    // Assign Data To State
    await this.setState(JSON.parse(state));
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Restore Method
  restore = async () => {
    // Assign Initial State To State
    await this.setState(this.initialState);
    // Check To Add Alert Dark Theme
    if (document.getElementById("SweetAlertDarkStyle") !== null) {
      document.getElementById("SweetAlertDarkStyle").remove();
    }
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Render Method
  render() {
    // App Context Provider
    return (
      <AppContext.Provider value={{
        ...this.state,
        add: this.add,
        update: this.update,
        remove: this.remove,
        clearAll: this.clearAll,
        updateProfile: this.updateProfile,
        updateAllNotes: this.updateAllNotes,
        exportData: this.exportData,
        importData: this.importData,
        restore: this.restore
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

// Export App Context Provider
export default AppContextProvider;
