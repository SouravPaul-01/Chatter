import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NoteificationIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "2.5rem" }} />
        <SearchField placeholder="Search" />
        <CurveButton>Search</CurveButton>
        <Box sx={{ flexGrow: 1 }} />
        <Typography variant="h5" display={{ xs: "none", lg: "block" }}>
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NoteificationIcon />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} Icon={<PersonIcon />} value={34} />
      <Widget title={"Chats"} Icon={<GroupIcon />} value={3} />
      <Widget title={"Messages"} Icon={<MessageIcon />} value={453} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}

        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={"2rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{ xs: "center", lg: "stretch" }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              margin: "2rem 0",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "40rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Messages
            </Typography>
            <LineChart value={[1, 2, 3, 4, 5, 6, 7]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart
              labels={["Single Chats", "Group Chats"]}
              value={[23, 66]}
            />
            <Stack
              position={"absolute"}
              direction={"row"}
              alignItems={"center"}
              justifyContent={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon /> <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};
const Widget = ({ title, Icon, value }) => (
  <Paper
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack spacing={"1rem"} alignItems={"center"}>
      <Typography
        variant="h4"
        sx={{
          color: "rgba(0, 0, 0, 0.7)",
          borderRadius: "50%",
          border: `5px solid rgba(0, 0, 0, 0.9)`,
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>

      <Stack direction={"row"} spacing={"0.5rem"} alignItems={"center"}>
        {Icon}
        <Typography variant="h5">{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
