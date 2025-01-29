import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function DefaultLayout({ children }) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
