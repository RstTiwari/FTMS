import React from "react";
import { Card, Row, Col, Avatar, Collapse } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import Taglabel from "./Taglabel"; // Adjust the import based on your actual file structure

const { Panel } = Collapse;

const CustomerAddressCard = ({
    customerData,
    billingAddress,
    shippingAddress,
}) => {
    return (
        <>
            <Row align="middle" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <>
                    <Col
                        span={24}
                        style={{ textAlign: "center", wordWrap: "break-word" }}
                    >
                        {console.log(customerData,"===")}
                        <Taglabel
                            text={`${customerData?.customerName}`}
                            weight={1000}
                        />
                        <p>
                            <Row justify={"center"}>
                                <PhoneOutlined style={{ marginRight: 8 }} />
                            </Row>
                            <Row justify={"center"}>
                                <Taglabel
                                    text={`${customerData?.customerPhone}`}
                                    type={"text"}
                                    weight={900}
                                />
                            </Row>
                        </p>
                        <p >
                            <Row justify={"center"}>
                                <MailOutlined style={{ marginRight: 8 }} />
                            </Row>
                            <Row justify={"center"}>
                                <Taglabel
                                    text={`${customerData?.customerEmail}`}
                                    type={"text"}
                                    weight={900}
                                />
                            </Row>
                        </p>
                    </Col>
                </>
            </Row>
            <Collapse style={{ marginTop: "16px", border: "none" }}>
                <Panel
                    header={<Taglabel text="ADDRESS DETAILS" />}
                    key="1"
                    style={{ border: "none" }}
                >
                    <div>
                        <p>
                            <Taglabel
                                text="Billing Address"
                                weight={800}
                                type="heading"
                            />
                        </p>
                        {billingAddress ? (
                            <>
                                <p>
                                    <Taglabel text="Street 1" />:{" "}
                                    <Taglabel
                                        text={`${billingAddress.street1}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="Street 2" />:{" "}
                                    <Taglabel
                                        text={`${billingAddress.street2}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="City" />:{" "}
                                    <Taglabel
                                        text={`${billingAddress.city}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="State" />:{" "}
                                    <Taglabel
                                        text={`${billingAddress.state}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="Pincode" />:{" "}
                                    <Taglabel
                                        text={`${billingAddress.pincode}`}
                                        type="text"
                                    />
                                </p>
                            </>
                        ) : (
                            <p>No billing address found</p>
                        )}

                        <p>
                            <Taglabel
                                text="Shipping Address"
                                weight={800}
                                type="heading"
                            />
                        </p>
                        {shippingAddress ? (
                            <>
                                <p>
                                    <Taglabel text="Street 1" />:{" "}
                                    <Taglabel
                                        text={`${shippingAddress.street1}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="Street 2" />:{" "}
                                    <Taglabel
                                        text={`${shippingAddress.street2}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="City" />:{" "}
                                    <Taglabel
                                        text={`${shippingAddress.city}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="State" />:{" "}
                                    <Taglabel
                                        text={`${shippingAddress.state}`}
                                        type="text"
                                    />
                                </p>
                                <p>
                                    <Taglabel text="Pincode" />:{" "}
                                    <Taglabel
                                        text={`${shippingAddress.pincode}`}
                                        type="text"
                                    />
                                </p>
                            </>
                        ) : (
                            <p>No shipping address found</p>
                        )}
                    </div>
                </Panel>
            </Collapse>
            <Collapse style={{ marginTop: "16px", border: "none" }}>
                <Panel
                    header={<Taglabel text="OTHER DETAILS" />}
                    key="2"
                    style={{ border: "none" }}
                >
                    <div>
                        <p>
                            <Taglabel text="Pan No" />:{" "}
                            {customerData?.panNo ? (
                                <Taglabel
                                    text={customerData?.panNo}
                                    type="text"
                                />
                            ) : (
                                "Not found"
                            )}
                        </p>
                        <p>
                            <Taglabel text="GST No" />:{" "}
                            {customerData?.gstNo ? (
                                <Taglabel
                                    text={customerData?.gstNo}
                                    type="text"
                                />
                            ) : (
                                "Not found"
                            )}
                        </p>
                        <p>
                            <Taglabel text="Contact Person" />:{" "}
                            {customerData?.contactPerson ? (
                                <Taglabel
                                    text={customerData?.contactPerson}
                                    type="text"
                                />
                            ) : (
                                "Not found"
                            )}
                        </p>
                    </div>
                </Panel>
            </Collapse>
        </>
    );
};

export default CustomerAddressCard;
