import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <Fragment>
      <Navbar />
      {children}
      <Footer />
    </Fragment>
  );
}
