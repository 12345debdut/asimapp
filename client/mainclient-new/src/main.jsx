import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./css/style.css";
import "./css/all.min.css";
import "./css/bootstrap.min.css";
import "./css/responsive.css";
import "./App.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";

var style = getComputedStyle(document.body);

const outerTheme = createTheme({
  palette: {
    primary: {
      light: style.getPropertyValue("--material-ui-theme-primary-light"),
      main: style.getPropertyValue("--material-ui-theme-primary-main"),
      dark: style.getPropertyValue("--material-ui-theme-primary-dark"),
      contrastText: style.getPropertyValue("--material-ui-theme-primary-text"),
    },
    secondary: {
      light: style.getPropertyValue("--material-ui-theme-secondary-light"),
      main: style.getPropertyValue("--material-ui-theme-secondary-main"),
      dark: style.getPropertyValue("--material-ui-theme-secondary-dark"),
      contrastText: style.getPropertyValue(
        "--material-ui-theme-secondary-text"
      ),
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ToastContainer />
    <ThemeProvider theme={outerTheme}>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
