import React, { useState, useEffect } from "react";
import { Modal, Spin } from "antd";
import CustomForm from "./CreateCustomForm";

const CustomDialog = ({
  entity,
  show,
  setShow,
  setLoading,
  loading,
  children,
  showCloseButton = true,
  title,
  height = "90vh",
  width = "90%",
}) => {
  useEffect(() => {}, []);

  return (
    <Modal
      open={show}
      footer={null} // Custom footer
      closeIcon={null}
      maskClosable={false}
      width={width}
      style={{
        top: 0,
        left: 50,
        maxHeight: "100vh",
        zIndex: 1000000,
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomDialog;
