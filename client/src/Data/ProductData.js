import { Space, Flex, Dropdown, Typography, Form, Input, Image } from "antd";
import Details from "components/Details";
import Taglabel from "components/Comman/Taglabel";
import MoreActionDropDown from "components/Comman/MoreActionDropDown";
import MoreActionDropDownData from "./MoreActionDropDownData";
const { Text } = Typography;

const getColumns = (details) => [
 {
    title: <Taglabel text={"PRODUCT CODE"} type={"heading"} details={details} />,
    dataIndex: "hsnCode",
    key: "source",
    responsive: details ? [] : ["lg"],

    render: (_, record) => (
      <>
        <Taglabel text={record.code ? record.code :" "} type={"text"} details={details} />
      </>
    ),
  },
  {
    title: (
      <Taglabel text={"PRODUCT NAME"} type={"heading"} details={details} />
    ),
    dataIndex: "name",
    key: "srno",
    render: (_, record) => (
      <>
        <Taglabel text={record.name} type={"customer"} details={details} />
      </>
    ),
  },
 
  {
    title: <Taglabel text={"IMAGE"} type={"heading"} details={details} />,
    dataIndex: "image",
    key: "source",
    responsive: details ? [] : ["lg"],
    render: (_, record) => (
      <>
        {record.image ? (
          <Image
            width={100}
            height={25}
            src={record.image}
            details={details}
            visible={false}
          />
        ) : (
          "NO IMAGE FOUND"
        )}
      </>
    ),
  },
  {
    title: <Taglabel text={"RATE"} type={"heading"} details={details} />,
    dataIndex: "rate",
    key: "subTotal",
    responsive: details ? [] : ["lg"],

    render: (_, record) => (
      <>
        <Taglabel text={record.rate} type={"amount"} details={details} />
      </>
    ),
  },
  {
    dataIndex: "operation",
    fixed: "right",
    render: (_, record) => (
      <MoreActionDropDown
        entity="products"
        items={MoreActionDropDownData("products")}
        rowData={record}
      />
    ),
  },
];

const productData = {
  getColumns,
};

export default productData;

export const productCategory = [
  {
    label: "Product",
    value: "product",
  },

  {
    label: "Hardware/Accessories",
    value: "hardware_accessoreis",
  },
  {
    label: "Bill Of Material",
    value: "bill_of_material",
  },
];
