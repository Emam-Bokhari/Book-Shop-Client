import { Select } from "antd";

export default function Sort({ onSortChange }) {
  const handleSortChange = (value) => {
    onSortChange(value);
  };
  return (
    <Select
      onChange={handleSortChange}
      size="large"
      style={{ width: "20%" }}
      defaultValue="None"
    >
      <Select.Option value="asc">Price Low to High</Select.Option>
      <Select.Option value="desc">Price High to Low</Select.Option>
    </Select>
  );
}
