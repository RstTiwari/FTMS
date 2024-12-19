import { Space, Dropdown, Menu } from "antd";
import { useAuth } from "state/AuthProvider";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import PreviewModal from "./PDFPreviewModal";
import { useState } from "react";
import WhatsAppMessageSender from "Helper/Whatsappmessagesender";
import NotificationHandler from "EventHandler/NotificationHandler";

export default function MoreActionDropDown({ entity, items = [], rowData }) {
  const { tenantId, pageNo, pageSize } = useParams();
  const [open, setOpen] = useState(false);
  const [isWhatsAppModalVisible, setWhatsAppModalVisible] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { pdfGenerate, adminApiCall } = useAuth();
  const closePreviewModal = () => setOpen(false);
  const { _id, no } = rowData;

  const handleMenuClick = async (rowClicked, rowData) => {
    if (rowClicked.key === "preview") {
      setOpen(true);
    }else if (rowClicked.key ==="details"){
       return navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}/details/${_id}`);
    }
    else if (rowClicked.key === "download") {
      await pdfGenerate(entity, _id, no, "download", tenantId);
    } else if (rowClicked.key === "edit") {
      return navigate(`/app/${tenantId}/update/${entity}/${_id}`);
    } else if (rowClicked.key === "paymentsreceived") {
      return navigate(
        `/app/${tenantId}/${rowClicked.key}/${_id}/recordPayment`
      );
    } else if (rowClicked.key === "shareonemail") {
      return navigate(`/app/${tenantId}/${entity}/${_id}/sendmail`);
    } else if (rowClicked.key === "shareonwhatsapp") {
      setWhatsAppModalVisible(true);
    } else if (rowClicked.key === "delete") {
      alert("Are You sure You want to Delete this")

      let { success, result, message } = await adminApiCall(
        "post",
        "delete",
        {},
        { entity, tenantId,_id }
      );
      if (success) {
        NotificationHandler.success(message);
        return navigate(0);
      } else {
        return NotificationHandler.error(message);
      }
    }else if (rowClicked.key === "paymentsmade"){
      return navigate(
        `/app/${tenantId}/${rowClicked.key}/${_id}/recordPayment`
      );
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
    </Space>
  );
}
