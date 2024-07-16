import React, { useEffect, useState } from "react";
import {
    Select,
    Button,
    Divider,
    Modal,
    Input,
    Row,
    Spin,
} from "antd";
import { useAuth } from "../../state/AuthProvider";
import CoustomButton from "./CoustomButton";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";

const CustomSelect = ({ entity,entityName, defaultSelect, width ,updateInForm}) => {
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for Loader
    const [addValue, setAddValue] = useState("");
    const [selected, setSelected] = useState(defaultSelect);
    const {appApiCall} = useAuth()

    const handelClick = async () => {
        const response = await appApiCall("get","fetchSelectData",{},{entityName})
        if(!response.success){
            setIsLoading(false)
        }
        setOptions(response.result);
        setIsLoading(false);
    };

  
    useEffect(() => {
        if (defaultSelect) {
            setSelected(defaultSelect);
        }
    }, [defaultSelect]);

    const handleChange = (value) => {
        setSelected(value);
        updateInForm(value);

    };


    const addNewOption = async () => {
        setIsLoading(true)
        const payload = {
            entityName: entityName,
            data: [{ label: addValue, value: addValue }],
        };
        const response = await appApiCall("post", "addSelectData", payload);
        if (response.success) {
            handelClick();
            setSelected(addValue);
            updateInForm(addValue);
            setIsLoading(false)
            setOpen(false);
        } else {
            setIsLoading(false)
            return NotificationHandler.error(response.message);
        }
    };


    return (
        <>
            {!open ? (
                <Select
                    value={selected || ""}
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
                    getPopupContainer={(trigger) => trigger.parentElement}
                    dropdownRender={(menu) => (
                        <div style={{
                        }}>
                            {menu}
                            <Divider />
                          
                                <CoustomButton
                                    text="New"
                                    onClick={() => setOpen(true)}
                                />
                        </div>
                    )}
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

                            <CoustomButton
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
