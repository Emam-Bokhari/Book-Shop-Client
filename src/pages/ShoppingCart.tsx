import { Table, Button, Card, Row, Col, Input } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { removeFromCart } from "../features/cart/redux/cartSlice";

export default function ShoppingCart() {
  const shoppingCartData = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const tableData = shoppingCartData?.map(
    ({ id, title, image, price, quantity }) => ({
      key: id,
      title,
      image,
      price,
      quantity,
      total: price * quantity,
    })
  );

  //  Calculate total products (sum of quantities)
  const totalProducts = shoppingCartData.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  // calculate subtotal (sum of all total prices)
  const subtotal = shoppingCartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageLink) => (
        <img src={imageLink} alt="Product" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Product",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (item) => `$${item.toFixed(2)}`,
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
      render: (_, record) => (
        <Button
          type="danger"
          icon={<DeleteOutlined />}
          style={{ color: "red" }}
          onClick={() => dispatch(removeFromCart(record.key))}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Row gutter={[20, 20]}>
        {/* Cart Table */}
        <Col xs={24} lg={16}>
          <Table
            columns={columns}
            dataSource={tableData}
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
            <p style={{ fontWeight: "500" }}>
              Total Products:{" "}
              <span style={{ color: "#FF4F4F" }}>{totalProducts}</span>
            </p>
            <p style={{ marginTop: "10px", fontWeight: "500" }}>
              Subtotal:{" "}
              <span style={{ color: "#FF4F4F" }}>${subtotal.toFixed(2)}</span>
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
