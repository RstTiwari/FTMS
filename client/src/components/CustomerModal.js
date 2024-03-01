import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import NewCustomer from "pages/Customer/NewCustomer";
import { useAuth } from "state/AuthProvider";

const CustomerModal = ({ customerSelect,customerId }) => {
    const [open, setOpen] = useState(false);
    const { getDropDownData } = useAuth();
    const [customer,setCustomer] = useState("")
    const [options, setOptions] = useState([]);

    const handelCustomerClick = async () => {
        let entity = "customer";
        let fieldName = "customerName";
        let data = await getDropDownData(entity, fieldName);
        setOptions(data);
    };
    const handleCustomerChange = (value, label) => {
        customerSelect(value,label);
        setCustomer(value)
    };
    const addNewCustomer = () => {
        setOpen(true);
    };
    const onCancel = () => {
        setOpen(!open);
        if(customerId){
            setCustomer(customerId)
        }
    };
    const afterAdd = (result) => {
        handelCustomerClick();
        handleCustomerChange(result._id);
        setCustomer(result._id)
        customerSelect(result._id);
        setOpen(false);
    };
    useEffect(() => {
        handelCustomerClick();
        setCustomer(customerId)
    }, []);
    console.log(customer,"-");
    return (
        <>
            {!open ? (
                <Select
                    options={options}
                    value={customer ? customer :""}
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
                                    onClick={addNewCustomer}
                                >
                                    Add New
                                </Button>
                            </div>
                        );
                    }}
                    onClick={handelCustomerClick}
                    onChange={handleCustomerChange}
                />
            ) : (
                <Modal
                    title={"NEW CUSTOMER"}
                    zIndex={1200}
                    centered
                    open={open}
                    width={"90%"}
                    onCancel={onCancel}
                    maskClosable={true}
                    footer={null}
                    keyboard={false}
                >
                    <NewCustomer checkHeader={false} afterAdd={afterAdd} />
                </Modal>
            )}
        </>
    );
};

export default CustomerModal;
