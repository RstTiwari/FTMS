import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button, Row } from "antd";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "./Comman/AddressDetails";

const CustomModel = ({
    entity,
    fieldName,
    width,
    disabled,
    updateInForm,
    customerId,
}) => {
    const [open, setOpen] = useState(false);
    const { appApiCall } = useAuth();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState(null);

    const [char, setChar] = useState("");

    // fucntion for clicking the select tab
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

    // deboucne function to manage the search
    const debounce = (fun, delay) => {
        let debounceTimer;
        return function (...args) {
            let context = this;
            clearInterval(debounceTimer);
            debounceTimer = setTimeout(() => fun.apply(context, args), delay);
        };
    };

    // Fucntion whean serching the Vaiue
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
            setAddress({
                billingAddress: label?.item?.billingAddress,
                shippingAddress: label?.item?.shippingAddress,
            });
            return updateInForm(value);
        } else if (entity === "products") {
            return updateInForm({
                description: label?.label,
                rate: label?.item?.rate,
                hsnCode: label?.item?.hsnCode,
            }); // add if anything else needed from here Bro
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
        if (customerId) {
            setValue(customerId);
        }
    };

    const handleModalClose = (result) => {
        handelClick();
        handleChange(result?._id);
        setValue(result?._id);
        setOpen(!open);
        if (entity === "customers") {
            return updateInForm(result._id);
        } else if (entity === "products") {
            return updateInForm({
                description: result.productName,
                rate: result.rate,
                hsnCode: result.hsnCode,
            });
            // if anything else needed we can add from here
        } else {
        }
    };
    console.log(address, "==");

    useEffect(() => {
        setValue(customerId);
    }, []);

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
                        // onSearch={handelDebounceSearch}
                        filterOption={(input, option) =>
                            (option?.label ?? "")
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        dropdownRender={(menu) => {
                            return (
                                <>
                                    <div
                                        style={{
                                            height: "200px",
                                        }}
                                    >
                                        {menu}
                                    </div>
                                    <Divider />
                                    <div
                                        style={{
                                            backgroundColor: "#fff",
                                            width: "100%",
                                        }}
                                    >
                                        <CoustomButton
                                            text="New"
                                            onClick={openModal}
                                        />
                                    </div>
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
                            <AddressDetails
                                style={{ flex: 1, marginRight: "10px" }} // Adjust margin as needed
                                entityName={"Billing Address"}
                                address={address?.billingAddress || {}}
                            />
                            <AddressDetails
                                style={{ flex: 1, marginLeft: "10px" }} // Adjust margin as needed
                                entityName={"Shipping Address"}
                                address={address?.shippingAddress || {}}
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
                        overflow: "auto",
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
