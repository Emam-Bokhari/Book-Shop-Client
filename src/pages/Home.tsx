import { Fragment } from "react/jsx-runtime";
import Navbar from "../components/layout/Navbar";
import Banner from "../features/home/components/Banner";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
    </Fragment>
  );
}
