import { Fragment } from "react/jsx-runtime";
import Navbar from "./Navbar";
import { ReactNode } from "react";

interface NavOnlyLayoutProps {
  children: ReactNode;
}

export default function NavOnlyLayout({ children }: NavOnlyLayoutProps) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}
