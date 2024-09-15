import React, { useState } from "react";
import { List, Flex, Row, Col, Image, Button, Typography } from "antd";
import Header from "components/Header";
import { templateData } from "Data/templateData";
import NotificationHandler from "EventHandler/NotificationHandler";
import { useAuth } from "state/AuthProvider";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Template = () => {
    const { adminApiCall } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const updateTemplate = async (templateKey) => {
        setIsLoading(true);
        const value = { templateId: templateKey };
        const payload = { entity: "orgnizationprofile", value };
        const { success, result, message } = await adminApiCall(
            "post",
            "update",
            payload
        );
        if (!success) {
            setIsLoading(false);
            NotificationHandler.error(message);
        } else {
            navigate("/dashboard");
            return NotificationHandler.success(message);
        }
    };
    return (
        <Flex
            gap={"middle"}
            vertical
            style={{
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header
                title={"Select PDF Template For Your Orgnization"}
                cancelRoute={"dashboard"}
            />
            <Row justify={"center"} gutter={20}>
                {templateData.map((item) => {
                    return (
                        <Col
                            xs={24}
                            sm={24}
                            md={12}
                            lg={8}
                            xl={8}
                            key={item.key}
                        >
                            <Row justify={"center"}>
                                <Text type="success">{item.title}</Text>
                            </Row>
                            <Image src={item.image} />
                            <Row justify={"center"}>
                                <Button
                                    type="primary"
                                    onClick={() => updateTemplate(item.key)}
                                >
                                    SELECT
                                </Button>
                            </Row>
                        </Col>
                    );
                })}
            </Row>
        </Flex>
    );
};

export default Template;
