import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import NewCustomer from "pages/Customer/NewCustomer";
import { useAuth } from "state/AuthProvider";
import CoustomButton from "./SmallComponent/CoustomButton";
import CustomForm from "./CustomForm";
import NotificationHandler from "EventHandler/NotificationHandler";

const CustomModel = ({
    customerSelect,
    customerId,
    width,
    disabled,
    entity,
    fieldName,
}) => {
    const [open, setOpen] = useState(false);
    const { appApiCall } = useAuth();
    const [value, setValue] = useState("");
    const [options, setOptions] = useState([]);
    const [isLoading,setIsLoading] = useState(false)
    const [char,setChar] = useState('')

    // fucntion for clicking the select tab
    const handelClick = async () => {
        setIsLoading(true)
        let response = await appApiCall("post","fetchSelectData",{},{entity,fieldName});
        if(response.success){
            setOptions(response?.result);
        }else{
             setOptions([])
             NotificationHandler.error(response.message)
        }
        setIsLoading(false)
    };

    // deboucne function to manage the search
    const debounce = (fun, delay)=>{
       let debounceTimer 
       return function (...args){
        let context = this
        clearInterval(debounceTimer)
        debounceTimer = setTimeout(()=> fun.apply(context,args),delay)

       }
    }

    // Fucntion whean serching the Vaiue
    const handelSearch = async (char)=>{
       setChar(char)
       setIsLoading(true)
       let response = await appApiCall("post","fetchSelectData",{},{entity,fieldName,char});
       if(response.success){
           setOptions(response?.result);
       }else{
            setOptions([])
            NotificationHandler.error(response.message)
       }
       setIsLoading(false)
    }
    const handelDebounceSearch= debounce(handelSearch,500)


    const handleChange = (value, label) => {
        //customerSelect(value, label);
        setValue(value);
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
        console.log(result);
        // handelClick();
        // handleChange(result?._id);
        setValue(result?._id);
        // customerSelect(result?._id);
        setOpen(!open);

    };
    useEffect(() => {
        handelClick();
        setValue(customerId);
    }, []);

    return (
        <>
            {!open ? (
                <Select
                    options={options}                
                    value={value ? value : ""}
                    disabled ={disabled}
                    allowClear
                    loading ={isLoading}
                    onClear={()=>setValue("")}
                    showSearch
                    onSearch={handelDebounceSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    dropdownRender={(menu) => {
                        return (
                            <div style={{minHeight:"300px",overflow:"auto"}}>
                                {menu}
                                <Divider />
                                <CoustomButton text="New" onClick={openModal} />
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
