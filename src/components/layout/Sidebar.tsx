import { Menu, Layout, Button } from "antd";
import { Fragment } from "react/jsx-runtime";
import {
  AppstoreAddOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useAppDispatch } from "../../redux/hook";
import { logout, logoutUser } from "../../features/auth/redux/authSlice";

const { Sider } = Layout;

const menuItems = [
  {
    key: "users",
    label: "Users",
    icon: <UserOutlined />,
    children: [
      {
        key: "create-user",
        label: <Link to="/create-user">Create User</Link>,
        icon: <UserAddOutlined />,
      },
      {
        key: "users",
        label: <Link to="/users">All Users</Link>,
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "create-product",
        label: <Link to="/create-product">Create Product</Link>,
        icon: <AppstoreAddOutlined />,
      },
      {
        key: "all-products",
        label: <Link to="/products">Products</Link>,
        icon: <UnorderedListOutlined />,
      },
    ],
  },
  {
    key: "orders",
    label: "Orders",
    icon: <ShoppingCartOutlined />,
    children: [
      {
        key: "all-orders",
        label: <Link to="/orders">All Orders</Link>,
        icon: <UnorderedListOutlined />,
      },
    ],
  },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 576 });

  const handleLogout = () => {
    dispatch(logout());
    dispatch(logoutUser());
  };
  return (
    <Fragment>
      <Sider
        width={250}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsedWidth={80}
        breakpoint="lg"
        onBreakpoint={(broken) => setCollapsed(broken)}
        style={{
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* logo */}
        <div
          style={{
            color: "white",
            height: "4rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "normal",
              fontSize: collapsed ? "16px" : "18px",
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              {collapsed ? "GL" : "Green Leaf"}
            </Link>
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          inlineCollapsed={collapsed}
        />
        {/* Logout  */}
        <div
          style={{
            position: "absolute",
            top: isSmallScreen ? "85vh" : "88vh",
            width: "100%",
          }}
        >
          <Menu theme="dark" mode="inline">
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              <Button onClick={handleLogout} type="primary">
                Logout
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      </Sider>
    </Fragment>
  );
}
