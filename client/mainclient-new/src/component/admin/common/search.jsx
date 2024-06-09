import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

export default function Search(props) {
  const [email, setEmail] = useState("");
  const { setUserList, userList, setTempInfo } = props;
  useEffect(() => {
    search();
  }, [email]);
  const search = () => {
    let temp = userList.filter((item, index) => {
      return item.email.includes(email);
    });
    setUserList(temp);
  };

  return (
    <div>
      <div>
        <div>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search with email.."
          inputProps={{ "aria-label": "search" }}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          search();
        }}
        style={{ marginLeft: 22, marginTop: 20 }}
      >
        Search
      </Button>
    </div>
  );
}
