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

const CustomSelect = ({ entity,entityKey, onChange, defaultSelect, width }) => {
    const [options, setOptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for Loader
    const [addValue, setAddValue] = useState("");
    const [selected, setSelected] = useState(defaultSelect);

    const fetchOptions = async () => {
        setIsLoading(true);
        const response = //await getDropDownData(entity);
        setOptions("response");
        setIsLoading(false);
    };
    useEffect(() => {
   
        fetchOptions();
    }, [entity]);

    useEffect(() => {
        if (defaultSelect) {
            setSelected(defaultSelect);
        }
    }, [defaultSelect]);

    const handleChange = (value) => {
        onChange(value);
        setSelected(value);
    };

    const addNewOption = async () => {
        const payload = {
            entity: entity,
            data: [{ label: addValue, value: addValue }],
        };
        const response =   null //await addNewDropDownData(payload);
        if (response.success) {
            const updatedOptions =  null // await getDropDownData(entity);
            setOptions(updatedOptions);
            setSelected(addValue);
            onChange(addValue);
            setOpen(false);
        } else {
        }
    };


    return (
        <>
            {!open ? (
                <Select
                    value={"" || ""}
                    options={[]}
                    onChange={{}}
                    style={{ width: width }}
                    // loading={isLoading}
                    // onClick={fetchOptions}
                    // getPopupContainer={(trigger) => trigger.parentElement}
                    dropdownRender={(menu) => (
                        <div>
                            {menu}
                            <Divider />

                            <CoustomButton onClick={()=>setOpen(true)}  text={"New"}  withIcon ={true}/>
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
                    <Row gutter={16}>
                        <Input
                            placeholder={`Enter new ${entity}`}
                            onChange={(e) => setAddValue(e.target.value)}
                        />
                    </Row>
                    <Button
                        type="primary"
                        style={{ marginTop: "1rem" }}
                        onClick={addNewOption}
                    >
                        SAVE
                    </Button>
                </Modal>
            )}
        </>
    );
};

export default CustomSelect;
