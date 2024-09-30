import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { createContext } from "../../utils/contextCreator";

const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  return { isDarkMode, toggleTheme };
};

describe("createContext with Theme example", () => {
  const [useThemeContext, ThemeProvider] = createContext(useTheme);

  const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useThemeContext();
    return <button onClick={toggleTheme}>{isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</button>;
  };

  const ThemedText = () => {
    const { isDarkMode } = useThemeContext();
    return <p>Current theme: {isDarkMode ? "Dark" : "Light"}</p>;
  };

  const App = () => (
    <ThemeProvider>
      <ThemeToggle />
      <ThemedText />
    </ThemeProvider>
  );

  test("check if the context is created and functions correctly", () => {
    render(<App />);

    // Check initial state
    expect(screen.getByText("Switch to Dark Mode")).toBeInTheDocument();
    expect(screen.getByText("Current theme: Light")).toBeInTheDocument();

    // Toggle theme
    fireEvent.click(screen.getByText("Switch to Dark Mode"));

    // Check updated state
    expect(screen.getByText("Switch to Light Mode")).toBeInTheDocument();
    expect(screen.getByText("Current theme: Dark")).toBeInTheDocument();
  });

  test("check if the context throws an error when used outside the provider", () => {
    const TestComponent = () => {
      const { isDarkMode } = useThemeContext();
      return <div>{isDarkMode ? "Dark" : "Light"}</div>;
    };

    // Suppress console.error for this test
    jest.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useContext must be used within a Provider");

    // Restore console.error
    (console.error as jest.Mock).mockRestore();
  });
});
