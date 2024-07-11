import React from "react";
import { Spin, Row, Col } from "antd";

const PageLoader = ({ text, isLoading ,height="100vh"}) => {
    return isLoading ? (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: height,
            }}
        >
            <Row>
                <Spin size="large" />
            </Row>
            <Row> {text}</Row>
        </div>
    ) : null;
};
export default PageLoader;
