import { Button, Card, Col, Rate, Row, theme, Typography } from "antd";
import { Fragment } from "react/jsx-runtime";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const { useToken } = theme;

const featuredBooks = [
  {
    title: "The Great Gatsby",
    price: "BDT 1,200",
    img: "https://m.media-amazon.com/images/I/41Bb4IV71pL._SY445_SX342_.jpg",
    rating: 4.5,
  },
  {
    title: "1984",
    price: "BDT 950",
    img: "https://m.media-amazon.com/images/I/81IM6vEPvLL._SY466_.jpg",
    rating: 4,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://m.media-amazon.com/images/I/41zwpR1ss+L._SY445_SX342_.jpg",
    rating: 5,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://m.media-amazon.com/images/I/41AkWC3ruYL._SY445_SX342_.jpg",
    rating: 5,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://m.media-amazon.com/images/I/41ah3uXJHYL._SY445_SX342_.jpg",
    rating: 5,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://i.ibb.co.com/g4vW1JK/91-I1-KDn-K1k-L-SY466.jpg",
    rating: 5,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://m.media-amazon.com/images/I/41pehfGTI5L._SY445_SX342_.jpg",
    rating: 5,
  },
  {
    title: "Pride and Prejudice",
    price: "BDT 1,100",
    img: "https://m.media-amazon.com/images/I/41Y8Fw7UhQL._SY445_SX342_.jpg",
    rating: 5,
  },
];

export default function FeaturedCollection() {
  const { token } = useToken();
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
          {featuredBooks.map((book, index) => (
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
                  // maxWidth: "250px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #f0f0f0",
                  transition: "all 0.3s ease-in-out",
                }}
                hoverable
                cover={
                  <img
                    src={book.img}
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
                  <Title level={5} style={{ color: token.colorTextSecondary }}>
                    {book.title}
                  </Title>
                  <Paragraph style={{ color: "#62AB00", fontWeight: "bold" }}>
                    {book.price}
                  </Paragraph>
                  <Rate disabled defaultValue={4} />
                  <Button
                    icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
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
