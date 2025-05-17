import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalendarMonthIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../lib/features";

const Profile = ({ user }) => {
  if (!user) return null;

  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user.avatar?.url)}
        sx={{
          width: "8rem",
          height: "8rem",
          objectFit: "contain",
          marginBottom: "0.5rem",
          border: "5px solid black",
        }}
      />
      {user.bio && <ProfileCard heading={"Bio"} text={user.bio} />}
      <ProfileCard
        heading={"User Name"}
        text={user.username}
        Icon={<AlternateEmailIcon />}
      />
      <ProfileCard heading={"Name"} text={user.name} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Join Date"}
        text={moment(user.createdAt).fromNow()}
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
