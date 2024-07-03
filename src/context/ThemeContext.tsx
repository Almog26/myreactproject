import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggle: () => {},
});
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Read from local storage:
    const storedTheme = localStorage.getItem("theme") ?? "light";
    setTheme(storedTheme);

    // Update the class on the body
    if (storedTheme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);
  const toggle = () => {
    // Toggle the theme
    const newValue = theme === "light" ? "dark" : "light";

    // Save to local storage
    localStorage.setItem("theme", newValue);

    // Update the class on the body
    if (newValue === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    // Update the state
    setTheme(newValue);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
