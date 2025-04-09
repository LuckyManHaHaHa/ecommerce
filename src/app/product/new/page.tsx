"use client";
import { Form, Input, Button } from "antd";
import axios from "axios";

const NewProduct = () => {
  const [form] = Form.useForm();

  const handleFinish = (values: {
    productName: string;
    productPrice: number;
    productDescription: string;
  }) => {
    axios
      .post("/api/productss", values)
      .then((res) => {
        console.log("Product added:", res.data);
        form.resetFields();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <>
      <h1 className="text-[20px] text-black font-medium">New Product</h1>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Product Name" name="productName">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="productPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="productDescription">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default NewProduct;
