import React, { memo, useState } from "react";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { matBlack, matBlackHover } from "../components/constants/color";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/styles/StyledComponents";
import AvatarCard from "../components/shared/AvatarCard";
import { sampleChats } from "../components/constants/sampleData";

const Groups = () => {
  const nevigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateBack = () => {
    nevigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => setIsMobileMenuOpen(false);
  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            "&:hover": {
              bgcolor: matBlackHover,
              color: "white",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <Grid container height="100vh">
      <Grid
        size={{ sm: 4, md: 3 }}
        sx={{ display: { xs: "none", sm: "block" } }}
        height={"100%"}
        border={"1px solid red"}
      >
        <GroupList myGroups={sampleChats} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        lg={6}
        height="100%"
        sx={{
          padding: "1rem 3rem",
          position: "relative",
        }}
      >
        <h1>Groups</h1>
        {IconBtns}
      </Grid>
      <Drawer
        sx={{ zIndex: 100, display: { xs: "block", sm: "none" } }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupList w={"50vw"} />
      </Drawer>
    </Grid>
  );
};
const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography variant="body1" textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link>
      <Stack>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
