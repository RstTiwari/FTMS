import React, { useCallback, useEffect, useState } from "react";
import { Modal, Select, Divider, Button, Row, Space, AutoComplete } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CreateCustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "./Comman/AddressDetails";
import PageLoader from "pages/PageLoader";
import CustomDialog from "./CustomDialog";
import { LoadingOutlined } from "@ant-design/icons";

const SearchProduct = ({
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
  rowName
}) => {
  const [open, setOpen] = useState(false);
  const { appApiCall } = useAuth();
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
      setValue(response?.result?.[0]?.item?.name || ""); // Update pre-selected value
    } else {
      NotificationHandler.error(response.message);
    }
  };
   console.log(form,rowName)
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

  const handleChange = async (char)=>{
    const items = form.getFieldValue("items");
    let rowChange = items[rowName]
    console.log(rowChange,items,"---")
    rowChange["description"] = char
    items[rowName] = rowChange
    form.setFieldValue({"items":items})
    setValue(char)
  }

  const handleSelect = (value, label) => {
        updateInForm({
        description: label?.label,
        rate: label?.item?.rate,
        hsnCode: label?.item?.hsnCode,
        details: label?.item,
      });
    }
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
    updateInForm({
      description: result?.name,
      rate: result?.rate,
      hsnCode: result?.hsnCode,
      details: { code: result?.code, name: result.name, rate: result?.rate },
    });
    setOpen(false);
  };

  useEffect(() => {
    if (preFillValue) {
      setValue(preFillValue);    }
  }, [preFillValue]);

    return (
    <>
      <AutoComplete
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
        onSelect={handleSelect}
        onDropdownVisibleChange={(open) => {
          setDropdownVisible(open);
        }}
        onChange={handleChange}
      />

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

export default SearchProduct;
