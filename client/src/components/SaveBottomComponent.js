import React from "react";
import { Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";

const SaveBottmComponent = ({ buttonText, action2, cancelRoute }) => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                position: "fixed",
                bottom: 0,
                height: "4rem",
                left: 0,
                width: "100%",
                backgroundColor: "#f0f0f0",
            }}
        >
            <Row justify={"center"} style={{ margin: "1rem" }}>
                <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Button htmlType={"submit"}>{buttonText}</Button>
                </Col>

                {action2 ? (
                    <Col xs={12} sm={12} md={12} lg={2} xl={4}>
                        <Button
                            onClick={() => {
                                action2();
                            }}
                        >
                            SAVE AND DOWNLOAD
                        </Button>
                    </Col>
                ) : (
                    ""
                )}
                {cancelRoute ? (
                    <Col xs={12} sm={12} md={12} lg={2} xl={6}>
                        <Button
                            danger
                            onClick={() => {
                                navigate(`/${cancelRoute}`);
                            }}
                        >
                            CANCEL
                        </Button>
                    </Col>
                ) : (
                    ""
                )}
            </Row>
        </div>
    );
};

export default SaveBottmComponent;
