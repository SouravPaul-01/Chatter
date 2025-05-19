import { useFetchData } from "6pp";
import { Avatar, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { transformImage } from "../../components/lib/features";
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
    renderCell: (params) => (
      <Avatar src={params.row.avatar} alt={params.row.name} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/users`,
    key: "dashboard-users",
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
        data.transformedUsers.map((user) => ({
          ...user,
          id: user._id,
          avatar: transformImage(user.avatar, 50),
        }))
      );
    }
  }, [data]);
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"} />
      ) : (
        <Table heading={"All User "} rows={rows} columns={columns} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
