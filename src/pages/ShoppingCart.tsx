import { Table, Button, Card, Row, Col, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export default function ShoppingCart() {
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          style={{ color: "red" }}
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      image: "https://m.media-amazon.com/images/I/81IM6vEPvLL._SY466_.jpg",
      product: "Rinosin Glasses",
      price: 395.0,
      quantity: 1,
      total: 395.0,
    },
    {
      key: "2",
      image: "https://m.media-amazon.com/images/I/81IM6vEPvLL._SY466_.jpg",
      product: "Rinosin Glasses",
      price: 395.0,
      quantity: 1,
      total: 395.0,
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Row gutter={[20, 20]}>
        {/* Cart Table */}
        <Col xs={24} lg={16}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </Col>

        {/* Summary & Address Section */}
        <Col xs={24} lg={8}>
          <Card
            title="Cart Summary"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            <p style={{ fontWeight: "bold" }}>
              Total Products: <span style={{ color: "red" }}>07</span>
            </p>
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Subtotal:{" "}
              <span style={{ color: "red" }}>
                ${data.reduce((acc, item) => acc + item.total, 0).toFixed(2)}
              </span>
            </p>
          </Card>

          <Card title="Shipping Address" style={{ textAlign: "center" }}>
            <Input placeholder="Full Name" style={{ marginBottom: "10px" }} />
            <Input
              placeholder="Street Address"
              style={{ marginBottom: "10px" }}
            />
            <Input placeholder="City" style={{ marginBottom: "10px" }} />
            <Input
              placeholder="State/Province"
              style={{ marginBottom: "10px" }}
            />
            <Input placeholder="Postal Code" style={{ marginBottom: "10px" }} />
            <Input placeholder="Country" style={{ marginBottom: "10px" }} />
            <Button type="primary" block style={{ marginTop: "10px" }}>
              Proceed to Checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
