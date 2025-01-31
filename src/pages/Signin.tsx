import { Form, Button, Card, Typography, Checkbox, Row, Col } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReusableForm from "../components/common/ReusableForm";
import ReusableInput from "../components/common/ReusableInput";
import { useLoginMutation } from "../features/auth/api";
import { verifyToken } from "../utils/verifyToken";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/redux/authSlice";
import { toast } from "sonner";

const { Title } = Typography;

export default function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await login(data).unwrap();
      // console.log(response);
      const user = verifyToken(response.data.token);
      dispatch(setUser({ user: user, token: response.data }));
      toast.success("Login successful", { id: toastId, duration: 2000 });
      // console.log("User Signed In:", user);
      const redirectPath = location.state?.from.pathname || "/";
      // console.log(redirectPath);
      navigate(redirectPath, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login attempt failed. Please try again.", {
        id: toastId,
        duration: 2000,
      });
    }
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
        <ReusableForm onSubmit={onSubmit}>
          <ReusableInput
            type="text"
            name="email"
            placeholder="Enter Your Email"
            rules={[{ required: true, message: "Please enter your email" }]}
            icon={<MailOutlined />}
          />

          <ReusableInput
            type="text"
            name="password"
            placeholder="Password"
            rules={[{ required: true, message: "Please enter your password!" }]}
            icon={<LockOutlined />}
          />
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
        </ReusableForm>
      </Card>
    </div>
  );
}
