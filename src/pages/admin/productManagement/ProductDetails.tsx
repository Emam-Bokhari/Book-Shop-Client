import { Fragment } from "react";
import { useGetProductQuery } from "../../../features/books/api";
import { useParams } from "react-router-dom";
import moment from "moment-timezone";
import { Card, Col, Row, Divider, Space, Rate, Button, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { TProduct } from "../../../types";
import { useMediaQuery } from "react-responsive";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: productData, isFetching } = useGetProductQuery(id);

  const isSmallScreen = useMediaQuery({ query: "(max-width: 767px)" });

  if (isFetching) {
    return (
      <div>
        <Row gutter={[16, 16]}>
          {/* Skeleton  */}
          <Col xs={24} sm={12} md={8}>
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

          <Col xs={24} sm={12} md={16}>
            <Card loading={true} bordered={false} style={{ height: "100%" }}>
              <Skeleton active paragraph={{ rows: 12 }} />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }

  if (!productData || !productData?.data) {
    return <div>Product not found.</div>;
  }

  const product = productData?.data as TProduct;

  return (
    <Fragment>
      <div>
        <Row gutter={[16, 16]}>
          {/* Product Image */}
          <Col xs={24} sm={12} md={8}>
            <Card
              cover={
                <img
                  alt="Product"
                  src={product?.image}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              }
            />
          </Col>

          {/* Product Details */}
          <Col xs={24} sm={12} md={16}>
            <Card
              title={product?.title}
              bordered={false}
              style={{ height: "100%" }}
            >
              {/* Descriptions  */}
              <div
                style={{
                  display: "flex",
                  flexDirection: isSmallScreen ? "column" : "row",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Category</strong>
                  <span style={{ flexBasis: "55%" }}>
                    {" "}
                    {product?.category
                      ? product?.category.charAt(0).toUpperCase() +
                        product?.category.slice(1)
                      : ""}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Author</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.author}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Publisher</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.publisher}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Published Date</strong>
                  <span style={{ flexBasis: "55%" }}>
                    {product?.publishedDate
                      ? moment(product?.publishedDate)
                          .tz("Asia/Dhaka")
                          .format("YYYY MMM DD")
                      : "Not Available"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Edition</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.edition}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Language</strong>
                  <span style={{ flexBasis: "55%" }}>
                    {" "}
                    {product?.language
                      ? product?.language.charAt(0).toUpperCase() +
                        product?.language.slice(1)
                      : ""}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Pages</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.pages}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Price</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.price} BDT</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Format</strong>
                  <span style={{ flexBasis: "55%" }}>
                    {" "}
                    {product?.format
                      ? product?.format?.charAt(0)?.toUpperCase() +
                        product?.format?.slice(1)
                      : ""}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Quantity</strong>
                  <span style={{ flexBasis: "55%" }}>{product?.quantity}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    flexBasis: isSmallScreen ? "100%" : "50%",
                  }}
                >
                  <strong style={{ flexBasis: "40%" }}>Rating</strong>
                  <span style={{ flexBasis: "55%" }}>
                    <Rate disabled value={product?.rating} />
                  </span>
                </div>
              </div>

              {/* Product Description */}
              <Divider />
              <h3>Description</h3>
              <p>{product?.description}</p>

              {/* Action Buttons */}
              <Space style={{ marginTop: "20px" }}>
                <Link to="/products">
                  <Button>Back to Products</Button>
                </Link>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
