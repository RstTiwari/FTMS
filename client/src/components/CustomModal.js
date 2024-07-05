import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import NewCustomer from "pages/Customer/NewCustomer";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./SmallComponent/CoustomButton";
import CustomForm from "./CustomForm";

const CustomModel = ({ customerSelect,customerId,width ,disabled,entity,fieldName}) => {
    const [open, setOpen] = useState(false);
    const { getDropDownData } = useAuth();
    const [value,setValue] = useState("")
    const [options, setOptions] = useState([]);

   

    const handelClick = async () => {
        let data = await getDropDownData(entity, fieldName);
        setOptions(data);
    };

    const handleChange = (value, label) => {
        customerSelect(value,label);
        setValue(value)
    };
    const openModal = () => {
        setOpen(true);
    };
    const onCancel = () => {
        setOpen(!open);
        if(customerId){
            setValue(customerId)
        }
    };

    const handleModalClose = (result) => {
        setOpen(!open);
        handelClick();
        handleChange(result?._id);
        setValue(result?._id)
        customerSelect(result?._id);
    };
    useEffect(() => {
        handelClick();
        setValue(customerId)
    }, []);

    return (
        <>
            {!open ? (
                <Select
                    options={options}
                    disabled ={disabled}
                    value={value ? value :""}
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
                                <CoustomButton   text ="New" onClick={openModal}/>
                            </div>
                        );
                    }}
                    onClick={handelClick}
                    onChange={handleChange}
                />
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
                    overflow: 'auto' 
                }}
       
                    keyboard={false}
                >
                    <CustomForm  entity ={entity} height="50vh" header ={false} isModal={true} fieldName={fieldName} passToModal={handleModalClose} />
                </Modal>
            )}
        </>
    );
};

export default CustomModel;
