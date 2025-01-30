import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Checkbox,
  Row,
  Col,
} from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

export default function Signin() {
  const handleSubmit = (values) => {
    console.log("User Signed In:", values);
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
          Sign In
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
          <Form.Item>
            <Checkbox name="rememberMe">Remember Me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Row justify="space-between">
              <Col>
                <Link
                  to="/forgot-password"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Forgot Password?
                </Link>
              </Col>
              <Col>
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  Don't have an account?{" "}
                  <span style={{ color: "#62AB00" }}>Sign Up</span>
                </Link>
              </Col>
            </Row>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Sign In
          </Button>
        </Form>
      </Card>
    </div>
  );
}
