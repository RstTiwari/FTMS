import React, { useEffect, useState } from "react";
import Taglabel from "./Taglabel";
import { Row, Col } from "antd";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";

const AddressDetails = ({ entityName, address }) => {
    const [isInitialRender, setIsInitialRender] = useState(true);

    useEffect(() => {
        // Set initial render to false after component mounts
        setIsInitialRender(true);
        if (address) {
            setIsInitialRender(false);
        }
    }, [address]);

    const addressString = `${address?.street1 || ""}, ${
        address?.street2 || ""
    }, ${address?.city || ""}, ${address?.state || ""}, ${
        address?.pincode || ""
    }`;

    return (
        <div>
            {!isInitialRender ? (
                <>
                    {address ? (
                        <>
                            <Row align="middle" style={{ marginBottom: "2px" }}>
                                <Col span={20}>
                                    <Taglabel
                                        text={entityName.toUpperCase()}
                                        details={true}
                                    />
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}>
                                    <EditOutlined />
                                </Col>
                            </Row>
                            <Row style={{ fontSize: "0.875rem" }}>
                                <Col span={24}>{addressString}</Col>
                            </Row>
                        </>
                    ) : (
                        <>
                            <Row align="middle" style={{ marginBottom: "4px" }}>
                                <Col span={20}>
                                    <Taglabel
                                        text={`No ${entityName}`}
                                        details={true}
                                    />
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}>
                                    <PlusOutlined />
                                </Col>
                            </Row>
                        </>
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
};

export default AddressDetails;
