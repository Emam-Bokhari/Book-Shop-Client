import { Col, Input, Pagination, Row, theme } from "antd";
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
  const [priceRangeFilter, setPriceRangeFilter] = useState<number[]>([0, 3000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("None");
  const pageSize = 10;

  const filteredBooks =
    booksData?.data?.filter(
      (book) =>
        ["title", "author", "category"].some((key) =>
          book[key]?.toLowerCase()?.includes(searchQuery.toLowerCase())
        ) &&
        (categoryFilter === "All Categories" ||
          book.category === categoryFilter) &&
        (!inStockFilter || book.quantity > 0) &&
        book.price >= priceRangeFilter[0] &&
        book.price <= priceRangeFilter[1]
    ) || [];

  const sortedBooks =
    sortOrder === "asc"
      ? [...filteredBooks].sort((a, b) => a.price - b.price)
      : sortOrder === "desc"
      ? [...filteredBooks].sort((a, b) => b.price - a.price)
      : filteredBooks;

  const totalBooks = sortedBooks.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

  const handleSortChange = (value) => {
    setSortOrder(value);
  };

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
        {/* left sidebar Filters */}
        <Col xs={24} md={6}>
          <FilterSidebar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            inStockFilter={inStockFilter}
            setInStockFilter={setInStockFilter}
            priceRangeFilter={priceRangeFilter}
            setPriceRangeFilter={setPriceRangeFilter}
          />
        </Col>

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
            {!isSmallScreen && <Sort onSortChange={handleSortChange} />}
          </div>

          {/* Books Grid */}
          <Row gutter={[16, 16]}>
            {isFetching
              ? skeletonArray.map((_, index) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={index}>
                    <BookCardSkeleton />
                  </Col>
                ))
              : paginatedBooks.length > 0
              ? paginatedBooks.map((book) => (
                  <Col xs={24} sm={12} md={12} lg={8} xxl={6} key={book._id}>
                    <BookCard
                      id={book?._id}
                      title={book?.title}
                      image={book?.image}
                      price={book?.price}
                      rating={book?.rating}
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
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalBooks}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
            style={{ marginTop: "20px" }}
            align="end"
          />
        </Col>
      </Row>
    </Fragment>
  );
}
