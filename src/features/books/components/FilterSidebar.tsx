import { Checkbox, Select, Slider, theme, Typography } from "antd";
import { useState } from "react";
const { Title } = Typography;

const { useToken } = theme;

export default function FilterSidebar({
  categoryFilter,
  setCategoryFilter,
  inStockFilter,
  setInStockFilter,
  priceRangeFilter,
  setPriceRangeFilter,
}) {
  const { token } = useToken();
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCategoryFilter(value);
  };

  const handleStockChange = (e) => {
    setInStockFilter(e.target.checked);
  };

  const handlePriceChange = (value) => {
    setPriceRangeFilter(value);
  };

  return (
    <div
      style={{
        padding: "16px",
        borderRight: "1px solid #ddd",
      }}
    >
      <Title level={5}>Filters</Title>
      {/* price range filter */}
      <div style={{ marginTop: "20px" }}>
        <Title level={5} style={{ color: token.colorTextSecondary }}>
          Price Range
        </Title>
        <Slider
          range
          min={0}
          max={5000}
          value={priceRangeFilter}
          onChange={handlePriceChange}
        />
        <div>
          <span>Min: {priceRangeFilter[0]}</span> -{" "}
          <span>Max: {priceRangeFilter[1]}</span>
        </div>
      </div>
      {/* category filter */}
      <div style={{ marginTop: "20px" }}>
        <Title level={5} style={{ color: token.colorTextSecondary }}>
          Category
        </Title>
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          size="large"
          style={{ width: "100%" }}
          defaultValue="None"
        >
          <Select.Option value="All Categories">All Categories</Select.Option>
          <Select.Option value="fiction">Fiction</Select.Option>
          <Select.Option value="non-fiction">Non-Fiction</Select.Option>
          <Select.Option value="academic">Academic</Select.Option>
          <Select.Option value="philosophy">Philosophy</Select.Option>
          <Select.Option value="children">Children</Select.Option>
          <Select.Option value="science">Science</Select.Option>
          <Select.Option value="religion">Religion</Select.Option>
          <Select.Option value="history">History</Select.Option>
        </Select>
      </div>

      {/* in stock filter */}
      <div style={{ marginTop: "20px" }}>
        <Checkbox
          style={{ color: token.colorTextSecondary }}
          checked={inStockFilter}
          onChange={handleStockChange}
        >
          In Stock
        </Checkbox>
      </div>
    </div>
  );
}
