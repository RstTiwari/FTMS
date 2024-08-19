import React from "react";
import {
    Form,
    Row,
    Col,
    DatePicker,
    Select,
    Input,
    Button,
    Upload,
} from "antd";
import { categoryOption } from "../../Data/ExpensesData";
import CustomerModal from "components/CustomModal";
import UploadImage from "components/UploadImage";
import FormItemCol from "components/Comman/FormItemCol";

const ExpenseForm = ({ form }) => {
    const handleItemUpdate = (value, fieldName) => {
        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "categoryName") {
            form.setFieldsValue({ categoryName: value });
        } else if (fieldName === "expenseDate") {
            form.setFieldsValue({ expenseDate: value });
        }
    };
    const handleImageUpdate = (file) => {
        form.setFieldsValue({ image: file });
    };

    return (
        <div>
            <Row>
                <FormItemCol
                    label="Expense Date"
                    required={true}
                    name="expenseDate"
                    labelAlign="left"
                    rules={[
                        { required: true, message: "Expense Date is Required" },
                    ]}
                    labelCol={{ span: 8 }}
                    type={"date"}
                    preFillValue={form.getFieldValue("expenseDate")}
                    updateInForm={(value) => {
                        handleItemUpdate(value, "expenseDate");
                    }}
                />
            </Row>

            <FormItemCol
                label="Category Name"
                name="categoryName"
                required={true}
                type={"select"}
                labelAlign="left"
                rules={[{ required: true, message: "Category  is Required" }]}
                entity={"Category Name"}
                entityName={"categoryName"}
                labelCol={{ span: 8 }}
                updateInForm={(value) =>
                    handleItemUpdate(value, "categoryName")
                }
                preFillValue={form.getFieldValue("categoryName")}
            />

            <FormItemCol
                label="Amount"
                name="amount"
                labelAlign="left"
                required={true}
                rules={[{ required: true, message: "Amount is Required" }]}
                labelCol={{ span: 8 }}
                type={"number"}
            />
            <FormItemCol
                labelAlign="left"
                labelCol={{ span: 8 }}
                label="Receipt Image"
                name="image"
                type={"image"}
                updateImageInForm={handleImageUpdate}
                url={form.getFieldValue("image")}
            />
            <FormItemCol
                label="#WorkOrder"
                name="workOrder"
                labelAlign="left"
                labelCol={{ span: 8 }}
            />

            <FormItemCol
                label="Note"
                name="note"
                labelAlign="left"
                labelCol={{ span: 8 }}
                type={"text"}
            />

            <FormItemCol
                label="Select Customer"
                name="customer"
                labelAlign="left"
                labelCol={{ span: 8 }}
                type={"model"}
                width={"25vw"}
                entity="customers"
                fieldName={"name"}
                updateInForm={(value) => handleItemUpdate(value, "customer")}
                preFillValue={form.getFieldValue("customer")?.name?.name}
            ></FormItemCol>
        </div>
    );
};
export default ExpenseForm;
