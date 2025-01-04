import React, { useCallback, useEffect, useState } from "react";
import { Modal, Select, Divider, Button, Row, Space } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CreateCustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "./Comman/AddressDetails";
import PageLoader from "pages/PageLoader";
import CustomDialog from "./CustomDialog";
import { LoadingOutlined } from "@ant-design/icons";

const CustomModel = ({
  entity,
  fieldName,
  width,
  disabled,
  updateInForm,
  preFillValue,
  preFillAddress,
  onlyShippingAddress,
  forDeliveryAddress,
  subEntity,
  form,
}) => {
  const [open, setOpen] = useState(false);
  const { appApiCall } = useAuth();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [id, setId] = useState("");
  const [address, setAddress] = useState(null);
  const [initialRender, setInitialRender] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [char, setChar] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Close dropdown when the modal opens
  useEffect(() => {
    if (open) {
      setDropdownVisible(false);
    }
  }, [open]);

  const handelClick = useCallback(async () => {
    if (!dataFetched) {
      setIsLoading(true);
      let response = await appApiCall(
        "post",
        "fetchCustomModalData",
        {},
        { entity, fieldName }
      );
      setIsLoading(false);
      if (response.success) {
        setOptions(response?.result);
        setDataFetched(true);
      } else {
        setOptions([]);
        NotificationHandler.error(response.message);
      }
    }
  }, [appApiCall, dataFetched, entity, fieldName]);

  const fetchUpdatedOptions = async () => {
    setIsLoading(true);
    let response = await appApiCall(
      "post",
      "fetchCustomModalData",
      {},
      { entity, fieldName }
    );
    setIsLoading(false);
    if (response.success) {
      setOptions(response?.result);
      setValue(response?.result?.[0]?.value || ""); // Update pre-selected value
    } else {
      NotificationHandler.error(response.message);
    }
  };

  const debounce = (fun, delay) => {
    let debounceTimer;
    return function (...args) {
      let context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fun.apply(context, args), delay);
    };
  };

  const handelSearch = async (char) => {
    setChar(char);
    setIsLoading(true);
    let response = await appApiCall(
      "post",
      "fetchSelectData",
      {},
      { entity, fieldName, char }
    );
    setIsLoading(false);
    if (response.success) {
      setOptions(response?.result);
    } else {
      setOptions([]);
      NotificationHandler.error(response.message);
    }
  };


  const handleChange = (value, label) => {
         setValue(value);
         if (entity === "customers") {
           if (!initialRender) {
             setInitialRender(true);
           }
           if (label?.item?.billingAddress || !label?.item?.shippingAddress) {
             setAddress({ billingAddress: null, shippingAddress: null });
           }
           setAddress({
             billingAddress: label?.item?.billingAddress,
             shippingAddress: label?.item?.shippingAddress,
           });
           setId(label?.item?._id);
           // Updating in Purchase Order Forms
           if (forDeliveryAddress) {
             return updateInForm({
               to: label?.item?.name,
               address: label?.item?.shippingAddress,
               type: "customer",
             });
           }
           return updateInForm(label?.value);
         } else if (entity === "products") {
           return updateInForm({
             description: label?.label,
             rate: label?.item?.rate,
             hsnCode: label?.item?.hsnCode,
             details: label?.item,
           });
         } else if (entity === "vendors") {
           if (!initialRender) {
             setInitialRender(true);
           }
           if (label?.item?.billingAddress || !label?.item?.shippingAddress) {
             setAddress({ billingAddress: null, shippingAddress: null });
           }
           setAddress({
             billingAddress: label?.item?.billingAddress,
             shippingAddress: label?.item?.shippingAddress,
           });
           setId(label?.item?._id);
           // Updating in Purchase Order Forms
           if (forDeliveryAddress) {
             return updateInForm({
               to: label?.item?.name,
               address: label?.item?.shippingAddress,
               type: "vendor",
             });
           }

           return updateInForm(value);
         } else {
         }
  };

       const openModal = () => {
         setOpen(true);
       };

  const onCancel = () => {
    setOpen(false);
    if (preFillValue) {
      setValue(preFillValue);
    }
  };

  const handleModalClose = (result) => {
    fetchUpdatedOptions(); // Fetch updated options after adding new
    handleChange(result?._id);
    setValue(result?._id);
    setOpen(false);
  };

  useEffect(() => {
    if (preFillValue) {
      setValue(preFillValue);
      setAddress({ shippingAddress: preFillAddress, billingAddress: "" });
    }
  }, [preFillValue]);

  return (
    <>
      <Select
        options={options}
        value={value || ""}
        disabled={disabled}
        onClick={handelClick}
        showSearch
        style={{ width: width }}
        getPopupContainer={(trigger) => document.body}
        dropdownStyle={{ position: "fixed", zIndex: 1000 }}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        dropdownRender={(menu) => (
          <>
            {!isLoading ? (
              <>
                <div style={{ maxHeight: "200px", overflow: "auto" }}>
                  {menu}
                </div>
                <Divider style={{ margin: "8px 0" }} />
                <Space style={{ padding: "0 8px 4px" }}>
                  <CoustomButton
                    text={"ADD NEW"}
                    details={true}
                    onClick={openModal}
                  />
                </Space>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "20px" }}>
                <LoadingOutlined />
              </div>
            )}
          </>
        )}
        onChange={handleChange}
        onDropdownVisibleChange={(open) => {
          setDropdownVisible(open);
        }}
      />

      {/* Customer/Vendor Address Details */}
      {/* Add other components as needed */}
      <CustomDialog
        entity={entity}
        show={open}
        setShow={setOpen}
        width={"55%"}
        height="50vh"
        children={
          <CustomForm
            entityOfModal={entity}
            height={"50%"}
            closeModal={() => setOpen(false)}
            isModal={true}
            passToModal={handleModalClose}
            form={form}
          />
        }
      />
    </>
  );
};

export default CustomModel;
