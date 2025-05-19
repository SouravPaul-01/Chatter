import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  SearchField,
  CurveButton,
} from "../../components/styles/StyledComponents";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { useFetchData } from "6pp";
import { server } from "../../constants/config";
import { LayoutLoader } from "../../components/layout/Loaders";
import { UNSAFE_ErrorResponseImpl } from "react-router-dom";
import { useErrors } from "../../hooks/hook";
const Dashboard = () => {
  //!the commented code will not work because the 6pp needs a object but we are not sending object so that cause the route to be undefined so the data get undefined this cause error
  // const { loading, data, error } = useFetchData(
  //   `${server}/api/v1/admin/stats`,
  //   "dashboard-stats"
  // );
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/stats`,
    key: "dashboard-stats",
    credentials: "include",
  });

  // Safely access the stats property, defaulting to an empty object if data or data.stats is undefined
  const stats = data?.stats || {};

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

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
        <NotificationsIcon />
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
      <Widget title={"Users"} Icon={<PersonIcon />} value={stats.usersCount} />
      <Widget
        title={"Chats"}
        Icon={<GroupIcon />}
        value={stats.totalChatsCount}
      />
      <Widget
        title={"Messages"}
        Icon={<MessageIcon />}
        value={stats.messagesCount}
      />
    </Stack>
  );

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Container
          component={"main"}
          sx={{
            padding: "2rem",
            height: "100%",
            overflowY: "auto",
          }}
        >
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
                Last 7 Days Messages
              </Typography>
              <LineChart value={stats?.messages || []} />
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
                value={[
                  stats?.totalChatsCount - stats?.groupsCount || 0,
                  stats?.groupsCount || 0,
                ]}
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
      )}
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
