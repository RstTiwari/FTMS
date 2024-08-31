import React from "react";
import { Card, Descriptions, Typography, List, Tag, Col, Row } from "antd";
import CommentDetails from "components/Comman/CommnetsDetails";

const { Title } = Typography;

const UserDetails = ({ user, comments }) => {
    // Check if user is active
    if (user.removed) {
        return (
            <Card bordered={false}>
                <Title level={3} style={{ textAlign: "center", color: "red" }}>
                    USER IS INACTIVE
                </Title>
            </Card>
        );
    }

    return (
        <Row gutter={16}>
            <Col span={12}>
                <Card bordered={false}>
                    <Title level={3} style={{ textAlign: "center" }}>
                        USER DETAILS
                    </Title>
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Name">
                            {user.name || ""}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {user.email || ""}
                        </Descriptions.Item>
                        <Descriptions.Item label="Role">
                            {user.role || ""}
                        </Descriptions.Item>
                    </Descriptions>

                    {user.role !== "superadmin" && user.role !== "admin" ? (
                        <>
                            <Title level={4} style={{ marginTop: 20 }}>
                                Permissions
                            </Title>
                            <List
                                bordered
                                dataSource={user.permissions}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Col span={4}>
                                            <strong>
                                                {item.entity.toUpperCase()}:
                                            </strong>
                                        </Col>
                                        <Col span={4}>
                                            {item.value.toUpperCase()}
                                        </Col>
                                    </List.Item>
                                )}
                            />
                        </>
                    ) : null}
                </Card>
            </Col>

            <Col span={12}>
                <CommentDetails />
            </Col>
        </Row>
    );
};

export default UserDetails;
