import DefaultLayout from "../components/layout/DefaultLayout";
import Books from "../pages/Books";
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import BookDetails from "../pages/BookDetails";
import ShoppingCart from "../pages/ShoppingCart";

export const publicRoutes = [
  { path: "/", element: <Home />, layout: DefaultLayout },
  { path: "/books", element: <Books />, layout: DefaultLayout },
  { path: "/books/:id", element: <BookDetails />, layout: DefaultLayout },
  { path: "/shopping-cart", element: <ShoppingCart />, layout: DefaultLayout },
  { path: "/about-us", element: <AboutUs />, layout: DefaultLayout },
  { path: "/contact-us", element: <ContactUs />, layout: DefaultLayout },
  { path: "/signin", element: <Signin />, layout: DefaultLayout },
  { path: "/signup", element: <Signup />, layout: DefaultLayout },
];
