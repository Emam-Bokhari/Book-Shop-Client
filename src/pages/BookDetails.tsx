import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetProductQuery } from "../features/books/api";
import moment from "moment-timezone";
import {
  Button,
  Card,
  Col,
  Image,
  Rate,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import { ShoppingCartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import BookDetailsSkeleton from "../components/skeleton/BookDetailsSkeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/redux/cartSlice";
const { Title, Text, Paragraph } = Typography;
const { useToken } = theme;

export default function BookDetails() {
  const { token } = useToken();
  const { id } = useParams();
  const { data: book, isLoading } = useGetProductQuery(id);
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const dispatch = useDispatch();
  if (isLoading) {
    return <BookDetailsSkeleton />;
  }

  function handleAddToCart() {
    const cartItem = {
      id: book?.data._id,
      image: book?.data.image,
      title: book?.data.title,
      price: book?.data.price,
    };
    dispatch(addToCart(cartItem));
  }

  return (
    <Fragment>
      <Card
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: 0,
          // border: "2px solid red",
          boxShadow: "none",
          background: "transparent",
        }}
        bordered={false}
      >
        <Row gutter={isSmallScreen ? [32, 32] : [80, 80]} align="top">
          <Col xs={24} md={10} lg={8} style={{ textAlign: "center" }}>
            <Image
              preview={false}
              src={book?.data.image}
              alt={book?.data.title}
              style={{ width: "100%", borderRadius: "6px" }}
            />
          </Col>
          <Col xs={24} md={14} lg={16}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Title
                level={2}
                style={{ marginBottom: 0, textTransform: "capitalize" }}
              >
                {book?.data.title}
              </Title>
              <Text>
                by{" "}
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {book?.data.author}
                </span>
              </Text>
              <Text>
                <span style={{ color: "#62AB00", fontWeight: "bold" }}>
                  BDT {book?.data.price}
                </span>
              </Text>
              <Text>
                <strong>Category:</strong>
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {book?.data.category}
                </span>
              </Text>
              <Text>
                <strong>Publisher:</strong>
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {book?.data.publisher}
                </span>
              </Text>
              <Text>
                <strong>Published Date: </strong>
                <span style={{ color: token.colorTextSecondary }}>
                  {book?.data?.publishedDate ? (
                    moment(book?.data?.publishedDate)
                      .tz("Asia/Dhaka")
                      .format("YYYY-MMM-DD")
                  ) : (
                    <Text type="secondary">Date not available</Text>
                  )}
                </span>
              </Text>
              <Text>
                <strong>Edition:</strong>
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {book?.data?.edition}
                </span>
              </Text>
              <Text>
                <strong>Language:</strong>
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {" "}
                  {book?.data?.language}
                </span>
              </Text>
              <Text>
                <strong>Pages:</strong>{" "}
                <span style={{ color: token.colorTextSecondary }}>
                  {book?.data.pages}
                </span>
              </Text>
              <Text>
                <strong>Format:</strong>{" "}
                <span
                  style={{
                    color: token.colorTextSecondary,
                    textTransform: "capitalize",
                  }}
                >
                  {book?.data.format}
                </span>
              </Text>
              <Rate
                disabled
                value={book?.data.rating}
                style={{ fontSize: "18px" }}
              />
              <Space style={{ marginTop: "20px" }}>
                <Button
                  onClick={handleAddToCart}
                  type="primary"
                  iconPosition="end"
                  icon={<ShoppingCartOutlined />}
                >
                  Add to Cart
                </Button>
                <Button icon={<ShareAltOutlined />}>Share</Button>
              </Space>
            </Space>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col span={24}>
            <Title level={4}>Description</Title>
            <Paragraph
              style={{
                lineHeight: "1.6",
                color: token.colorTextSecondary,
              }}
            >
              {book?.data?.description}
            </Paragraph>
          </Col>
        </Row>
      </Card>
    </Fragment>
  );
}
