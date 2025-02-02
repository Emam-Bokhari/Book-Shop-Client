/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Card, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { clearCart, removeFromCart } from "../features/cart/redux/cartSlice";
import ReusableForm from "../components/common/ReusableForm";
import ReusableInput from "../components/common/ReusableInput";
import { useAddOrderMutation } from "../features/order/api";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddressDetails {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface OrderRequest {
  products: { productId: string; quantity: number }[];
  shippingAddressDetails: ShippingAddressDetails;
}

export default function ShoppingCart() {
  const shoppingCartData = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [order] = useAddOrderMutation();

  const tableData = shoppingCartData?.map(
    ({ id, title, image, price, quantity }: CartItem) => ({
      key: id,
      title,
      image,
      price,
      quantity,
      total: price * quantity,
    })
  );

  const totalProducts = shoppingCartData.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const subtotal = shoppingCartData.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (imageLink: string) => (
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
      render: (item: number) => `$${item.toFixed(2)}`,
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
      render: (item: number) => `$${item.toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: { key: string }) => (
        <Button
          icon={<DeleteOutlined />}
          style={{ color: "red" }}
          onClick={() => dispatch(removeFromCart(record.key))}
        />
      ),
    },
  ];

  const onSubmit = async (formData: ShippingAddressDetails) => {
    const toastId = toast.loading("Processing your order...");
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
      const paymentUrl = response?.data?.paymentUrl;

      // Clear cart from localStorage and Redux store
      localStorage.removeItem("cart");
      dispatch(clearCart());

      // redirect payment url
      window.location.href = paymentUrl;

      toast.success("Order placed successfully!", { id: toastId });
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Error while processing order.Please try again",
        { id: toastId }
      );
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
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
                <ReusableInput
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
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
              </span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
                <ReusableInput
                  type="text"
                  name="address"
                  placeholder="Enter Your Address"
                  rules={[
                    { required: true, message: "Please enter your address" },
                  ]}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
                <ReusableInput
                  type="text"
                  name="postalCode"
                  placeholder="Enter Your Postal Code"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your postal code",
                    },
                  ]}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
                <ReusableInput
                  type="text"
                  name="city"
                  placeholder="Enter Your City"
                  rules={[
                    { required: true, message: "Please enter your city" },
                  ]}
                />
              </span>
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  width: "100%",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "-15px",
                    right: "-0px",
                    color: "red",
                    fontSize: "16px",
                  }}
                >
                  *
                </span>
                <ReusableInput
                  type="text"
                  name="country"
                  placeholder="Enter Your Country"
                  rules={[
                    { required: true, message: "Please enter your country" },
                  ]}
                />
              </span>
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
