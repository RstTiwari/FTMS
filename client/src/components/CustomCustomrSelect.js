import React, { useCallback, useEffect, useState } from "react";
import { Modal, Select, Divider, Button, Row, Space, AutoComplete } from "antd";
import { useAuth } from "state/AuthProvider";
import { debounce } from "lodash";
import CoustomButton from "./Comman/CoustomButton";
import CustomForm from "./CreateCustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";
import AddressDetails from "./Comman/AddressDetails";
import PageLoader from "pages/PageLoader";
import CustomDialog from "./CustomDialog";
import { LoadingOutlined } from "@ant-design/icons";
import { Autocomplete } from "@mui/material";

const CustomCustomerSelect = ({
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
    const [selectedValue, setSelectedValue] = useState("");
    const [searchText, setSearchText] = useState("");
    const { appApiCall } = useAuth();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");
    const [address, setAddress] = useState(null);
    const [initialRender, setInitialRender] = useState(false);
    const [dataFetched, setDataFetched] = useState(false);

    const [dropdownVisible, setDropdownVisible] = useState(false);

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
        let address = undefined;
        if (label.item && label.item.billingAddress) {
            let { city, state, pincode } = label.item.billingAddress;
            address = `${city},${state},${pincode}`;
        }
        setSelectedValue(label.label);
        form.setFieldsValue({
            customer: value,
            temCustomerName: null, // only for quotation
            address: address,
        });
        return updateInForm(value)
    };

    const handleSearch = (v) => {
        setSelectedValue(v);
        setSearchText(v);
        form.setFieldsValue({
            customer: null,
            temCustomerName: v,
            address: null,
        });
    };
    const openModal = () => {
        setOpen(true);
    };

    const handleModalClose = (result) => {
        setSelectedValue(result?.name);

        const key = [
            "invoices",
            "quotations",
            "challans",
            "customers",
        ].includes(entity)
            ? "customer"
            : "vendor";
        let address = undefined;
        if (result && result.billingAddress) {
            let { city, state, pincode } = result.billingAddress;
            address = `${city}.${state},${pincode}`;
        }

        form.setFieldsValue({
            [key]: result._id,
            temCustomerName: null,
            address: address,
        });

        setOpen(false);
    };

    useEffect(() => {
        if (preFillValue) {
            setSelectedValue(preFillValue);
            setAddress({ shippingAddress: preFillAddress, billingAddress: "" });
        }
    }, [preFillValue]);

    useEffect(() => {
        if (searchText) {
            debouncedFetch(searchText);
        }
    }, [searchText]);

    return (
        <>
            <AutoComplete
                options={options}
                value={selectedValue || ""}
                disabled={disabled}
                onClick={handelClick}
                onSelect={handleChange}
                onChange={handleSearch}
                showSearch
                style={{ width: width }}
                getPopupContainer={(trigger) => document.body}
                dropdownStyle={{ position: "fixed", zIndex: 1000 }}
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
                                .
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
                onDropdownVisibleChange={(open) => {
                    setDropdownVisible(open);
                }}
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

export default CustomCustomerSelect;
