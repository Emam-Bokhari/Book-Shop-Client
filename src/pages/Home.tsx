import { Fragment } from "react/jsx-runtime";
import Banner from "../features/home/components/Banner";
import FeaturedCollection from "../features/home/components/FeaturedCollection";

export default function Home() {
  return (
    <Fragment>
      <Banner />
      <FeaturedCollection />
    </Fragment>
  );
}
