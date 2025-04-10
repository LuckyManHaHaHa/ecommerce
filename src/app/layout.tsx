"use client";
import Sider from "../../components/sider/Sider";
import "@ant-design/v5-patch-for-react-19";
// antd
import { Layout, notification } from "antd";

// style globals
import "./globals.scss";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { Header, Content, Footer } = Layout;
  const [, contextHolder] = notification.useNotification();

  return (
    <html lang="en">
      <body>
        <Layout>
          <Sider />
          <Layout>
            <Header className="app__header"></Header>

            <Content className="app__content ">
              {contextHolder}
              {children}
            </Content>
            <Footer className="text-center app__footer">Footer page</Footer>
          </Layout>
        </Layout>
      </body>
    </html>
  );
}
