import { Button, Col, Row, Menu, Typography, Drawer, Flex } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { useState } from "react";
import logo from "../../assets/logo/Green-Leaf.png";
import { useMediaQuery } from "react-responsive";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const { Title } = Typography;

export default function Navbar() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems = [
    { label: <NavLink to="/"> Home </NavLink>, key: "home" },
    {
      label: <NavLink to="/books"> Books </NavLink>,
      key: "books",
    },
    {
      label: <NavLink to="/about-us"> About Us </NavLink>,
      key: "about-us",
    },
    {
      label: <NavLink to="/contact-us"> Contact Us </NavLink>,
      key: "contact-us",
    },
  ];

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  return (
    <header
      style={{
        maxWidth: "1200px",
        margin: "auto",
        padding: "8px",
      }}
    >
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
          style={{
            display: "flex",
            alignItems: "center",
          }}
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
              style={{
                objectFit: "contain",
              }}
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
            style={{
              borderBottom: "none",
              justifyContent: "center",
            }}
          />
        </Col>

        {/* Buttons for Login and Signup */}
        <Col xs={0} sm={0} md={0} lg={6} style={{ textAlign: "right" }}>
          <Button
            icon={<ShoppingCartOutlined />}
            type="text"
            style={{ fontSize: "22px" }}
          />
          <Button type="text" style={{ marginRight: "10px" }}>
            <NavLink to="/signin">Signin</NavLink>
          </Button>
          <Button type="primary">
            <NavLink to="/signup">Signup</NavLink>
          </Button>
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
          style={{
            borderBottom: "none",
          }}
        />
        <Button type="text" block style={{ marginTop: "20px" }}>
          <NavLink to="/signin">Signin</NavLink>
        </Button>
        <Button type="primary" block style={{ marginTop: "10px" }}>
          <NavLink to="/signup">Signup</NavLink>
        </Button>
        <Button
          icon={
            <ShoppingCartOutlined
              style={{
                fontSize: "20px",
              }}
            />
          }
          iconPosition="end"
          type="primary"
          block
          style={{ marginTop: "20px" }}
        >
          Shopping Cart
        </Button>
      </Drawer>
    </header>
  );
}
