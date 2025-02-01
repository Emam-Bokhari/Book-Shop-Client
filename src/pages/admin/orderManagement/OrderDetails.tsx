import {
  Card,
  Col,
  Row,
  Descriptions,
  Button,
  Space,
  Skeleton,
  Divider,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetOrderQuery } from "../../../features/order/api";

export default function OrderDetails() {
  const { id } = useParams();
  const { data: orderData, isFetching } = useGetOrderQuery(id);

  //   console.log(orderData?.data.products);

  // Loading state
  if (isFetching) {
    return (
      <div>
        <Skeleton active paragraph={{ rows: 8 }} />
      </div>
    );
  }

  // Return error if no order is found
  if (!orderData?.data) {
    return (
      <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Card title="Error" bordered>
          <p>Order not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Row gutter={[20, 20]}>
        {/* Order Details Section */}
        <Col xs={24} md={12}>
          <Card title="Order Details" bordered>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Order Date">
                {orderData?.data?.orderDate}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {orderData?.data?.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Transaction ID">
                {orderData?.data?.transactionId}
              </Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                {orderData?.data?.totalAmount}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status">
                {orderData?.data?.status}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Shipping Information Section */}
        <Col xs={24} md={12}>
          <Card title="Shipping Information" bordered>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Name">
                {orderData?.data.shippingAddressDetails?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {orderData?.data.shippingAddressDetails?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {orderData?.data.shippingAddressDetails?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Postal Code">
                {orderData?.data.shippingAddressDetails?.postalCode}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Ordered Products Section */}
        {/* Ordered Products Section */}
        <Col xs={24}>
          <Card title="Ordered Products" bordered>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {orderData?.data.products.map((product, index) => (
                <div key={index}>
                  <li>
                    <strong>Product:</strong> {product?.productId?.title} <br />
                    <strong>Category:</strong> {product?.productId?.category}{" "}
                    <br />
                    <strong>Author:</strong> {product?.productId?.author} <br />
                    <strong>Description:</strong>{" "}
                    {product?.productId?.description} <br />
                    <strong>Quantity:</strong> {product?.quantity}
                  </li>

                  {/* Divider only if it's not the last product */}
                  {index < orderData?.data.products.length - 1 && <Divider />}
                </div>
              ))}
            </ul>
          </Card>
        </Col>

        {/* Buttons Section */}
        <Col xs={24}>
          <Space>
            <Link to={`/orders`}>
              <Button>Back to Orders</Button>
            </Link>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
