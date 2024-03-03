import React, { useEffect, useState } from "react";
import { Modal, Select, Divider, Button } from "antd";
import { useAuth } from "state/AuthProvider";
import NewProduct from "pages/Product/NewProduct";

const ProductModal = ({ productSelect, productValue ,disabled}) => {
    const [open, setOpen] = useState(false);
    const { getDropDownData } = useAuth();
    const [product, setProduct] = useState("");
    const [options, setOptions] = useState([]);
    const handelProductClick = async () => {
        let entity = "product";
        let fieldName = "productName";
        const dropDownData = await getDropDownData(entity, fieldName);
        setOptions(dropDownData);
    };
    const handleProductChange = (value, label) => {
        setProduct(label.productName);
        productSelect(label);
    };
    const addNewProduct = () => {
        setOpen(true);
    };
    const onCancel = () => {
        setOpen(!open);
    };
    const afterAdd = (result) => {
        handelProductClick();
        setProduct(result.productName);
        productSelect(result);
        setOpen(false);
    };
    useEffect(() => {
        handelProductClick();
        setProduct(productValue ? productValue.description : "");
    }, []);
    return (
        <>
            {!open ? (
                <Select
                disabled ={disabled}
                    options={options}
                    value={product ? product : ""}
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
                                    onClick={addNewProduct}
                                >
                                    Add New
                                </Button>
                            </div>
                        );
                    }}
                    onClick={handelProductClick}
                    onChange={handleProductChange}
                />
            ) : (
                <>
                    <Modal
                        title={"NEW PRODUCT"}
                        zIndex={1200}
                        centered
                        open={open}
                        width={"90%"}
                        onCancel={onCancel}
                        maskClosable={true}
                        footer={null}
                        keyboard={false}
                    >
                        <NewProduct afterAdd={afterAdd} />
                    </Modal>
                </>
            )}
        </>
    );
};

export default ProductModal;
