import {  Col } from "antd";
import FormItemCol from "../../components/Comman/FormItemCol"; // assuming you have this custom wrapper


const onlyTextRegex = /^[A-Za-z-/\s]+$/
const FormRow = () => {
    return (
        <>
            <Col>
                <FormItemCol
                    tooltip="Short Name of Your Company. E.g., Miraj Engineering => ME"
                    label="Prefix"
                    name="prefix"
                    type="text"
                    labelCol={{ span: 18 }}
                    required
                    labelAlign="left"
                    r   rules={[
                        { required: true, message: "Please input Prefix" },
                        {
                            pattern: onlyTextRegex,
                            message: "Prefix must contain only letters",
                        },
                    ]}
                />
            </Col>
            <Col>
                <FormItemCol
                    tooltip="Next Number Of Your Document"
                    label="Number"
                    name="nextNumber"
                    type="number"
                    required
                    labelAlign="left"
                    labelCol={{ span: 18 }}
                    rules={[
                        { required: true, message: "Please input Next Number" },
                        {
                            type: "number",
                            message: "Please enter a valid number",
                        },
                       
                    ]}
                    stringMode ={false}
                    
                />
            </Col>
            <Col>
                <FormItemCol
                    tooltip="Add Suffix for Number"
                    label="Suffix"
                    name="suffix"
                    type="text"
                    labelCol={{ span: 18}}
                    labelAlign="left"
                    rules={[
                        {
                            pattern: /^[A-Za-z]{1}$/,
                            message: "must be a single alphabet character",
                        },
                    ]}
                />
            </Col>

        </>
    );
};

export default FormRow;
