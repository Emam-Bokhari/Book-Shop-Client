import { Table, Button, Card, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart, removeFromCart } from "../features/cart/redux/cartSlice";
import ReusableForm from "../components/common/ReusableForm";
import ReusableInput from "../components/common/ReusableInput";
import { useAddOrderMutation } from "../features/order/api";

export default function ShoppingCart() {
  const shoppingCartData = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  // const token = useSelector((state: RootState) => state.auth.token);
  const [order] = useAddOrderMutation();

  // console.log("Authorization header:", `${token.token}`);
  // console.log(token.token);

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

  const onSubmit = async (formData) => {
    try {
      const products = shoppingCartData?.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderData = {
        products,
        shippingAddressDetails: formData,
      };

      const response = await order(orderData).unwrap();
      const paymentUrl = response.data.paymentUrl;

      // Clear cart from localStorage and Redux store
      localStorage.removeItem("cart");
      dispatch(clearCart());

      // redirect payment url
      window.location.href = paymentUrl;

      // console.log("order data", orderData);
    } catch (err) {
      console.log(err);
    }
  };

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
            <ReusableForm onSubmit={onSubmit}>
              <ReusableInput
                type="text"
                name="name"
                placeholder="Enter Your Name"
                rules={[{ required: true, message: "Please enter your name" }]}
              />
              <ReusableInput
                type="text"
                name="phone"
                placeholder="Enter You Contact Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter your contact number",
                  },
                ]}
              />
              <ReusableInput
                type="text"
                name="address"
                placeholder="Enter Your Address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              />
              <ReusableInput
                type="text"
                name="postalCode"
                placeholder="Enter Your Postal Code"
                rules={[
                  { required: true, message: "Please enter your postal code" },
                ]}
              />
              <ReusableInput
                type="text"
                name="city"
                placeholder="Enter Your City"
                rules={[{ required: true, message: "Please enter your city" }]}
              />
              <ReusableInput
                type="text"
                name="country"
                placeholder="Enter Your Country"
                rules={[
                  { required: true, message: "Please enter your country" },
                ]}
              />
              <Button
                htmlType="submit"
                type="primary"
                block
                style={{ marginTop: "10px" }}
              >
                Proceed to Checkout
              </Button>
            </ReusableForm>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
