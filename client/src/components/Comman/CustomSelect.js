import React, { useEffect, useState } from "react";
import { Select, Button, Divider, Modal, Input, Row, Space } from "antd";
import { useAuth } from "../../state/AuthProvider";
import CustomButton from "./CoustomButton";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import { Spa } from "@mui/icons-material";

const CustomSelect = ({
    entity,
    entityName,
    width = "15vw",
    updateInForm,
    preFillValue,
}) => {
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for Loader
    const [addValue, setAddValue] = useState(null);
    const [value, setValue] = useState(preFillValue);
    const { appApiCall } = useAuth();

    const handelClick = async () => {
        setIsLoading(true);
        const response = await appApiCall(
            "get",
            "fetchSelectData",
            {},
            { entityName }
        );
        if (!response.success) {
            setIsLoading(false);
        }
        setOptions(response.result);
        setIsLoading(false);
    };

    useEffect(() => {
        if (preFillValue) {
            setValue(preFillValue);
        }
    }, [preFillValue]);

    const handleChange = (value) => {
        setValue(value);
        updateInForm(value);
    };

    const addNewOption = async () => {
        if (!addValue) {
            return NotificationHandler.info({
                message: "Please Type Somthing to Add",
            });
        }
        setIsLoading(true);
        const payload = {
            entityName: entityName,
            data: [{ label: addValue, value: addValue }],
        };
        const response = await appApiCall("post", "addSelectData", payload);
        if (response.success) {
            handelClick();
            setValue(addValue);
            updateInForm(addValue);
            setIsLoading(false);
            setOpen(false);
        } else {
            setIsLoading(false);
            return NotificationHandler.error(response.message);
        }
    };

    return (
        <>
            {!open ? (
                <Select
                    value={value ? value : ""}
                    options={options}
                    onChange={handleChange}
                    style={{ width: width }}
                    loading={isLoading}
                    onClick={handelClick}
                    onDropdownVisibleChange={(open) => {
                        if (open) {
                            handelClick();
                        }
                    }}
                    getPopupContainer={(trigger) => document.body}
                    dropdownStyle={{ position: "fixed", zIndex: 20000000 }}
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
                                            <CustomButton
                                                text={"ADD NEW"}
                                                details={true}
                                                onClick={() => {
                                                    setOpen(!open);
                                                }}
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
                />
            ) : (
                <Modal
                    title={<h4> ADD NEW {entity.toUpperCase()}</h4>}
                    zIndex={1500}
                    open={open}
                    width={"40%"}
                    onCancel={() => setOpen(false)}
                    maskClosable={true}
                    footer={null}
                    keyboard={false}
                >
                    {isLoading ? (
                        <PageLoader
                            isLoading={isLoading}
                            text={`Hold on..adding ${entityName} value`}
                            height="100px"
                        />
                    ) : (
                        <>
                            <Row gutter={16} style={{ marginBottom: 10 }}>
                                <Input
                                    placeholder={`Enter new ${entity}`}
                                    onChange={(e) =>
                                        setAddValue(e.target.value)
                                    }
                                />
                            </Row>

                            <CustomButton
                                text={"SAVE"}
                                onClick={addNewOption}
                            />
                        </>
                    )}
                </Modal>
            )}
        </>
    );
};

export default CustomSelect;
