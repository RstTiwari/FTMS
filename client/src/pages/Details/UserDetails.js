import React from "react";
import { Card, Descriptions, Typography, List, Tag, Col } from "antd";

const { Title } = Typography;

const UserDetails = ({ user }) => {
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

            {user.role !== "superadmin" && user.role != "admin" ? (
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
                                <Col span={4}>{item.value.toUpperCase()}</Col>
                            </List.Item>
                        )}
                    />
                </>
            ) : (
                ""
            )}
        </Card>
    );
};

export default UserDetails;
