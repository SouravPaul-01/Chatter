import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box bgcolor={"rgba(0, 0, 0, 0.5)"} height={"100vh"}>
      <Typography
        p={"1rem"}
        variant="h4"
        textAlign={"center"}
        color={"white"}
        fontFamily={"monospace"}
      >
        Welcome to Chatter
      </Typography>
    </Box>
  );
};

export default AppLayout()(Home);
