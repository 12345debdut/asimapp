import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

export default function ChipsArray(props) {
  const { galleries } = props;
  if (galleries.length > 0) {
    return (
      <Paper>
        {galleries.map((data) => {
          return (
            <Chip
              key={data}
              label={data}
              variant="outlined"
              color="secondary"
              onClick={() => {
                props.onClick(data);
              }}
            />
          );
        })}
      </Paper>
    );
  } else {
    return <div></div>;
  }
}
