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
      avatar: "/images/guest.jpg",
      username: "Guest",
      theme: "light"
    },
    categories: [
      {
        id: "0",
        name: "Not Categorized",
        color: "#a7a7a7"
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
            color: "#a7a7a7"
          }
        ]
      });
    }
    // Save To Localstorage
    setItem("SmartNotes", JSON.stringify(this.state));
  };

  // Update Profile Method
  updateProfile = async (profile) => {
    // Add New Profile Data To State
    await this.setState({
      profile: profile
    });
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
        updateProfile: this.updateProfile
      }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

// Export App Context Provider
export default AppContextProvider;
