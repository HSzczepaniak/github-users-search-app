import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { GithubUsers } from "./components/GithubUsers";
import { GithubUsersProvider } from "./contexts/GithubUsersContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <GithubUsersProvider>
        <GithubUsers />
      </GithubUsersProvider>
    </ThemeProvider>
  );
}

export default App;
