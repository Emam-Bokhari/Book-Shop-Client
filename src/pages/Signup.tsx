/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Button, Card, Typography, Checkbox } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ReusableForm from "../components/common/ReusableForm";
import ReusableInput from "../components/common/ReusableInput";
import { useSignupMutation } from "../features/auth/api";
import { toast } from "sonner";
import { TSignUp } from "../types/users";

const { Title } = Typography;

export default function Signup() {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();

  const onSubmit = async (data: TSignUp) => {
    const toastId = toast.loading("Creating your account...");
    try {
      // console.log("User Signed Up:", data);
      await signup(data).unwrap();
      toast.success("Your account has been created successfully!", {
        id: toastId,
        duration: 2000,
      });
      navigate("/");
      // console.log(response);
    } catch (err: any) {
      // console.log(err);
      toast.error(
        err.data.message || "Registration failed. Please try again.",
        {
          id: toastId,
          duration: 2000,
        }
      );
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
          Sign Up
        </Title>
        <ReusableForm onSubmit={onSubmit}>
          <ReusableInput
            type="text"
            name="name"
            placeholder="Enter Your Name"
            rules={[{ required: true, message: "Please enter your name" }]}
            icon={<UserOutlined />}
          />

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
        </ReusableForm>
      </Card>
    </div>
  );
}
