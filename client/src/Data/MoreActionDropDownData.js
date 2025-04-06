import {
  DownOutlined,
  FilePdfOutlined,
  EditOutlined,
  MoneyCollectOutlined,
  DownloadOutlined,
  DeleteOutlined,
  WhatsAppOutlined,
  MailOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";

export default function MoreActionDropDownData(entity) {
  let data = [];
  if (
    entity === "invoices" ||
    entity === "purchases" ||
    entity === "challans" ||
    entity === "quotations"
  ) {
    data = [
      {
        key: "preview",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            PREVIEW
          </span>
        ),
        icon: <FilePdfOutlined style={{ color: "red", fontSize: "10px" }} />,
      },
      {
        key: "edit",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            EDIT
          </span>
        ),
        icon: <EditOutlined style={{ color: "blue", fontSize: "10px" }} />,
      },
      {
        key: "download",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            DOWNLOAD PDF
          </span>
        ),
        icon: <DownloadOutlined style={{ color: "red", fontSize: "10px" }} />,
      },
      {
        key: "shareonwhatsapp",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            SHARE ON WHATSAPP
          </span>
        ),
        icon: <WhatsAppOutlined style={{ color: "green", fontSize: "10px" }} />,
      },
      // {
      //   key: "shareonemail",
      //   label: (
      //     <span
      //       style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
      //     >
      //       SHARE ON EMAIL
      //     </span>
      //   ),
      //   icon: <MailOutlined style={{ color: "black", fontSize: "10px" }} />,
      // },
      {
        key: "delete",
        label: (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
            DELETE
          </span>
        ),
        icon: <DeleteOutlined style={{ color: "green", fontSize: "10px" }} />,
      },
    ];
  } else if (entity === "customers" || entity === "vendors") {
    data = [
      {
        key: "details",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            VIEW {entity.substring(0, entity.length - 1).toUpperCase()} DETAILS
          </span>
        ),
        icon: (
          <FileExcelOutlined style={{ color: "black", fontSize: "10px" }} />
        ),
      },
      {
        key: "edit",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            EDIT
          </span>
        ),
        icon: <EditOutlined style={{ color: "blue", fontSize: "10px" }} />,
      },
      entity === "customers" && {
        key: "paymentsreceived",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            ADD PAYMENT RECEIVED
          </span>
        ),
        icon: (
          <MoneyCollectOutlined style={{ color: "black", fontSize: "10px" }} />
        ),
      },
      entity === "vendors" && {
        key: "paymentsmade",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            ADD PAYMENT MADE
          </span>
        ),
        icon: (
          <MoneyCollectOutlined style={{ color: "black", fontSize: "10px" }} />
        ),
      },
      {
        key: "delete",
        label: (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
            DELETE
          </span>
        ),
        icon: <DeleteOutlined style={{ color: "green", fontSize: "10px" }} />,
      },
    ];
  } else if (
    entity === "paymentsreceived" ||
    entity === "paymentsmade" ||
    entity === "expenses" ||
    entity === "products"
  ) {
    data = [
      {
        key: "details",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            VIEW DETAILS
          </span>
        ),
        icon: (
          <FileExcelOutlined style={{ color: "black", fontSize: "10px" }} />
        ),
      },
      {
        key: "edit",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            EDIT
          </span>
        ),
        icon: <EditOutlined style={{ color: "blue", fontSize: "10px" }} />,
      },
      entity === "expenses" ||
        (entity === "products" && {
          key: "delete",
          label: (
            <span
              style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}
            >
              DELETE
            </span>
          ),
          icon: <DeleteOutlined style={{ color: "green", fontSize: "10px" }} />,
        }),
    ];
  } else if (entity === "workorders") {
    data = [
      {
        key: "preview",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            PREVIEW
          </span>
        ),
        icon: <FilePdfOutlined style={{ color: "red", fontSize: "10px" }} />,
      },
      {
        key: "edit",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            EDIT
          </span>
        ),
        icon: <EditOutlined style={{ color: "blue", fontSize: "10px" }} />,
      },
      {
        key: "delete",
        label: (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
            DELETE
          </span>
        ),
        icon: <DeleteOutlined style={{ color: "green", fontSize: "10px" }} />,
      },
    ];
  }else if (entity === "user"){
    data = [
      {
        key: "edit",
        label: (
          <span
            style={{ color: "green", fontWeight: "bold", fontSize: "10px" }}
          >
            EDIT
          </span>
        ),
        icon: <EditOutlined style={{ color: "blue", fontSize: "10px" }} />,
      },
       {
        key: "delete",
        label: (
          <span style={{ color: "red", fontWeight: "bold", fontSize: "10px" }}>
            DELETE
          </span>
        ),
        icon: <DeleteOutlined style={{ color: "green", fontSize: "10px" }} />,
      },
    ];
  }
  return data;
}
