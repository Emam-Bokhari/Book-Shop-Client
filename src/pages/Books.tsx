import { Col, Input, Row, theme } from "antd";
import { Fragment } from "react/jsx-runtime";
import FilterSidebar from "../features/books/components/FilterSidebar";
import Sort from "../features/books/components/Sort";
import BookCard from "../components/common/BookCard";
import { useMediaQuery } from "react-responsive";
import { useGetAllProductsQuery } from "../features/books/api";
import BookCardSkeleton from "../components/skeleton/BookCardSkeleton";
import { useState } from "react";

const { useToken } = theme;

export default function Books() {
  const { token } = useToken();
  const isSmallScreen = useMediaQuery({ maxWidth: 992 });
  const { data: booksData, isFetching } = useGetAllProductsQuery(undefined);
  const skeletonArray = Array.from({ length: 8 });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [inStockFilter, setInStockFilter] = useState(false);

  const filteredBooks =
    booksData?.data?.filter(
      (book) =>
        ["title", "author", "category"].some((key) =>
          book[key]?.toLowerCase()?.includes(searchQuery.toLowerCase())
        ) &&
        (categoryFilter === "All Categories" ||
          book.category === categoryFilter) &&
        (!inStockFilter || book.quantity > 0)
    ) || [];

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
          <FilterSidebar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            inStockFilter={inStockFilter}
            setInStockFilter={setInStockFilter}
          />
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
              placeholder="Search books by title, author, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: isSmallScreen ? "100%" : "60%" }}
            />
            {/* Hide Sort on small screens */}
            {!isSmallScreen && <Sort />}
          </div>

          {/* Books Grid */}
          <Row gutter={[16, 16]}>
            {isFetching
              ? skeletonArray.map((_, index) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={index}>
                    <BookCardSkeleton />
                  </Col>
                ))
              : filteredBooks?.length > 0
              ? filteredBooks?.map((book, _id) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={_id}>
                    <BookCard
                      id={book._id}
                      title={book.title}
                      image={book.image}
                      price={book.price}
                      rating={book.rating}
                    />
                  </Col>
                ))
              : !isFetching && (
                  <Col
                    span={24}
                    style={{ textAlign: "center", marginTop: "20px" }}
                  >
                    <h3 style={{ color: token.colorTextSecondary }}>
                      No books found!
                    </h3>
                  </Col>
                )}
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
}
