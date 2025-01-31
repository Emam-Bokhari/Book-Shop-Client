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
  { path: "/about-us", element: <AboutUs />, layout: DefaultLayout },
  { path: "/contact-us", element: <ContactUs />, layout: DefaultLayout },
  { path: "/signin", element: <Signin />, layout: NavOnlyLayout },
  { path: "/signup", element: <Signup />, layout: NavOnlyLayout },
  { path: "*", element: <NotFoundPage />, layout: NavOnlyLayout },
];
