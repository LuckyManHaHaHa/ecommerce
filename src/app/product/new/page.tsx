"use client";
import { useState } from "react";
import axios from "axios";
import { Form, Input, Button, InputNumber } from "antd";

const NewProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = (values: {
    title: string;
    price: number;
    description: string;
  }) => {
    setLoading(true);
    axios
      .post("/api/product", values)
      .then((res) => {
        console.log("Product added:", res.data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /**
   * Determines if the form is valid by checking if all values in the `formValues` object are truthy.
   * If `formValues` is null or undefined, the form is considered invalid.
   */
  const formValues = Form.useWatch([], form);
  const isFormValid = formValues
    ? Object.values(formValues).every(Boolean)
    : false;

  return (
    <>
      <h1 className="text-[20px] text-black font-medium">New Product</h1>
      <Form
        form={form}
        name="form-product"
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Product Name"
          name="title"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the price!" },
            {
              type: "number",
              min: 1,
              message: "Price must be a non-negative number!",
            },
          ]}
        >
          <InputNumber className="!w-full" controls={false} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!isFormValid}
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default NewProduct;
