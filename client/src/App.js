import React from "react";
import "./App.css";
import MainRouter from "./MainRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MainRouter />
      </div>
    </ThemeProvider>
  );
};

export default App;
