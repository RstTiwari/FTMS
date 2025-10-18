import React, { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { Modal, Select, Divider, Button, Row, Space, AutoComplete } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CreateCustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import CustomDialog from "./CustomDialog";
import { LoadingOutlined } from "@ant-design/icons";
import { items } from "Data/LeadData";

const CustomProductSelect = ({
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
    row,
}) => {
    const [open, setOpen] = useState(false);
    const { appApiCall } = useAuth();
    const [selectedValue, setSelectedValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [address, setAddress] = useState(null);
    const [initialRender, setInitialRender] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    const [searchText, setSearchText] = useState("");
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
            if (response.success) {
                setOptions(response?.result);
                setDataFetched(true);
            } else {
                setOptions([]);
                NotificationHandler.error(response.message);
            }
            setIsLoading(false);
        }
    }, [appApiCall, dataFetched, entity, fieldName]);

    const debouncedFetch = useCallback(
        debounce(async (char) => {
            setIsLoading(true);
            try {
                setIsLoading(true);
                let response = await appApiCall(
                    "post",
                    "fetchCustomModalData",
                    {},
                    { entity, fieldName, char }
                );
                setIsLoading(false);
                if (response.success) {
                    setOptions(response?.result);
                }
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setIsLoading(false);
            }
        }, 500),
        [] // will persist across renders
    );

    const handleChange = (value, label) => {
        console.log(row, form.getFieldsValue(), "forms",label);
        const item = label.item;
        const description = label.label;
        setSelectedValue(label.label);
        return updateInForm({
            description: description,
            rate: item?.rate,
            hsnCode: item?.hsnCode,
            details: item,
        });
    };

    const handleSearch = (text) => {
        setSelectedValue(text);
        setSearchText(text);
        console.log("in update",text)
        form.setFieldsValue({
            items: {
                [row]: {
                    description: text,
                },
            },
        });

    };

    const openModal = () => {
        setOpen(true);
    };

    const handleModalClose = (result) => {
        const items = form.getFieldValue("items");
        let temObj = items[row];
        temObj.code = result?.code || "";
        temObj.description = result?.name;
        temObj.image = result?.image;
        temObj.hsnCode = result?.hsnCode || "";
        temObj.rate = result?.rate || 0;
        let finalAmount = calculateDiscount(
            temObj?.discountPercent || 0,
            temObj?.rate || 0
        );
        temObj.discountAmount = finalAmount;
        temObj.taxAmount = calculateTaxAmount(
            temObj?.gstPercent || 0,
            temObj?.discountAmount || temObj.rate,
            temObj?.qty || 0
        );
        temObj.finalAmount = temObj.discountAmount * temObj.qty;
        form.setFieldsValue({ items: items });
        setOpen(false);
    };
    const calculateTaxAmount = (taxPercent, rate, qty) => {
        let taxAmount = (rate * taxPercent) / 100;
        return Math.ceil(taxAmount * qty);
    };
    const calculateDiscount = (discountPercent, rate) => {
        let discoumntAmount = Math.floor((rate * discountPercent) / 100);
        return Math.ceil(rate - discoumntAmount);
    };

    useEffect(() => {
        if (searchText) {
            debouncedFetch(searchText);
        }
    }, [searchText]);

    useEffect(() => {
        if (preFillValue) {
            setSelectedValue(preFillValue);
            setAddress({ shippingAddress: preFillAddress, billingAddress: "" });
        }
    }, [preFillValue]);

    return (
        <>
            <AutoComplete
                options={options}
                value={selectedValue}
                disabled={disabled}
                onClick={handelClick}
                onSelect={handleChange}
                onSearch={handleSearch}
                style={{ width }}
                getPopupContainer={(trigger) => document.body}
                dropdownStyle={{
                    position: "fixed",
                    zIndex: 1000000,
                    width:500,
                }}
                filterOption={(input, option) =>
                    (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                dropdownRender={(menu) => (
                    <>
                        {!isLoading ? (
                            <>
                                <div
                                    style={{
                                        maxHeight: "200px",
                                        overflow: "auto",
                                    }}
                                >
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
                            <div
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                <LoadingOutlined />
                            </div>
                        )}
                    </>
                )}
                onDropdownVisibleChange={(open) => setDropdownVisible(open)}
            />

            {/* Customer/Vendor Address Details */}
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
                        parentForm={form}
                    />
                }
            />
        </>
    );
};

export default CustomProductSelect;
