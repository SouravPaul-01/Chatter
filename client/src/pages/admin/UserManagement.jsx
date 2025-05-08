import React, { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import Table from "../../components/shared/Table";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
];

const UserManagement = () => {
  const [rows, setRows] = useState([]);
  return (
    <AdminLayout>
      <Table heading={"All User "} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
