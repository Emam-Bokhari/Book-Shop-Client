import { Row, Col, Typography, Space, theme, Image } from "antd";
import logo from "../../assets/logo/Green-Leaf.png";

const { Title, Text } = Typography;
const { useToken } = theme;

export default function Footer() {
  const { token } = useToken();
  return (
    <footer
      style={{
        backgroundColor: "#b8d2b2",
        padding: "40px 8px",
        marginTop: "40px",
        borderTop: "1px solid #ddd",
      }}
    >
      <Row
        gutter={[16, 16]}
        justify="space-between"
        style={{ maxWidth: "1536px", margin: "auto" }}
      >
        {/* About Green Leaf */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <Image
              preview={false}
              src={logo}
              alt="Green Leaf Logo"
              width={60}
            />
            <Title level={5}>Green Leaf</Title>
          </div>
          <Text style={{ color: token.colorTextSecondary, display: "block" }}>
            Explore a world of books – from timeless classics to the latest
            bestsellers.
          </Text>
          <Text style={{ color: token.colorTextSecondary, display: "block" }}>
            Join us in celebrating the joy of reading.
          </Text>
        </Col>

        {/*  Categories */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Title level={5}>Category</Title>
          <Space direction="vertical">
            <Text style={{ color: token.colorTextSecondary }}>
              Action Books
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>Comedy</Text>
            <Text style={{ color: token.colorTextSecondary }}>Drama</Text>
            <Text style={{ color: token.colorTextSecondary }}>Horror</Text>
            <Text style={{ color: token.colorTextSecondary }}>Kids Books</Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Top 50 Books
            </Text>
          </Space>
        </Col>

        {/*  Useful Links */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Title level={5}>Useful Links</Title>
          <Space direction="vertical">
            <Text style={{ color: token.colorTextSecondary }}>
              Secure Shopping
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Privacy Policy
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Terms of Use
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Shipping Policy
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Returns Policy
            </Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Payment Option
            </Text>
          </Space>
        </Col>

        {/*  Explore */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Title level={5}>Explore</Title>
          <Space direction="vertical">
            <Text style={{ color: token.colorTextSecondary }}>About Us</Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Store Locator
            </Text>
            <Text style={{ color: token.colorTextSecondary }}> Kids Club</Text>
            <Text style={{ color: token.colorTextSecondary }}>Blogs</Text>
            <Text style={{ color: token.colorTextSecondary }}>Careers</Text>
            <Text style={{ color: token.colorTextSecondary }}>
              Become a Franchisee
            </Text>
          </Space>
        </Col>

        {/*  Get in Touch */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Title level={5}>Get in Touch</Title>
          <Space direction="vertical">
            <Text style={{ color: token.colorTextSecondary }}>Contact Us</Text>
          </Space>
        </Col>
      </Row>

      {/* Copyright Section */}
      <Row
        justify="center"
        style={{ marginTop: 40, paddingTop: 16, textAlign: "center" }}
      >
        <Text style={{ color: "#888888" }}>
          Copyright © 2025 Green Leaf. All rights reserved.
        </Text>
      </Row>
    </footer>
  );
}
