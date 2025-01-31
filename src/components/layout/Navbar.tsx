import {
  Button,
  Col,
  Row,
  Menu,
  Typography,
  Drawer,
  Badge,
  Dropdown,
  Flex,
} from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../features/auth/redux/authSlice";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/logo/Green-Leaf.png";
import { DashboardOutlined } from "@ant-design/icons";

const { Title } = Typography;

export default function Navbar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;
  const user = useSelector((state: RootState) => state.auth.user);

  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { label: <NavLink to="/">Home</NavLink>, key: "home" },
    { label: <NavLink to="/books">Books</NavLink>, key: "books" },
    { label: <NavLink to="/about-us">About Us</NavLink>, key: "about-us" },
    {
      label: <NavLink to="/contact-us">Contact Us</NavLink>,
      key: "contact-us",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const profileMenu = (
    <Menu style={{ width: "200px", borderRadius: "8px" }}>
      <Menu.Item
        key="1"
        icon={<UserOutlined style={{ fontSize: "16px" }} />}
        style={{ marginBottom: "10px" }}
      >
        <NavLink to="/profile">My Profile</NavLink>
      </Menu.Item>
      <Menu.Item
        key="2"
        icon={<ShoppingCartOutlined style={{ fontSize: "16px" }} />}
        style={{ marginBottom: "10px" }}
      >
        <NavLink to="/order-history">Order History</NavLink>
      </Menu.Item>
      {user?.role === "admin" && (
        <Menu.Item
          key="3"
          icon={<DashboardOutlined style={{ fontSize: "16px" }} />}
          style={{ marginBottom: "10px" }}
        >
          <NavLink to="/dashboard">Dashboard</NavLink>
        </Menu.Item>
      )}
      <Menu.Item
        key="4"
        icon={<LogoutOutlined style={{ fontSize: "16px" }} />}
        onClick={handleLogout}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <header style={{ maxWidth: "1200px", margin: "auto", padding: "8px" }}>
      <Row justify="space-between" align="middle" gutter={16}>
        {/* Mobile and Medium Menu Toggle */}
        <Col xs={4} sm={4} md={4} lg={0} style={{ textAlign: "left" }}>
          <Button
            icon={<MenuOutlined />}
            type="text"
            onClick={toggleDrawer}
            style={{ fontSize: "22px" }}
          />
        </Col>

        {/* Logo Section */}
        <Col
          xs={16}
          sm={16}
          md={16}
          lg={6}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Flex
            gap={10}
            align="center"
            style={{
              width: "100%",
              justifyContent: useMediaQuery({ query: "(min-width: 992px)" })
                ? "flex-start"
                : "flex-end",
            }}
          >
            <img
              src={logo}
              alt="Green Leaf Logo"
              width={60}
              style={{ objectFit: "contain" }}
            />
            <Title level={3} style={{ margin: 0 }}>
              Green <span style={{ color: "#62AB00" }}>Leaf</span>
            </Title>
          </Flex>
        </Col>

        {/* Navigation Menu for Larger Screens */}
        <Col xs={0} sm={0} md={0} lg={12}>
          <Menu
            mode="horizontal"
            items={menuItems}
            selectable={false}
            style={{ borderBottom: "none", justifyContent: "center" }}
          />
        </Col>

        {/* Buttons for Login, Signup, or Profile & Cart */}
        {/* Hide buttons on small screens */}
        <Col
          xs={0}
          sm={0}
          md={0}
          lg={6}
          style={{
            textAlign: "right",
            display: isSmallScreen ? "none" : "flex",
            justifyContent: "flex-end",
          }}
        >
          {user ? (
            <>
              <Link to="/shopping-cart" style={{ position: "relative" }}>
                <Badge count={cartCount} overflowCount={99}>
                  <Button
                    icon={<ShoppingCartOutlined />}
                    type="text"
                    style={{ fontSize: "22px" }}
                  />
                </Badge>
              </Link>

              <Dropdown overlay={profileMenu} trigger={["click"]}>
                <Button
                  icon={<UserOutlined />}
                  type="text"
                  style={{ fontSize: "22px" }}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: "0" }}>
                <Button type="text" style={{ marginRight: "0" }}>
                  <NavLink to="/signin">Signin</NavLink>
                </Button>
                <Button type="primary" style={{ marginLeft: "0" }}>
                  <NavLink to="/signup">Signup</NavLink>
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>

      {/* Drawer for Mobile and Medium Screens */}
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={toggleDrawer}
        visible={drawerVisible}
        width={250}
      >
        <Menu
          mode="vertical"
          items={menuItems}
          selectable={false}
          style={{ borderBottom: "none" }}
        />
        {user ? (
          <>
            <Button type="text" block style={{ marginTop: "10px" }}>
              <NavLink to="/profile">My Profile</NavLink>
            </Button>
            <Button type="text" block style={{ marginTop: "10px" }}>
              <NavLink to="/order-history">Order History</NavLink>
            </Button>
            {user?.role === "admin" && (
              <Button type="text" block style={{ marginTop: "10px" }}>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Button>
            )}
            <Button
              type="text"
              block
              style={{ marginTop: "20px" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button type="text" block style={{ marginTop: "20px" }}>
              <NavLink to="/signin">Signin</NavLink>
            </Button>
            <Button type="primary" block style={{ marginTop: "10px" }}>
              <NavLink to="/signup">Signup</NavLink>
            </Button>
          </>
        )}
        <Link to="/shopping-cart">
          <Button
            icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
            iconPosition="end"
            type="primary"
            block
            style={{ marginTop: "20px" }}
          >
            Shopping Cart
          </Button>
        </Link>
      </Drawer>
    </header>
  );
}
