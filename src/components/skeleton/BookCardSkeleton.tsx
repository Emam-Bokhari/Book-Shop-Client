import { Card, Skeleton } from "antd";

export default function BookCardSkeleton() {
  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #f0f0f0",
      }}
      hoverable
    >
      <div style={{ position: "relative", height: "200px" }}>
        <Skeleton.Image
          active
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
          }}
        />
      </div>
      <Skeleton
        active
        paragraph={{ rows: 1 }}
        title={{ width: "60%" }}
        style={{ marginTop: "30px" }}
      />
      <Skeleton.Button
        active
        block
        style={{ marginTop: "10px", height: "36px" }}
      />
    </Card>
  );
}
