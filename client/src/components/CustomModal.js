import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import NewCustomer from "pages/Customer/NewCustomer";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./SmallComponent/CoustomButton";
import CustomForm from "./CustomForm";

const CustomModel = ({ customerSelect,customerId ,disabled,entity,width}) => {
    const [open, setOpen] = useState(false);
    const { getDropDownData } = useAuth();
    const [customer,setCustomer] = useState("")
    const [options, setOptions] = useState([]);

    const handelCustomerClick = async () => {
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
    console.log(entity,"entity");
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
    return (
        <>
            {!open ? (
                <Select
                    options={options}
                    disabled ={disabled}
                    value={customer ? customer :""}
                    showSearch
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => {
                        return (
                            <div >
                                {menu}
                                <Divider />
                                <CoustomButton   text ="New" onClick={addNewCustomer}/>
                            </div>
                        );
                    }}
                    onClick={handelCustomerClick}
                    onChange={handleCustomerChange}
                />
            ) : (
                <Modal
                title={`NEW ${entity.toUpperCase()}`}
                zIndex={1200}
                centered
                open={open}
                width={"600px"}
                onCancel={onCancel}
                maskClosable={true}
                footer={null}
                style={{
                    height: '50vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                bodyStyle={{
                    height: '100%',
                    width: '100%',
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
       
                    keyboard={false}
                >
                    <CustomForm  entity ={entity} height="50Vh" header ={false} />
                </Modal>
            )}
        </>
    );
};

export default CustomModel;
