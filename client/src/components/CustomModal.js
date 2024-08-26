import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button, Row, Space } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CreateCustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "./Comman/AddressDetails";
import PageLoader from "pages/PageLoader";

const CustomModel = ({
    entity,
    fieldName,
    width,
    disabled,
    updateInForm,
    preFillValue,
    onlyShippingAddress,
    forDeliveryAddress,
}) => {
    const [open, setOpen] = useState(false);
    const { appApiCall } = useAuth();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [address, setAddress] = useState(null);
    const [initialRender, setInitialRender] = useState(false);

    const [char, setChar] = useState("");

    const handelClick = async () => {
        setIsLoading(true);
        let response = await appApiCall(
            "post",
            "fetchCustomModalData",
            {},
            { entity, fieldName }
        );
        if (response.success) {
            setOptions(response?.result);
        } else {
            setOptions([]);
            NotificationHandler.error(response.message);
        }
        setIsLoading(false);
    };

    const debounce = (fun, delay) => {
        let debounceTimer;
        return function (...args) {
            let context = this;
            clearInterval(debounceTimer);
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
        if (response.success) {
            setOptions(response?.result);
        } else {
            setOptions([]);
            NotificationHandler.error(response.message);
        }
        setIsLoading(false);
    };
    const handelDebounceSearch = debounce(handelSearch, 500);

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
            return updateInForm(value);
        } else {
        }
    };

    const openModal = () => {
        setOpen(true);
    };

    const onCancel = () => {
        setOpen(!open);
        if (preFillValue) {
            setValue(preFillValue);
        }
    };

    const handleModalClose = (result) => {
        handelClick();
        handleChange(result?._id);
        setValue(result?._id);
        setOpen(!open);
        if (entity === "customers") {
            setId(result?._id);
            if (result?.billingAddress && result.shippingAddress) {
                setAddress({
                    billingAddress: result?.billingAddress,
                    shippingAddress: result?.shippingAddress,
                });
            }

            if (forDeliveryAddress) {
                return updateInForm({
                    to: result?.name,
                    address: result?.shippingAddress,
                    type: "customer",
                });
            }

            return updateInForm(result._id);
        } else if (entity === "products") {
            return updateInForm({
                description: result?.name,
                rate: result?.rate,
                hsnCode: result?.hsnCode,
                details: result,
            });
        } else if (entity === "vendors") {
            return updateInForm(result._id);
        } else {
        }
    };

    const updateInCustomModal = (values, keyName) => {
        setAddress({ ...address, [keyName]: values });
    };
    useEffect(() => {
        if (preFillValue) {
            setValue(preFillValue);
        }
    }, [preFillValue, value]);

    return (
        <>
            {!open ? (
                <>
                    <Select
                        options={options}
                        value={value ? value : ""}
                        disabled={disabled}
                        loading={isLoading}
                        showSearch
                        style={{ width: width }}
                        getPopupContainer={(trigger) => document.body}
                        dropdownStyle={{ position: "fixed", zIndex: 1050 }}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        dropdownRender={(menu) => {
                            return (
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
                                            <Divider
                                                style={{
                                                    margin: "8px 0",
                                                }}
                                            />
                                            <Space
                                                style={{
                                                    padding: "0 8px 4px",
                                                }}
                                            >
                                                <CoustomButton
                                                    text={"ADD NEW"}
                                                    details={true}
                                                    onClick={openModal}
                                                />
                                            </Space>
                                        </>
                                    ) : (
                                        <PageLoader
                                            isLoading={true}
                                            height="30px"
                                            text={"Hold on"}
                                        />
                                    )}
                                </>
                            );
                        }}
                        onClick={handelClick}
                        onChange={handleChange}
                        onDropdownVisibleChange={(open) => {
                            if (open) {
                                handelClick();
                            }
                        }}
                    />
                    {entity === "customers" ? (
                        <Row
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            {!onlyShippingAddress ? (
                                <AddressDetails
                                    style={{ flex: 1, marginRight: "10px" }}
                                    initialRender={initialRender}
                                    entityName={"Billing Address"}
                                    keyName={"billingAddress"}
                                    address={address?.billingAddress || null}
                                    setAddress={setAddress}
                                    id={id}
                                    entity={"customers"}
                                    updateInCustomModal={updateInCustomModal}
                                />
                            ) : (
                                ""
                            )}
                            <AddressDetails
                                style={{ flex: 1, marginLeft: "10px" }}
                                initialRender={initialRender}
                                entityName={"Shipping Address"}
                                keyName={"shippingAddress"}
                                address={address?.shippingAddress || null}
                                setAddress={setAddress}
                                id={id}
                                entity={"customers"}
                                updateInCustomModal={updateInCustomModal}
                                updateInForm={updateInForm}
                            />
                        </Row>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                <Modal
                    title={`NEW ${entity.toUpperCase()}`}
                    zIndex={1200}
                    centered
                    open={open}
                    width={"50%"}
                    mask={true}
                    maskClosable={false}
                    onCancel={onCancel}
                    footer={null}
                    bodyStyle={{
                        height: "50vh",
                        overflowY: "auto",
                    }}
                    keyboard={false}
                >
                    <CustomForm
                        entityOfModal={entity}
                        height="50vh"
                        header={false}
                        isModal={true}
                        fieldName={fieldName}
                        passToModal={handleModalClose}
                    />
                </Modal>
            )}
        </>
    );
};

export default CustomModel;
