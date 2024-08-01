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
import { categoryOption } from "../Data/ExpensesData";
import CustomerModal from "components/CustomModal";
import UploadImage from "components/UploadImage";
import FormItemCol from "components/Comman/FormItemCol";

const ExpenseForm = ({ form }) => {
    const handleItemUpdate = (value, fieldName) => {
        if (fieldName === "customer") {
            form.setFieldsValue({ customer: value });
        } else if (fieldName === "categoryName") {
            form.setFieldsValue({ categoryName: value });
        }
    };
    return (
        <div style={{ height: "100vh" }}>
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
            />

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
                type={"box"}
            />

            <FormItemCol
                label="Select Customer"
                name="customer"
                labelAlign="left"
                labelCol={{ span: 8 }}
                type={"model"}
                entity="customers"
                fieldName={"customerName"}
                updateInForm={(value) => handleItemUpdate(value, "customer")}
            ></FormItemCol>
        </div>
    );
};
export default ExpenseForm;
