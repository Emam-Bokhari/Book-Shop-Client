import { Form, Input, Button, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Fragment } from "react/jsx-runtime";
import SectionBanner from "../components/common/SectionBanner";

const { Title, Text } = Typography;

export default function ContactUs() {
  return (
    <Fragment>
      {/* Banner  */}
      <SectionBanner />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          // backgroundColor: "#f5f5f5",
          padding: "0px 16px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "1200px",
            borderRadius: "8px",
            boxShadow: "none",
            border: "none",
            // backgroundColor: "#fff",
          }}
        >
          <Title
            level={3}
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Get in Touch 📚
          </Title>

          <div style={{ display: "flex", gap: "50px", flexWrap: "wrap" }}>
            {/* Contact Form */}
            <div style={{ flex: 1, minWidth: "280px" }}>
              <Form layout="vertical">
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: "Please enter your name!" },
                  ]}
                >
                  <Input size="large" placeholder="Your Name" />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                    { type: "email", message: "Enter a valid email!" },
                  ]}
                >
                  <Input size="large" placeholder="Your Email" />
                </Form.Item>
                <Form.Item
                  name="subject"
                  rules={[
                    { required: true, message: "Please enter a subject!" },
                  ]}
                >
                  <Input size="large" placeholder="Subject" />
                </Form.Item>
                <Form.Item
                  name="message"
                  rules={[
                    { required: true, message: "Please enter your message!" },
                  ]}
                >
                  <Input.TextArea
                    size="large"
                    rows={4}
                    placeholder="Your Message"
                  />
                </Form.Item>
                <Button size="large" type="primary" htmlType="submit" block>
                  Send Message
                </Button>
              </Form>
            </div>

            {/* Contact Info */}
            <div
              style={{
                flex: 1,
                minWidth: "280px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "15px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <MailOutlined style={{ fontSize: "18px", color: "#1890ff" }} />
                <Text>Email: contact@greenleaf.com</Text>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <PhoneOutlined style={{ fontSize: "18px", color: "#52c41a" }} />
                <Text>Phone: +880 1234 567 890</Text>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <EnvironmentOutlined
                  style={{ fontSize: "18px", color: "#ff4d4f" }}
                />
                <Text>123 Book Street, Dhaka, Bangladesh</Text>
              </div>
            </div>
          </div>

          {/*  Google Map */}
          <div
            style={{
              marginTop: "30px",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <iframe
              style={{ width: "100%", height: "500px", border: "none" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9020606622146!2d90.39119231498292!3d23.75086629464533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b89b1a4d93a5%3A0x4f30c91a3ad27f74!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sbd!4v1635769025784!5m2!1sen!2sbd"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
