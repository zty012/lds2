import { App, ConfigProvider, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MyMenu from "./_menu";

export default function MyApp() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          borderRadius: 16,
        },
      }}
    >
      <App>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout.Sider>
            <MyMenu />
          </Layout.Sider>
          <Layout.Content style={{ margin: 16 }}>
            <Outlet />
          </Layout.Content>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
