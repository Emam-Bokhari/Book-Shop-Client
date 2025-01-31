import { Fragment } from "react";
import { Col, Row, Table, Tag, Select, Button } from "antd";
import moment from "moment-timezone";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
} from "../../features/user/api";
import { toast } from "sonner";

export default function Users() {
  const {
    data: usersData,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const tableData = usersData?.data.map(
    ({ name, role, email, createdAt, status, _id }) => ({
      key: _id,
      name,
      email,
      role,
      status,
      createdAt: moment.tz(createdAt, "Asia/Dhaka").format("YYYY MMM DD"),
    })
  );

  // Function to handle role update
  const handleRoleUpdate = (value: string, userId: string) => {
    const toastId = toast.loading("Updating role...");
    const updateRoleData = {
      id: userId,
      data: { role: value },
    };

    updateUserRole(updateRoleData)
      .unwrap()
      .then(() => {
        toast.success("Role has been successfully updated.", { id: toastId });
        refetch();
      })
      .catch((err) => {
        toast.error(
          err?.message ||
            "There was an issue while updating the role. Please try again.",
          { id: toastId }
        );
      });
  };

  // Function to handle status update
  const handleStatusUpdate = (value: string, userId: string) => {
    const toastId = toast.loading("Updating status...");
    const updateStatusData = {
      id: userId,
      data: { status: value },
    };

    updateUserStatus(updateStatusData)
      .unwrap()
      .then(() => {
        toast.success("Status has been successfully updated.", { id: toastId });
        refetch();
      })
      .catch((err) => {
        toast.error(
          err?.message ||
            "There was an issue while updating the status. Please try again.",
          { id: toastId }
        );
      });
  };

  // Function to handle user deletion
  const handleDeleteUser = (userId: string) => {
    const toastId = toast.loading("Deleting user...");
    deleteUser(userId)
      .unwrap()
      .then(() => {
        toast.success("User has been successfully deleted.", { id: toastId });
        refetch();
      })
      .catch((err) => {
        toast.error(
          err?.message || "There was an issue while deleting the user.",
          { id: toastId }
        );
      });
  };

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
      render: (role, record) => (
        <Select
          defaultValue={role}
          style={{ width: 120 }}
          onChange={(value) => handleRoleUpdate(value, record.key)}
        >
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="user">User</Select.Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleStatusUpdate(value, record.key)}
        >
          <Select.Option value="active">Active</Select.Option>
          <Select.Option value="banned">Banned</Select.Option>
        </Select>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button danger onClick={() => handleDeleteUser(record.key)}>
          Delete
        </Button>
      ),
    },
  ];

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
                style={{ height: "100%" }}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
