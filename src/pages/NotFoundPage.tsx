import { Button, Typography, Row, Col, theme } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import animationData from "../assets/animation/animationData.json";
import Lottie from "react-lottie";

const { Title, Text } = Typography;

const { useToken } = theme;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

export default function NotFoundPage() {
  const { token } = useToken();
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ textAlign: "center", width: "100%" }}
      >
        <Col
          span={24}
          style={{
            maxWidth: "600px",
            width: "100%",
            padding: "40px",
          }}
        >
          {/* lottie animation */}
          <div style={{ marginBottom: "20px" }}>
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>

          <Title level={2} style={{ marginBottom: "10px" }}>
            404 - Page Not Found
          </Title>

          <Text
            style={{
              fontSize: "18px",
              color: token.colorTextSecondary,
              marginBottom: "30px",
              lineHeight: "1.6",
              display: "block",
            }}
          >
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </Text>

          <div style={{ marginTop: "20px" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                type="primary"
                icon={<HomeOutlined />}
                size="large"
                style={{
                  padding: "12px 24px",
                  fontSize: "18px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.3s ease",
                }}
              >
                Back to Home
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}
