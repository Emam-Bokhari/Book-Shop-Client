import { Col, Input, Row } from "antd";
import { Fragment } from "react/jsx-runtime";
import FilterSidebar from "../features/books/components/FilterSidebar";
import Sort from "../features/books/components/Sort";
import BookCard from "../components/common/BookCard";
import { useMediaQuery } from "react-responsive";
import { useGetAllProductsQuery } from "../features/books/api";
import BookCardSkeleton from "../components/skeleton/BookCardSkeleton";

export default function Books() {
  const isSmallScreen = useMediaQuery({ maxWidth: 992 });
  const { data: booksData, isFetching } = useGetAllProductsQuery(undefined);
  const skeletonArray = Array.from({ length: 8 });
  return (
    <Fragment>
      <Row
        gutter={[16, 16]}
        style={{
          maxWidth: "1536px",
          // border: "2px solid red",
          margin: "auto",
        }}
      >
        {/* Left Sidebar (Filters) */}
        <Col xs={24} md={6}>
          <FilterSidebar />
        </Col>

        {/* Books Display */}
        <Col xs={24} md={18}>
          {/* Search & Sort Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "16px",
            }}
          >
            <Input.Search
              size="large"
              placeholder="Search books..."
              style={{ width: isSmallScreen ? "100%" : "60%" }}
            />
            {/* Hide Sort on small screens */}
            {!isSmallScreen && <Sort />}
          </div>

          {/* Books Grid */}
          <Row gutter={[16, 16]}>
            {/*  */}
            {isFetching
              ? skeletonArray.map((_, index) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={index}>
                    <BookCardSkeleton />
                  </Col>
                ))
              : booksData?.data?.map((book, _id) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={_id}>
                    <BookCard
                      id={book._id}
                      title={book.title}
                      image={book.image}
                      price={book.price}
                      rating={book.rating}
                    />
                  </Col>
                ))}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}
