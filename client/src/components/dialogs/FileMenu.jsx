import { Menu } from "@mui/material";
import React from "react";

const FileMenu = ({ ancorE1 }) => {
  return (
    <Menu anchorEl={ancorE1} open={false}>
      <div
        style={{
          padding: "0.5rem",
          borderRadius: "0.5rem",
          width: "10rem",
          maxWidth: "50%",
          wordBreak: "break-all",
          marginBottom: "0.5rem",
          marginTop: "0.5rem",
          marginLeft: "0.5rem",
          marginRight: "0.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>File 1</p>
        <p>File 2</p>
      </div>
    </Menu>
  );
};

export default FileMenu;
