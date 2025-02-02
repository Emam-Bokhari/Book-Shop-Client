import { Fragment } from "react/jsx-runtime";
import { Card, Col, Row, Spin, Statistic } from "antd";
import { useGetAllUsersQuery } from "../features/user/api";
import { useGetProductsNoDefaultPaginationQuery } from "../features/books/api";
import { useGetAllOrdersQuery } from "../features/order/api";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useMediaQuery } from "react-responsive";

export default function Dashboard() {
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  const { data: usersData, isLoading: usersLoading } =
    useGetAllUsersQuery(undefined);
  const { data: productsData, isLoading: productsLoading } =
    useGetProductsNoDefaultPaginationQuery(undefined);
  const { data: ordersData, isLoading: ordersLoading } =
    useGetAllOrdersQuery(undefined);

  if (usersLoading || productsLoading || ordersLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const totalProducts = productsData?.data?.length ?? 0;
  const totalOrders = ordersData?.data?.length ?? 0;
  const totalUsers = usersData?.data?.length ?? 0;

  const pieData = [
    { name: "Products", value: totalProducts },
    { name: "Orders", value: totalOrders },
    { name: "Users", value: totalUsers },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <Fragment>
      <div>
        <p
          style={{ fontSize: "24px", fontWeight: "600", marginBottom: "20px" }}
        >
          Dashboard
        </p>

        <Row gutter={[16, 16]}>
          {/* Product Data */}
          <Col xs={24} md={12} lg={8}>
            <Card
              title="Product Overview"
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Statistic
                title="Total Products"
                value={totalProducts}
                style={{ marginBottom: "16px", fontSize: "18px" }}
              />
            </Card>
          </Col>

          {/* Order Data */}
          <Col xs={24} md={12} lg={8}>
            <Card
              title="Order Overview"
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Statistic
                title="Total Orders"
                value={totalOrders}
                style={{ marginBottom: "16px", fontSize: "18px" }}
              />
            </Card>
          </Col>

          {/* User Data */}
          <Col xs={24} md={12} lg={8}>
            <Card
              title="User Overview"
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
              }}
            >
              <Statistic
                title="Total Users"
                value={totalUsers}
                style={{ marginBottom: "16px", fontSize: "18px" }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: "30px" }}>
          {/* Pie Chart */}
          <Col xs={24} md={12}>
            <Card
              title="Data Distribution"
              bordered={false}
              style={{
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f9f9f9",
                padding: "20px",
              }}
            >
              <ResponsiveContainer
                width="100%"
                height={isSmallScreen ? 200 : 300}
              >
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={isSmallScreen ? 60 : 100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
}
