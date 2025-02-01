import { Fragment } from "react/jsx-runtime";
import { ReactNode } from "react";

interface NavOnlyLayoutProps {
  children: ReactNode;
}

export default function PlainLayout({ children }: NavOnlyLayoutProps) {
  return <Fragment>{children}</Fragment>;
}
