"use client";
import { JSX, useEffect, useState } from "react";
import axios from "axios";

import { Button, Table } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { openNotification } from "@util/Notification";
const Product = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [dataTable, setDataTable] = useState<Product[]>([]);

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

  const columns: Array<{
    title: string;
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
      title: "Action",
      key: "action",
      render: (record: Product) => (
        <Button
          type="link"
          onClick={() => router.push(`${pathname}/${record._id}`)}
        >
          Edit
        </Button>
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
    </>
  );
};
export default Product;
