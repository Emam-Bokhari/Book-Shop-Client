import { Route, Routes } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { publicRoutes } from "./routes/router";

export default function App() {
  return (
    <Fragment>
      <Routes>
        {/* public routes */}
        {publicRoutes.map(({ path, element, layout: Layout }, index) => (
          <Route
            key={index}
            path={path}
            element={Layout ? <Layout>{element}</Layout> : element}
          />
        ))}
      </Routes>
    </Fragment>
  );
}
