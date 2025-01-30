import { Typography } from "antd";
import { useMediaQuery } from "react-responsive";

export default function SectionBanner() {
  const { Title } = Typography;
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  return (
    <div
      style={{
        width: "100%",
        height: isSmallScreen ? "250px" : "350px",
        background:
          "url('https://i.ibb.co.com/fdJ0qphR/about-us-banner.jpg') center/cover no-repeat",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Title level={1}>
          <span style={{ color: "#ffffff" }}> Welcome to Our </span>
          <span style={{ color: "#62AB00" }}>Bookstore</span>
        </Title>
      </div>
    </div>
  );
}
