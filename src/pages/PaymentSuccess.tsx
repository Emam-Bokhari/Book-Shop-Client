import { Result, Button } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Result
          icon={
            <CheckCircleTwoTone
              twoToneColor="#52c41a"
              style={{ fontSize: "60px" }}
            />
          }
          title={
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              Payment Successful
            </span>
          }
          subTitle={
            <span style={{ fontSize: "16px", color: "#666" }}>
              Congratulations! Your payment has been processed successfully.
            </span>
          }
        />
        <Link to="/">
          <Button
            type="primary"
            style={{
              marginTop: "20px",
            }}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
