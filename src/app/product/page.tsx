"use client";
import { Button } from "antd";
import { useRouter, usePathname } from "next/navigation";

const Product = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <h1 className="text-[20px] text-black ">Product page</h1>
      <Button type="primary" onClick={() => router.push(`${pathname}/new`)}>
        Add to Cart
      </Button>
    </>
  );
};
export default Product;
