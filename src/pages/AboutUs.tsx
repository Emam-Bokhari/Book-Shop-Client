import { Typography, Row, Col, Button, theme } from "antd";
import {
  BookOutlined,
  SmileOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import SectionBanner from "../components/common/SectionBanner";

const { Title, Text } = Typography;
const { useToken } = theme;

export default function AboutUs() {
  const { token } = useToken();
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Banner */}
      <SectionBanner />

      <div style={{ padding: "60px 8px", maxWidth: "1200px", margin: "auto" }}>
        {/* Who We Are Section */}
        <Row gutter={[40, 40]} style={{ marginBottom: "60px" }}>
          <Col xs={24} lg={12}>
            <img
              src="https://i.ibb.co.com/CshYpTQf/about-us-banner-02.jpg"
              alt="Bookstore"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Col>
          <Col
            xs={24}
            lg={12}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Title level={3}>Who We Are</Title>
            <Text
              style={{ color: token.colorTextSecondary, lineHeight: "1.6" }}
            >
              <strong>Established in 2010</strong>,
              <strong style={{ color: "#62AB00" }}>Green Leaf</strong> has grown
              into one of the leading bookstores in Bangladesh, serving over{" "}
              <strong>1 million customers</strong> nationwide. With{" "}
              <strong>20+ branches</strong> across <strong>15 districts</strong>
              , we continue to bring literature closer to book lovers. Our
              dedicated team of
              <strong>150+ staff members</strong> works tirelessly to ensure
              readers get access to timeless classics, bestsellers, and academic
              resources. Over the years, we have been honored with multiple
              awards, including:
            </Text>

            <ul
              style={{
                color: token.colorTextSecondary,
                marginTop: "20px",
                listStyle: "none",
              }}
            >
              <li>
                🏆 <strong>Best Bookstore Award (2018, 2022)</strong>
              </li>
              <li>
                📚 <strong>Reader’s Choice Award (2021)</strong>
              </li>
              <li>
                🌍 <strong>Innovation in Online Book Retail (2023)</strong>
              </li>
            </ul>

            <Text
              style={{
                color: token.colorTextSecondary,
                marginTop: "20px",
                lineHeight: "1.6",
              }}
            >
              Under the visionary leadership of our{" "}
              <strong style={{ color: "#62AB00" }}>
                CEO, Md. Moshfiqur Rahman
              </strong>
              , we continue to expand our presence, making books accessible to
              everyone, everywhere.
            </Text>
          </Col>
        </Row>

        {/* Why Choose Us Section */}
        <Title
          level={3}
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          Why Choose Us? 📖✨
        </Title>
        <Row
          gutter={[40, 40]}
          style={{
            textAlign: "center",
          }}
        >
          <Col xs={24} lg={8}>
            <BookOutlined style={{ fontSize: "40px", color: "#1890ff" }} />
            <Title level={4} style={{ marginTop: "10px" }}>
              Vast Collection
            </Title>
            <Text style={{ color: token.colorTextSecondary }}>
              Thousands of books across multiple genres and categories.
            </Text>
          </Col>

          <Col xs={24} lg={8}>
            <SmileOutlined style={{ fontSize: "40px", color: "#52c41a" }} />
            <Title level={4} style={{ marginTop: "10px" }}>
              Personalized Recommendations
            </Title>
            <Text style={{ color: token.colorTextSecondary }}>
              Find books tailored to your interests with AI-powered suggestions.
            </Text>
          </Col>

          <Col xs={24} lg={8}>
            <SafetyCertificateOutlined
              style={{ fontSize: "40px", color: "#faad14" }}
            />
            <Title level={4} style={{ marginTop: "10px" }}>
              Trusted & Reliable
            </Title>
            <Text style={{ color: token.colorTextSecondary }}>
              10+ years of experience in serving book lovers worldwide.
            </Text>
          </Col>
        </Row>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/books">
            <Button type="primary" size="large" shape="round">
              Start Shopping Now 🚀
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
