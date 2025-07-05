import { Space, Dropdown, Menu,Modal } from "antd";
import { useAuth } from "state/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";
import PreviewModal from "./PDFPreviewModal";
import { useState } from "react";
import WhatsAppMessageSender from "Helper/Whatsappmessagesender";
import NotificationHandler from "EventHandler/NotificationHandler";
import CustomDialog from "components/CustomDialog";
import UpdateCustomForm from "components/UpdateCustomForm";
import Details from "components/Details";
import RecordPayment from "pages/Payment/RecordPayment";

export default function MoreActionDropDown({ entity, items = [], rowData }) {
  const { tenantId, pageNo, pageSize } = useParams();
  const [open, setOpen] = useState(false);
  const[showEditModal,setShowEditModal] = useState(false);
  const [isWhatsAppModalVisible, setWhatsAppModalVisible] = useState(false);
  const [showDetail,setShowDetail] = useState(false) 
  const [showPaymentModal, setShowPaymentModal] = useState(false); 

  const navigate = useNavigate();
  const { pdfGenerate, adminApiCall } = useAuth();
  const { _id, no } = rowData;
  const closePreviewModal = () => setOpen(false);
  const closeEditModal = () => setShowEditModal(false);
  const closeShowModal = () => setShowDetail(false);
  const closePaymentModal = ()=> setShowPaymentModal(false)

  const handleMenuClick = async (rowClicked, rowData) => {
    if (rowClicked.key === "preview") {
      setOpen(true);
    }else if (rowClicked.key ==="details"){
       return setShowDetail(true);
    }
    else if (rowClicked.key === "download") {
      await pdfGenerate(entity, _id, no, "download", tenantId);
    } else if (rowClicked.key === "edit") {
      return setShowEditModal(true);
    } else if (
      rowClicked.key === "paymentsreceived" ||
      rowClicked.key === "paymentsmade"
    ) {
      setShowPaymentModal(true);
    } else if (rowClicked.key === "shareonemail") {
      return navigate(`/app/${tenantId}/${entity}/${_id}/sendmail`);
    } else if (rowClicked.key === "shareonwhatsapp") {
      setWhatsAppModalVisible(true);
    } else if (rowClicked.key === "delete") {
      Modal.confirm({
        title: "Are you sure you want to Delete ?",
        content: "Your Data will be lost if you do Delete them.",
        okText: "Yes, Delete",
        cancelText: "No, Don't Delete",
        onOk: () => deleteTheRow(),
      });
      const deleteTheRow = async () => {
        let { success, result, message } = await adminApiCall(
          "post",
          "delete",
          {},
          { entity, tenantId, _id }
        );
        if (success) {
          NotificationHandler.success(message);
          return navigate(0);
        } else {
          return NotificationHandler.error(message);
        }
      };
    }
  };

  // Create a Menu component with items
  const menu = (
    <Menu
      items={items}
      onClick={(item) => handleMenuClick(item, rowData)}
      style={{
        height: "auto",
        padding: "10px",
        overflowY: "scroll",
        cursor: "pointer",
      }}
    />
  );

  return (
    <Space size="middle">
      <Dropdown trigger={["click"]} overlay={menu}>
        <b style={{ cursor: "pointer", fontSize: "20px" }}>...</b>
      </Dropdown>

      {/* Pass the PDF document directly as children to CustomDialog */}
      <PreviewModal
        open={open}
        onClose={closePreviewModal}
        width={50}
        entity={entity}
        id={rowData?._id}
        no={rowData?.no}
        tenantId={tenantId}
        
      />
      {isWhatsAppModalVisible && (
        <WhatsAppMessageSender
          onClose={() => setWhatsAppModalVisible(false)}
          entity={entity}
          tenantId={tenantId}
          id={_id}
        />
      )}
      <CustomDialog
        entity={entity}
        show={showEditModal}
        setShow={setShowEditModal}
        children={
          <UpdateCustomForm
            entity={entity}
            id={_id}
            closeModal={closeEditModal}
          />
        }
      />
      <CustomDialog
        entity={entity}
        show={showDetail}
        setShow={setShowDetail}
        children={
          <Details entity={entity} id={_id} closeModal={closeShowModal} />
        }
      />

      <CustomDialog
        entity={
          entity === "customers"
            ? "paymentsreceived"
            : entity === "vendors"
            ? "paymentsmade"
            : ""
        }
        show={showPaymentModal}
        setShow={setShowPaymentModal}
        children={
          <RecordPayment
            entity={
              entity === "customers"
                ? "paymentsreceived"
                : entity === "vendors"
                ? "paymentsmade"
                : ""
            }
            id={_id}
            closeModal={closePaymentModal}
          />
        }
      />
    </Space>
  );
}
