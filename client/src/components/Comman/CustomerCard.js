import React from "react";
import { Card, Row, Col, Avatar, Collapse } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import Taglabel from "./Taglabel"; // Adjust the import based on your actual file structure
import AddressDetails from "./AddressDetails";

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
            <AddressDetails  initialRender={true} entityName={"Billing Address"} address={billingAddress}/>
            <AddressDetails  initialRender={true} entityName={"Shipping Address"} address={shippingAddress}/>

          
        </>
    );
};

export default CustomerAddressCard;
