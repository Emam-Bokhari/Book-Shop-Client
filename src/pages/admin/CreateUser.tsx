/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment } from "react/jsx-runtime";
import ReusableForm from "../../components/common/ReusableForm";
import ReusableInput from "../../components/common/ReusableInput";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useSignupMutation } from "../../features/auth/api";
import { toast } from "sonner";
import { TSignUp } from "../../types/users";

const { Title } = Typography;

export default function CreateUser() {
  const [signup] = useSignupMutation();

  const onSubmit = async (data: TSignUp) => {
    const toastId = toast.loading("Creating user account...");
    try {
      await signup(data).unwrap();
      toast.success("User account has been created successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
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
    <Fragment>
      <Title level={3} style={{ textAlign: "center" }}>
        Create account
      </Title>
      <Row justify="center" align="middle">
        <Col
          xs={24}
          sm={18}
          md={12}
          lg={8}
          xl={6}
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <ReusableForm onSubmit={onSubmit}>
            <ReusableInput
              label={
                <span>
                  Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              type="text"
              name="name"
              placeholder="Enter Your Name"
              rules={[{ required: true, message: "Please enter your name" }]}
              icon={<UserOutlined />}
            />
            <ReusableInput
              type="email"
              label={
                <span>
                  Email <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="email"
              placeholder="Enter Your Email"
              rules={[{ required: true, message: "Please enter your email" }]}
              icon={<MailOutlined />}
            />
            <ReusableInput
              type="password"
              name="password"
              label={
                <span>
                  Password <span style={{ color: "red" }}>*</span>
                </span>
              }
              placeholder="Password"
              rules={[
                { required: true, message: "Please enter your password!" },
              ]}
              icon={<LockOutlined />}
            />
            <Button type="primary" htmlType="submit" block>
              Register
            </Button>
          </ReusableForm>
        </Col>
      </Row>
    </Fragment>
  );
}
