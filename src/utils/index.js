export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// Basic search filter, not sure what else to do given the premise
export const filterToolsByName = (tools, input) => {
  if (!input) return tools
  return tools.filter((tool) => (tool?.name ?? "").toLowerCase().includes(input.toLowerCase()))
}
