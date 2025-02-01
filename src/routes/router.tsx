import DefaultLayout from "../components/layout/DefaultLayout";
import Books from "../pages/Books";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import BookDetails from "../pages/BookDetails";
import ShoppingCart from "../pages/ShoppingCart";
import NavOnlyLayout from "../components/layout/NavOnlyLayout";
import NotFoundPage from "../pages/NotFoundPage";
import PrivateRoute from "../components/common/PrivateRoute";
import OrderHistory from "../pages/OrderHistory";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import CreateUser from "../pages/admin/CreateUser";
import Users from "../pages/admin/Users";
import CreateProduct from "../pages/admin/productManagement/CreateProduct";
import Products from "../pages/admin/productManagement/Products";
import ProductDetails from "../pages/admin/productManagement/ProductDetails";
import UpdateProduct from "../pages/admin/productManagement/UpdateProduct";
import Orders from "../pages/admin/orderManagement/Orders";
import OrderDetails from "../pages/admin/orderManagement/OrderDetails";
import PaymentSuccess from "../pages/PaymentSuccess";
import PlainLayout from "../components/layout/PlainLayout";
import PaymentCancel from "../pages/PaymentCancel";
import PaymentFail from "../pages/PaymentFail";

export const publicRoutes = [
  { path: "/", element: <Home />, layout: DefaultLayout },
  { path: "/books", element: <Books />, layout: DefaultLayout },
  { path: "/books/:id", element: <BookDetails />, layout: DefaultLayout },
  {
    path: "/shopping-cart",
    element: (
      <PrivateRoute>
        <ShoppingCart />
      </PrivateRoute>
    ),
    layout: DefaultLayout,
  },
  {
    path: "/payment-success",
    element: (
      <PrivateRoute>
        <PaymentSuccess />
      </PrivateRoute>
    ),
    layout: PlainLayout,
  },
  {
    path: "/payment-cancel",
    element: (
      <PrivateRoute>
        <PaymentCancel />
      </PrivateRoute>
    ),
    layout: PlainLayout,
  },
  {
    path: "/payment-fail",
    element: (
      <PrivateRoute>
        <PaymentFail />
      </PrivateRoute>
    ),
    layout: PlainLayout,
  },
  {
    path: "/order-history",
    element: (
      <PrivateRoute>
        <OrderHistory />
      </PrivateRoute>
    ),
    layout: DefaultLayout,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    layout: DefaultLayout,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute role="admin">
        <Dashboard />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/create-user",
    element: (
      <PrivateRoute role="admin">
        <CreateUser />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/users",
    element: (
      <PrivateRoute role="admin">
        <Users />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/create-product",
    element: (
      <PrivateRoute role="admin">
        <CreateProduct />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/products",
    element: (
      <PrivateRoute role="admin">
        <Products />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/products/:id",
    element: (
      <PrivateRoute role="admin">
        <ProductDetails />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "update/products/:id",
    element: (
      <PrivateRoute role="admin">
        <UpdateProduct />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/orders",
    element: (
      <PrivateRoute role="admin">
        <Orders />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  {
    path: "/orders/:id",
    element: (
      <PrivateRoute role="admin">
        <OrderDetails />
      </PrivateRoute>
    ),
    layout: DashboardLayout,
  },
  { path: "/about-us", element: <AboutUs />, layout: DefaultLayout },
  { path: "/contact-us", element: <ContactUs />, layout: DefaultLayout },
  { path: "/signin", element: <Signin />, layout: NavOnlyLayout },
  { path: "/signup", element: <Signup />, layout: NavOnlyLayout },
  { path: "*", element: <NotFoundPage />, layout: NavOnlyLayout },
];
