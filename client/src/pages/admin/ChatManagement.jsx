import { useFetchData } from "6pp";
import { Avatar, Skeleton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { transformImage } from "../../components/lib/features";
import AvatarCard from "../../components/shared/AvatarCard";
import Table from "../../components/shared/Table";
import { server } from "../../constants/config";
import { useErrors } from "../../hooks/hook";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];

const ChatManagement = () => {
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/chats`,
    key: "dashboard-chats",
    credentials: "include",
  });

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (data) {
      setRows(
        data.chats.map((chat) => ({
          ...chat,
          id: chat._id,
          avatar: chat.avatar.map((chat) => transformImage(chat, 50)),
          members: chat.members.map((chat) => transformImage(chat.avatar, 50)),
          creator: {
            name: chat.creator.name,
            avatar: transformImage(chat.creator.avatar, 50),
          },
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All Chats "} rows={rows} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default ChatManagement;
