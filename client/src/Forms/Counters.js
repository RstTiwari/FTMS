import FormItemCol from "components/Comman/FormItemCol";
import React from "react";
import { useParams } from "react-router-dom";
import { Row, Typography, Form, Col, Input } from "antd";

const Counters = () => {
    const { entity } = useParams();
    return (
        <>
            <Row justify={"start"}>
                <FormItemCol
                    tooltip={
                        "Short Name of Your Company   Eg => Miraj Engineering   ME "
                    }
                    label={"Prefix"}
                    labelCol={{ span: 24 }}
                    type={"text"}
                    name={"prefix"}
                    required={true}
                    rules={[{ required: true, message: `Please input Prefix` }]}
                />

                <FormItemCol
                    label={"Next Number"}
                    tooltip={"Next Number Of Your Document"}
                    name={"nextNumber"}
                    required={true}
                    labelCol={{ span: 24 }}
                    type={"text"}
                    readOnly={false}
                    rules={[
                        { required: true, message: `Please input Next Number` },
                    ]}
                />
                <Form.Item
                    name="entityName"
                    initialValue={entity}
                    hidden={true}
                >
                    <Input type="hidden" />
                </Form.Item>
            </Row>
        </>
    );
};

export default Counters;
