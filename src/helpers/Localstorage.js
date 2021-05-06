// Add Item To Localstorage Method
export const setItem = (name, value) => {
  // Set To Localstorage
  localStorage.setItem(name, value);
};

// Get Item From Localstorage Method
export const getItem = (name) => {
  // Return Item Value
  return localStorage.getItem(name);
};

// Remove Item From Localstorage Method
export const removeItem = (name) => {
  // Remove Item
  localStorage.removeItem(name);
};
