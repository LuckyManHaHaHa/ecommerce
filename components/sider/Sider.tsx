import { FC, useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useRouter } from "next/navigation";
import {
  AppstoreOutlined,
  UserOutlined,
  ShopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  DatabaseOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const Slide: FC = () => {
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const router = useRouter();
  return (
    <Sider
      className="app__sider"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="demo-logo-vertical" />
      <Button
        type="text"
        className="!w-full text-[16px]"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <Menu
        theme="light"
        mode="inline"
        items={[
          {
            key: "0",
            icon: <HomeOutlined />,
            label: "Home",
            onClick: () => {
              router.push("/");
            },
          },
          {
            key: "1",
            icon: <UserOutlined />,
            label: "User",
            onClick: () => {
              router.push("/signin");
            },
          },
          {
            key: "2",
            icon: <ShopOutlined />,
            label: "Ecommerce Admin",
          },
          {
            key: "3",
            icon: <AppstoreOutlined />,
            label: "Product",
            onClick: () => {
              router.push("/product");
            },
          },
          {
            key: "4",
            icon: <DatabaseOutlined />,
            label: "Orders",
            onClick: () => {
              router.push("/product");
            },
          },
          {
            key: "5",
            icon: <SettingOutlined />,
            label: "Settings",
          },
        ]}
      />
    </Sider>
  );
};
export default Slide;
