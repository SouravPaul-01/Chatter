import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Close as CloseIcon,
  Groups as GroupsIcon,
  Dashboard as DashboardIcon,
  ManageAccounts as ManageAccountsIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { bgAdminColorGradient } from "../../constants/color";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../../redux/thunks/admin";

const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 1rem;
  color: black;
  padding: 1rem 2rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const adminTabs = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <DashboardIcon /> },
  {
    name: "Users",
    path: "/admin/users",
    icon: <ManageAccountsIcon />,
  },
  { name: "Chats", path: "/admin/chats", icon: <GroupsIcon /> },
  { name: "Messages", path: "/admin/messages", icon: <MessageIcon /> },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    localStorage.clear();
    dispatch(adminLogout());
  };
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h4" textTransform={"uppercase"}>
        Chatter
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={{
              backgroundColor:
                location.pathname === tab.path ? "rgba(0, 0, 0, 0.1)" : "none",
            }}
          >
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
              {tab.icon}
              <Typography fontSize={"1.1rem"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const AdminLayout = ({ children }) => {
  const { isAdmin } = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => setIsMobile(!isMobile);
  const handleClose = () => setIsMobile(false);
  if (!isAdmin) return <Navigate to="/admin" />;
  return (
    <Grid container height={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: "1rem",
          right: "1rem",
        }}
      >
        <IconButton size="large" onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid
        item
        size={{ xs: 12, md: 3 }}
        sx={{
          display: { xs: "none", md: "block" },
          height: "100%",
          backgroundImage: bgAdminColorGradient,
        }}
      >
        <Sidebar />
      </Grid>
      <Grid item size={{ xs: 12, md: 9 }} sx={{ height: "100%" }}>
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
