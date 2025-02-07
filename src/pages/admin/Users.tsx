/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Col, Row, Table, Select, Button, Pagination } from "antd";
import moment from "moment-timezone";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../features/user/api";
import { toast } from "sonner";
import { TQueryParam } from "../../types/global";

export type User = {
  _id: string;
  key?: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "banned";
  createdAt: string;
};

export type UpdateRoleData = {
  id: string;
  data: { role: string };
};

export type UpdateStatusData = {
  id: string;
  data: { status: string };
};

export default function Users() {
  const [currentPage, setCurrentPage] = useState(1);

  const [params, setParams] = useState<TQueryParam[]>([]);

  const {
    data: usersData,
    isFetching,
    refetch,
  } = useGetAllUsersQuery([{ name: "page", value: currentPage }, ...params]);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const tableData: (User & { key: string })[] = (usersData?.data || []).map(
    ({ name, role, email, createdAt, status, _id }) => ({
      key: _id || "",
      name,
      email,
      role,
      status,
      createdAt: moment.tz(createdAt, "Asia/Dhaka").format("YYYY MMM DD"),
    })
  );

  // role update
  const handleRoleUpdate = async (value: string, userId: string) => {
    const toastId = toast.loading("Updating role...");
    try {
      await updateUserRole({ id: userId, data: { role: value } }).unwrap();
      toast.success("Role has been successfully updated.", { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error updating role.", {
        id: toastId,
      });
    }
  };

  // status update
  const handleStatusUpdate = async (value: string, userId: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      await updateUserStatus({ id: userId, data: { status: value } }).unwrap();
      toast.success("Status has been successfully updated.", { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error updating status.", {
        id: toastId,
      });
    }
  };

  //  user deletion
  const handleDeleteUser = async (userId: string) => {
    const toastId = toast.loading("Deleting user...");
    try {
      await deleteUser(userId).unwrap();
      toast.success("User has been successfully deleted.", { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error deleting user.", {
        id: toastId,
      });
    }
  };

  const metaData = usersData?.meta;

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string, record: { key: string }) => (
        <Select
          defaultValue={role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleUpdate(value, record.key)}
        >
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      ),
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "User",
          value: "user",
        },
      ],
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: { key: string }) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusUpdate(value, record.key)}
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="banned">Banned</Select.Option>
        </Select>
      ),
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Banned",
          value: "banned",
        },
      ],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: { key: string }) => (
        <Button danger onClick={() => handleDeleteUser(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

  const onChange = (_pagination, filters, _sorter, extra) => {
    console.log("params", filters, extra);
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.role?.forEach((item) =>
        queryParams?.push({ name: "role", value: item })
      );

      filters.status?.forEach((item) =>
        queryParams?.push({ name: "status", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Fragment>
      <div style={{ width: "100%", margin: "0 auto", padding: "20px" }}>
        <Row gutter={[20, 20]}>
          <Col xs={24}>
            <div
              style={{
                minHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <Table
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ x: "max-content" }}
                loading={isFetching}
                onChange={onChange}
                style={{ height: "100%" }}
              />
              <Pagination
                style={{ marginTop: "20px" }}
                align="end"
                current={currentPage}
                onChange={(page) => setCurrentPage(page)}
                pageSize={metaData?.limit}
                total={metaData?.total}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
