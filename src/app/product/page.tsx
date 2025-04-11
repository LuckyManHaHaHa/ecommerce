"use client";
import { JSX, useEffect, useState, useContext } from "react";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { openNotification } from "@util/Notification";
import { AppContext } from "@/app/context/context";
// components
import ModalDeleteProduct from "@components/modal/ModalDeleteProduct";

const Product = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [dataTable, setDataTable] = useState<Product[]>([]);
  const [isreload, setIsReload] = useState(false);
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within a AppProvider");
  }
  const { dispatch } = context;

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/product");
      setDataTable(response.data);
      openNotification({
        message: "Success",
        description: "Products fetched successfully!",
        type: "success",
      });
    } catch (error) {
      openNotification({
        message: "Error",
        description:
          (error as { message?: string })?.message ||
          "Failed to fetch products.",
        type: "error",
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (isreload) {
      fetchData();
      setIsReload(false);
    }
  }, [isreload]);

  const columns: Array<{
    title: string | JSX.Element;
    dataIndex?: keyof Product;
    key: string;
    width?: number;
    render?: (record: Product) => JSX.Element;
  }> = [
    {
      title: "Index",
      key: "index",
      width: 50,
      render: (record) => {
        return <span>{record.key + 1}</span>;
      },
    },
    {
      title: "ID",
      dataIndex: "_id",
      width: 100,
      key: "_id",
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 100,
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 100,
      key: "description",
    },
    {
      title: <span className="flex">Action</span>,
      key: "action",
      render: (record: Product) => (
        <div className="flex gap-2">
          <Button
            icon={<EditOutlined />}
            onClick={() => router.push(`${pathname}/${record._id}`)}
          >
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => {
              dispatch({
                type: "SET_OPEN_MODAL",
                payload: { name: "modalDeleteProduct" },
              });
              dispatch({
                type: "SET_ID",
                payload: { id: record._id },
              });
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="flex gap-2">
        <h1 className="text-[20px] text-black ">Product page</h1>
        <Button type="primary" onClick={() => router.push(`${pathname}/new`)}>
          Add New Product
        </Button>
      </div>
      <Table<Product>
        columns={columns}
        dataSource={dataTable.map((item, index) => ({ ...item, key: index }))}
        pagination={{
          position: ["bottomLeft"],
          pageSizeOptions: [10, 20, 50, 100],
        }}
      />
      <ModalDeleteProduct setReload={setIsReload} />
    </>
  );
};
export default Product;
