import { Fragment } from "react";
import { useGetUserOrderHistoryQuery } from "../features/order/api";
import { Col, Row, Table, Tag } from "antd";
import moment from "moment-timezone";
import { useAppSelector } from "../redux/hook";
import { selectCurrentUser } from "../features/auth/redux/authSlice";

export interface TableData {
  key: string;
  paymentMethod: string;
  totalAmount: number;
  transactionId: string;
  shippingAddress: string;
  orderDate: string;
  status: "pending" | "shipping" | "delivered";
  userName: string;
  userEmail: string;
}

export interface ShippingAddressDetails {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface OrderHistoryItem {
  paymentMethod?: string;
  status: "pending" | "shipping" | "delivered";
  totalAmount: number;
  transactionId: string;
  shippingAddressDetails: ShippingAddressDetails;
  orderDate: string;
  userId: {
    name: string;
    email: string;
  };
}

export default function OrderHistory() {
  const user = useAppSelector(selectCurrentUser);
  const email = user?.email;
  // console.log(email);

  const { data: orderHistoryData, isFetching } =
    useGetUserOrderHistoryQuery(email);

  const tableData: TableData[] =
    orderHistoryData?.data.map(
      ({
        paymentMethod,
        status,
        totalAmount,
        transactionId,
        shippingAddressDetails,
        orderDate,
        userId,
      }: OrderHistoryItem) => ({
        key: transactionId,
        paymentMethod,
        totalAmount,
        transactionId,
        shippingAddress: `${shippingAddressDetails.city}, ${shippingAddressDetails.country}`,
        orderDate: moment(orderDate).tz("Asia/Dhaka").format("YYYY-MMM-DD"),
        status,
        userName: userId.name,
        userEmail: userId.email,
      })
    ) || [];
  //   console.log(orderHistoryData);

  const getStatusTag = (status: string) => {
    switch (status) {
      case "pending":
        return <Tag color="orange">Pending</Tag>;
      case "shipping":
        return <Tag color="blue">Shipping</Tag>;
      case "delivered":
        return <Tag color="green">Delivered</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

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
      render: (amount: number) => `$${amount.toFixed(2)}`,
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
      render: (status: string) => getStatusTag(status),
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
    },
  ];

  return (
    <Fragment>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
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
