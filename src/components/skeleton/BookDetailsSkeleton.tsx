import { Card, Col, Row, Skeleton, Space } from "antd";
import { useMediaQuery } from "react-responsive";

export default function BookDetailsSkeleton() {
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  return (
    <Card
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: 0,
        boxShadow: "none",
        background: "transparent",
      }}
      bordered={false}
    >
      <Row gutter={isSmallScreen ? [32, 32] : [80, 80]} align="top">
        <Col xs={24} md={10} lg={8} style={{ textAlign: "center" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "133%",
            }}
          >
            <Skeleton.Image
              active
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
          </div>
        </Col>
        <Col xs={24} md={14} lg={16}>
          <Skeleton active paragraph={{ rows: 6 }} />
          <Space style={{ marginTop: "20px" }}>
            <Skeleton.Button active />
            <Skeleton.Button active />
          </Space>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Skeleton active paragraph={{ rows: 4 }} />
        </Col>
      </Row>
    </Card>
  );
}
