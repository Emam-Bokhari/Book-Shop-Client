import { Layout } from "antd";
import { Fragment } from "react/jsx-runtime";
import Sidebar from "./Sidebar";
const { Header, Content } = Layout;

export default function DashboardLayout({ children }) {
  return (
    <Fragment>
      <Layout style={{ height: "100vh", overflow: "hidden" }}>
        <Sidebar />
        <Layout style={{ height: "100%", overflow: "auto" }}>
          <Header />
          <Content style={{ overflow: "auto" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Fragment>
  );
}
