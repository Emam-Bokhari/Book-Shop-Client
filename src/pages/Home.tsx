import { Fragment } from "react/jsx-runtime";
import Navbar from "../components/layout/Navbar";
import Banner from "../features/home/components/Banner";
import FeaturedCollection from "../features/home/components/FeaturedCollection";
import Footer from "../components/layout/Footer";

export default function Home() {
  return (
    <Fragment>
      <Navbar />
      <Banner />
      <FeaturedCollection />
      <Footer />
    </Fragment>
  );
}
