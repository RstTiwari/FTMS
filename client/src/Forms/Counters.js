import FormItemCol from "components/SmallComponent/FormItemCol";
import React from "react";
import { useParams } from "react-router-dom";
import { Row, Typography, Form,Col } from "antd";

const { Text } = Typography;

const Counters = ({ form }) => {
    const { entity } = useParams();
    return (
        <>
            <Row justify={"start"} >
                <FormItemCol
                    tooltip={
                        "Short Name of Your Company   Eg => Miraj Engineering   ME "
                    }
                    label={"Prefix"}
                    labelCol={{span:24}}
                    name={"prefix"}
                    required={true}
                    rules={[
                        { required: true, message: `Please input Prefix` },
                    ]}
                />
           
                <FormItemCol
                    label={"Next Number"}
                    tooltip={"Next Number Of Your Document"}
                    name={"nextNumber"}
                    required={true}
                    labelCol={{span:24}}
                    rules={[
                        { required: true, message: `Please input Next Number` },
                      
                    ]}
                />
                <Form.Item
                    name="entityName"
                    initialValue={entity}
                    hidden={true}
                >
                    <input type="hidden" />
                </Form.Item>
            </Row>

        </>
    );
};

export default Counters;
