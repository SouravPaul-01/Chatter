import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=250&d=mp"
        }
        sx={{
          width: "8rem",
          height: "8rem",
          objectFit: "contain",
          marginBottom: "0.5rem",
          border: "5px solid black",
        }}
      />
      <ProfileCard heading={"Bio"} text={"John Doe"} />
      <ProfileCard
        heading={"User Name"}
        text={"sourav@gmail.com"}
        Icon={<AlternateEmailIcon />}
      />
      <ProfileCard heading={"Name"} text={"Full Name"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Join Date"}
        text={moment("2022-01-01").fromNow()}
        Icon={<CalendarMonthIcon />}
      />
    </Stack>
  );
};
const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    spacing={"1rem"}
    alignItems={"center"}
    color={"black"}
    textAlign={"center"}
  >
    {Icon && Icon}
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography color="text.secondary" variant="caption">
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
