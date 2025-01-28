import { Fragment } from "react/jsx-runtime";
import bannerImage from "../../../assets/banner/Banner-01.png";
import { Button, Col, Image, Row } from "antd";

export default function Banner() {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // margin: "40px 0",
          backgroundColor: "#f0f9e9",
          borderRadius: "4px",
        }}
      >
        <Row
          style={{
            margin: "0 auto",
            maxWidth: "1536px",
            minHeight: "90vh",
            // border: "2px solid red",
            alignItems: "center",
          }}
          gutter={[16, 16]}
        >
          {/* Left Column with Text */}
          <Col xs={24} lg={12}>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#333",
              }}
            >
              Welcome to{" "}
              <span style={{ color: "#62AB00" }}>Green Leaf Bookstore</span>
            </h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "#555" }}>
              Dive into a world of endless knowledge and captivating stories. At
              Green Leaf, we offer a diverse range of books, from exciting
              fiction to insightful non-fiction and educational resources.
              Whether you're looking to lose yourself in a novel or expand your
              horizons with educational material, we have something to inspire
              every reader.
            </p>
            <h1
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                marginBottom: "1rem",
                color: "#62AB00",
              }}
            >
              Start Your Reading Journey Today!{" "}
            </h1>
            <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "#555" }}>
              Explore our collection and find your next favorite read.
              Experience the convenience of online shopping and have your books
              delivered right to your door.
            </p>
            <Button type="primary">Explore Now</Button>
          </Col>

          {/* Right Column with Image */}
          <Col
            xs={24}
            lg={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: 0,
            }}
          >
            <Image
              src={bannerImage}
              preview={false}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
