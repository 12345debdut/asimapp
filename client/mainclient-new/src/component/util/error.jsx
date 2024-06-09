import React from "react";
import { useTheme } from "@mui/material";
const ErrorBox = (props) => {
  const theme = useTheme();
  return (
    <div style={{ padding: 20 }}>
      <p style={{ color: theme.palette.error.dark, fontSize: 18 }}>
        {props.title}
      </p>
    </div>
  );
};
export default ErrorBox;
