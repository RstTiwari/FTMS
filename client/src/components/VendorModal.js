import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import Newvendor from "../pages/Vendor/NewVendor";
import { useAuth } from "state/AuthProvider";

const VendorModal = ({ vendorSelect,vendorId ,disabled}) => {
    const [open, setOpen] = useState(false);
    const { getDropDownData } = useAuth();
    const [vendor,setVendor] = useState("")
    const [options, setOptions] = useState([]);

    const handleVendorClick = async () => {
        let entity = "vendors";
        let fieldName = "vendorName";
        let data = await getDropDownData(entity, fieldName);
        setOptions(data);
    };
    const handleVendorChange = (value, label) => {
        vendorSelect(value,label);
        setVendor(value)
    };
    const addNewVendor = () => {
        setOpen(true);
    };
    const onCancel = () => {
        setOpen(!open);
        if(vendorId){
            setVendor(vendorId)
        }
    };
    const afterAdd = (result) => {
        handleVendorClick();
        handleVendorChange(result._id);
        setVendor(result._id)
        vendorSelect(result._id);
        setOpen(false);
    };
    useEffect(() => {
        handleVendorClick();
        setVendor(vendorId)
    }, []);
    return (
        <>
            {!open ? (
                <Select
                    options={options}
                    disabled ={disabled}
                    value={vendor ? vendor :""}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => {
                        return (
                            <div>
                                {menu}
                                <Divider />
                                <Button
                                    type="primary"
                                    style={{
                                        margin: "0.1rem",
                                    }}
                                    onClick={addNewVendor}
                                >
                                    Add New
                                </Button>
                            </div>
                        );
                    }}
                    onClick={handleVendorClick}
                    onChange={handleVendorChange}
                />
            ) : (
                <Modal
                    title={"NEW VENDOR"}
                    zIndex={1200}
                    centered
                    open={open}
                    width={"90%"}
                    onCancel={onCancel}
                    maskClosable={true}
                    footer={null}
                    keyboard={false}
                >
                    <Newvendor checkHeader={false} afterAdd={afterAdd} />
                </Modal>
            )}
        </>
    );
};

export default VendorModal;
