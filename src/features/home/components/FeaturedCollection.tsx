import {
  Button,
  Card,
  Col,
  Rate,
  Row,
  Skeleton,
  theme,
  Typography,
} from "antd";
import { Fragment } from "react/jsx-runtime";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useGetAllProductsQuery } from "../../../redux/api/commonApi";

const { Title, Paragraph } = Typography;

const { useToken } = theme;

export default function FeaturedCollection() {
  const { token } = useToken();

  const { data: booksData, isLoading } = useGetAllProductsQuery(undefined);

  // skeleton cards
  const skeletonArray = Array.from({ length: 8 });

  console.log(booksData);

  return (
    <Fragment>
      <div
        style={{
          // border: "2px solid red",
          maxWidth: "1200px",
          margin: "20px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          Featured Collection
        </Title>
        <Paragraph
          style={{
            maxWidth: "600px",
            textAlign: "center",
            lineHeight: "1.6",
            color: token.colorTextSecondary,
          }}
        >
          Uncover the finest reads from our exclusive selection. From gripping
          stories to timeless masterpieces, dive into a world of books that
          captivate and inspire.
        </Paragraph>
        <Row
          gutter={[16, 16]}
          justify="center"
          style={{ width: "100%", marginTop: "20px" }}
        >
          {isLoading
            ? skeletonArray.map((_, index) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
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
                </Col>
              ))
            : booksData?.data?.map((book, _id) => (
                <Col
                  xs={24}
                  sm={12}
                  md={8}
                  lg={6}
                  key={_id}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #f0f0f0",
                      transition: "all 0.3s ease-in-out",
                    }}
                    hoverable
                    cover={
                      <img
                        src={book.image}
                        alt={book.title}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                        }}
                      />
                    }
                  >
                    <div style={{ textAlign: "center" }}>
                      <Title
                        level={5}
                        style={{ color: token.colorTextSecondary }}
                      >
                        {book.title}
                      </Title>
                      <Paragraph
                        style={{ color: "#62AB00", fontWeight: "bold" }}
                      >
                        BDT &nbsp;{book.price}
                      </Paragraph>
                      <Rate disabled defaultValue={4} />
                      <Button
                        icon={
                          <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                        }
                        iconPosition="end"
                        type="primary"
                        block
                        style={{ marginTop: "10px" }}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))}
        </Row>
      </div>
    </Fragment>
  );
}
