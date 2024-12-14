import React, { useState, useEffect } from 'react';
import { Modal, Spin } from 'antd';

const CustomDialog = ({
  show,
  setLoading,
  loading,
  children,
  showCloseButton = true,
  title,
}) => {
  // Manage open state internally
  const [open, setOpen] = useState(show); 

  // Function to close the modal
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setOpen(show);
  }, [show]);



  return (
    <Modal
      title={title || 'PDF PREVIEW'}
      open={open} // Control visibility with the open state
      onCancel={handleClose} // Close modal on cancel
      footer={null} // Custom footer
      closable={showCloseButton} // Show close button
      maskClosable ={false}
    >
      {children}
    </Modal>
  );
};

export default CustomDialog;
