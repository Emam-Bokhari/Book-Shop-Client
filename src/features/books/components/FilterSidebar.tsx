import { Checkbox, Select, Slider, theme, Typography } from "antd";
const { Title } = Typography;

const { useToken } = theme;

export default function FilterSidebar() {
  const { token } = useToken();
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
        <Slider range min={0} max={5000} />
      </div>
      {/* category filter */}
      <div style={{ marginTop: "20px" }}>
        <Title level={5} style={{ color: token.colorTextSecondary }}>
          Category
        </Title>
        <Select size="large" style={{ width: "100%" }} defaultValue="None">
          <Select.Option value="fiction">Fiction</Select.Option>
          <Select.Option value="non-fiction">Non-Fiction</Select.Option>
        </Select>
      </div>
      {/* in stock filter */}
      <div style={{ marginTop: "20px" }}>
        <Checkbox style={{ color: token.colorTextSecondary }}>
          In Stock
        </Checkbox>
      </div>
    </div>
  );
}
