import React from "react";
import {
    Form,
    Row,
    Col,
    Button,
    Collapse,
    AutoComplete,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";
import { DeleteOutline } from "@mui/icons-material";

const { Panel } = Collapse;

const TermsAndConditionsForm = ({
    width = "75vw",
    options = [],
}) => {

    return (
        <Col style={{ width }}>

            <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition="right"
                style={{
                    backgroundColor: "#fff",
                    marginBottom: 16,
                }}
            >

                <Panel
                    header="Terms and Conditions"
                    key="1"
                >

                    <Form.List name="terms">

                        {(fields, { add, remove }) => (

                            <>

                                <Row
                                    justify="start"
                                    style={{ marginBottom: 12 }}
                                >

                                    <Button
                                        type="link"
                                        icon={<PlusOutlined />}
                                        onClick={() =>
                                            add({
                                                value: "",
                                            })
                                        }
                                        style={{
                                            color: "#22b378",
                                            paddingLeft: 0,
                                        }}
                                    >
                                        Add Term
                                    </Button>

                                </Row>

                                {fields.map(
                                    ({
                                        key,
                                        name,
                                        ...restField
                                    }) => (

                                        <Row
                                            key={key}
                                            align="middle"
                                            gutter={16}
                                            style={{
                                                marginBottom: 8,
                                            }}
                                        >

                                            <Col span={22}>

                                                <Form.Item
                                                    {...restField}
                                                    name={[
                                                        name,
                                                        "value",
                                                    ]}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                "Please enter term",
                                                        },
                                                    ]}
                                                >

                                                    <AutoComplete
                                                        placeholder="Enter or Select Term"
                                                        filterOption={(
                                                            inputValue,
                                                            option
                                                        ) =>
                                                            option?.value
                                                                ?.toUpperCase()
                                                                .includes(
                                                                    inputValue.toUpperCase()
                                                                )
                                                        }
                                                        options={options.map(
                                                            (
                                                                item
                                                            ) => ({
                                                                value:
                                                                    item?.value || "",
                                                            })
                                                        )}
                                                    />

                                                </Form.Item>

                                            </Col>

                                            <Col span={2}>

                                                <DeleteOutline
                                                    onClick={() =>
                                                        remove(name)
                                                    }
                                                    style={{
                                                        color: "red",
                                                        cursor: "pointer",
                                                    }}
                                                />

                                            </Col>

                                        </Row>
                                    )
                                )}

                            </>
                        )}

                    </Form.List>

                </Panel>

            </Collapse>

        </Col>
    );
};

export default TermsAndConditionsForm;