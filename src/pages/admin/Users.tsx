import { Fragment } from "react";
import { Col, Row, Table, Tag, Select } from "antd";
import moment from "moment-timezone";
import {
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "../../features/user/api";
import { toast } from "sonner";

export default function Users() {
  const {
    data: usersData,
    isFetching,
    refetch,
  } = useGetAllUsersQuery(undefined);
  const [updateUserRole] = useUpdateUserRoleMutation();

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

  const getStatusTag = (status: string) => {
    switch (status) {
      case "active":
        return <Tag color="green">Active</Tag>;
      case "banned":
        return <Tag color="red">Banned</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

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
      render: (status) => getStatusTag(status),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
