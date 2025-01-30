import { Form, Input, Button, Card, Typography, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Signup() {
  const handleSubmit = (values) => {
    console.log("User Signed Up:", values);
  };

  return (
    <div
      style={{
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 350,
          padding: 20,
          borderRadius: 8,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4} style={{ textAlign: "center" }}>
          Sign Up
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item style={{ display: "flex", alignItems: "center" }}>
            <Checkbox name="termOfService" />
            <span style={{ marginLeft: 8 }}>
              I agree with the terms of service
            </span>
          </Form.Item>
          <Form.Item>
            <Link
              to="/signin"
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              Have an account? <span style={{ color: "#62AB00" }}>Sign In</span>
            </Link>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>
        </Form>
      </Card>
    </div>
  );
}
