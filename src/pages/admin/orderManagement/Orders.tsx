/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react";
import { Button, Col, Row, Select, Space, Table } from "antd";
import { Link } from "react-router-dom";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../features/order/api";
import moment from "moment-timezone";
import { toast } from "sonner";

export default function Orders() {
  const {
    data: ordersData,
    isFetching,
    refetch,
  } = useGetAllOrdersQuery(undefined);
  //   console.log(ordersData);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  // Function to handle status update
  const handleOrderStatusUpdate = async (value, id) => {
    const toastId = toast.loading("Updating status...");
    try {
      await updateOrderStatus({ id: id, data: { status: value } }).unwrap();
      toast.success("Status has been successfully updated.", { id: toastId });
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Error updating status.", {
        id: toastId,
      });
    }
  };

  const tableData = ordersData?.data.map(
    ({
      paymentMethod,
      status,
      totalAmount,
      transactionId,
      shippingAddressDetails,
      orderDate,
      userId,
      _id,
    }) => ({
      key: _id,
      paymentMethod,
      totalAmount,
      transactionId,
      shippingAddress: `${shippingAddressDetails.city}, ${shippingAddressDetails.country}`,
      orderDate: moment(orderDate).tz("Asia/Dhaka").format("YYYY-MMM-DD"),
      status,
      userName: userId.name,
      userEmail: userId.email,
    })
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Email",
      dataIndex: "userEmail",
      key: "userEmail",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Order Progress",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Select
          defaultValue={status}
          style={{ width: 120 }}
          onChange={(value) => handleOrderStatusUpdate(value, record.key)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="shipping">Shipping</Select.Option>
          <Select.Option value="delivered">Delivered</Select.Option>
        </Select>
      ),
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/orders/${item.key}`}>
              <Button>Details</Button>
            </Link>
          </Space>
        );
      },
      width: "1%",
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
