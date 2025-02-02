import { Fragment } from "react/jsx-runtime";
import Banner from "../features/home/components/Banner";
import FeaturedCollection from "../features/home/components/FeaturedCollection";
import Testimonial from "../features/home/components/Testimonial";

export default function Home() {
  return (
    <Fragment>
      <Banner />
      <FeaturedCollection />
      <Testimonial />
    </Fragment>
  );
}
