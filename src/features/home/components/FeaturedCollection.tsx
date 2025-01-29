import { Col, Row, theme, Typography } from "antd";
import { Fragment } from "react/jsx-runtime";

import { useGetAllProductsQuery } from "../../../redux/api/commonApi";
import BookCard from "../../../components/common/BookCard";
import BookCardSkeleton from "../../../components/skeleton/BookCardSkeleton";

const { Title, Paragraph } = Typography;

const { useToken } = theme;

export default function FeaturedCollection() {
  const { token } = useToken();

  const { data: booksData, isFetching } = useGetAllProductsQuery(undefined);

  // skeleton cards
  const skeletonArray = Array.from({ length: 8 });

  console.log(booksData);

  function handleAddToCart() {
    console.log("hello");
  }

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
          justify="start"
          style={{ width: "100%", marginTop: "20px" }}
        >
          {isFetching
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
                  <BookCardSkeleton />
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
                  <BookCard
                    onAddToCart={handleAddToCart}
                    title={book?.title}
                    price={book?.price}
                    image={book?.image}
                    rating={book?.rating}
                  />
                </Col>
              ))}
        </Row>
      </div>
    </Fragment>
  );
}
