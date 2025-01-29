import { Select } from "antd";

export default function Sort() {
  return (
    <Select size="large" style={{ width: "20%" }} defaultValue="None">
      <Select.Option value="asc">Price Low to High</Select.Option>
      <Select.Option value="desc">Price High to Low</Select.Option>
    </Select>
  );
}
