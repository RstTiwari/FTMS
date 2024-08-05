import React from "react";
import { Card, Row, Col, Avatar, Collapse } from "antd";
import { UserOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import Taglabel from "./Taglabel"; // Adjust the import based on your actual file structure
import AddressDetails from "./AddressDetails";
import { useParams,useNavigate } from "react-router-dom";
const { Panel } = Collapse;

const CustomerAddressCard = ({
    customerData,
    billingAddress,
    shippingAddress,
}) => {
    const {entity} = useParams()
    const navigate = useNavigate()
    // j
    const updateInForm =()=>{
        window.location.reload()
    }
    return (
        <>
            <Row align="middle" style={{ maxWidth: "500px", margin: "0 auto" }}>
                <>
                    <Col
                        span={24}
                        style={{ textAlign: "center", wordWrap: "break-word" }}
                    >
                        <Taglabel
                            text={`${customerData?.name}`}
                            weight={1000}
                        />
                        <p>
                            <Row justify={"center"}>
                                <PhoneOutlined style={{ marginRight: 8 }} />
                            </Row>
                            <Row justify={"center"}>
                                <Taglabel
                                    text={`${customerData?.phone}`}
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
                                    text={`${customerData?.email}`}
                                    type={"text"}
                                    weight={900}
                                />
                            </Row>
                        </p>
                    </Col>
                </>
            </Row>
            <AddressDetails  initialRender={true} id={customerData?._id} entity={entity} keyName={"billingAddress"} entityName={"Billing Address"} address={billingAddress} updateInForm={updateInForm}/>
            <AddressDetails  initialRender={true} id={customerData?._id} entity={entity}  keyName ={"shippingAddress"}entityName={"Shipping Address"} address={shippingAddress} updateInForm={updateInForm}/>

          
        </>
    );
};

export default CustomerAddressCard;
