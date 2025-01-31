import { useState } from "react";
import {
  Input,
  Button,
  Select,
  Form,
  Upload,
  message,
  Row,
  Col,
  theme,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  FileImageOutlined,
} from "@ant-design/icons";

const { Option } = Select;
const { useToken } = theme;

export default function Profile() {
  const [form] = Form.useForm();
  const { token } = useToken();
  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      message.success("Profile image uploaded successfully");
      setProfileImage(info.file.response.url);
    } else if (info.file.status === "error") {
      message.error("Profile image upload failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        minHeight: "90vh",
        margin: "0 auto",
        padding: "12px 0",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: token.colorTextSecondary,
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Profile Settings
      </h2>

      {/* Layout for Profile Settings - Split into two parts */}
      <Row gutter={32}>
        {/* Left side: Full Name, Email, Change Button */}
        <Col xs={24} sm={12} lg={12}>
          <div
            style={{
              padding: "20px",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
              Personal Information
            </h3>
            <Form
              form={form}
              layout="vertical"
              style={{ maxWidth: "100%" }}
              initialValues={{
                name: "",
                email: "",
              }}
            >
              <Form.Item
                name="name"
                label="Full Name"
                rules={[
                  { required: true, message: "Please enter your full name!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your full name"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Enter your email"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary">Change Information</Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Right side: Profile Image, Password, Preferences (read-only UI) */}
        <Col xs={24} sm={12} lg={12}>
          <div
            style={{
              padding: "20px",
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "20px" }}>
              Profile Settings
            </h3>

            {/* Profile Image Section */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "30px",
              }}
            >
              <Upload
                name="profileImage"
                action="/upload"
                listType="picture-card"
                showUploadList={false}
                onChange={handleImageChange}
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  />
                ) : (
                  <Button
                    icon={<FileImageOutlined />}
                    style={{ backgroundColor: "#62AB00", color: "#fff" }}
                  >
                    Upload Profile Picture
                  </Button>
                )}
              </Upload>
            </div>

            {/* Password Fields */}
            <Form.Item label="Current Password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Current password"
                disabled
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </Form.Item>

            <Form.Item label="New Password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New password"
                disabled
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </Form.Item>

            <Form.Item label="Confirm New Password">
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm new password"
                disabled
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />
            </Form.Item>

            {/* Preferences Section */}
            <Form.Item label="Language">
              <Select defaultValue="English" size="large" disabled>
                <Option value="en">English</Option>
                <Option value="es">Spanish</Option>
                <Option value="fr">French</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Theme">
              <Select defaultValue="light" size="large" disabled>
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
              </Select>
            </Form.Item>
          </div>
        </Col>
      </Row>
    </div>
  );
}
