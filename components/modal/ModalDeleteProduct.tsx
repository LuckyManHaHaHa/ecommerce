import { useContext } from "react";
import { Modal } from "antd";
import { AppContext } from "@/app/context/context";
import axios from "axios";
import { openNotification } from "@util/Notification";

interface Iprops {
  setReload: (value: boolean) => void;
}

const ModalDeleteProduct: React.FC<Iprops> = ({ setReload }) => {
  const modalName = "modalDeleteProduct";
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within a AppProvider");
  }
  const { state, dispatch } = context;
  const { modal, id } = state;
  const isOpenModal = modal.find((item) => item.name === modalName)
    ? true
    : false;
  const handleCloseModal = () => {
    dispatch({
      type: "SET_CLOSE_MODAL",
      payload: { name: modalName },
    });
  };
  const handleDeleteProduct = () => {
    axios
      .delete(`/api/product?id=${id}`)
      .then(() => {
        openNotification({
          message: "Success",
          description: "Product deleted successfully!",
          type: "success",
        });
        setReload(true);
        handleCloseModal();
      })
      .catch((error) => {
        openNotification({
          message: "Error",
          description:
            (error as { message?: string })?.message ||
            "Failed to delete product.",
          type: "error",
        });
        console.error("Error deleting product:", error);
      });
  };
  return (
    <Modal
      title="Delete Product"
      open={isOpenModal}
      onCancel={handleCloseModal}
      onOk={handleDeleteProduct}
      okText="Delete"
      cancelText="Cancel"
    >
      <p>Are you sure you want to delete this product?</p>
    </Modal>
  );
};
export default ModalDeleteProduct;
