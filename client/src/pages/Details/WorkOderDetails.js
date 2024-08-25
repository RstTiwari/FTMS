import React from "react";
import { Card, Col, Row, Divider, List, Tag, Typography } from "antd";
import Taglabel from "components/Comman/Taglabel";
import { jsDateIntoDayjsDate } from "Helper/EpochConveter";

const WorkOrderDetails = ({ workOrder }) => {
    if (!workOrder) return null;

    const { type, no, startDate, dueDate, incharge, status, items } = workOrder;

    const statusColors = {
        DRAFT: "gray",
        SEND: "blue",
        CANCELLED: "red",
        ON_HOLD: "orange",
        COMPLETED: "green",
        IN_PROGRESS: "purple",
    };

    return (
        <Card title={`Work Order #${no}`} bordered={false}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Typography.Text strong>
                        Work Order Type: {type}
                    </Typography.Text>
                </Col>
                <Col span={12}>
                    <Row>
                        <Typography.Text strong>
                            Status:
                            <Tag
                                style={{ marginLeft: "10px" }}
                                color={statusColors[status]}
                            >
                                {status}
                            </Tag>
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Start Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(startDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            Due Date:
                            <Taglabel
                                text={`${jsDateIntoDayjsDate(dueDate)}`}
                            />
                        </Typography.Text>
                    </Row>
                    <Row>
                        <Typography.Text strong>
                            In Charge: {incharge}
                        </Typography.Text>
                    </Row>
                </Col>
            </Row>

            <Divider />

            <Row justify={"center"}>
                <Typography.Title level={5}>ITEM LIST</Typography.Title>
            </Row>
            <List
                bordered
                dataSource={items}
                renderItem={(item) => (
                    <List.Item>
                        <Row style={{ width: "100%" }}>
                            <Col span={4}>
                                <Typography.Text>
                                    {item.product?.code || "N/A"}
                                </Typography.Text>
                            </Col>
                            <Col span={16}>
                                <Typography.Text>
                                    {item.product?.name || "N/A"}
                                </Typography.Text>
                            </Col>
                            <Col span={4}>
                                <Typography.Text>
                                    {item.qty || 0}
                                </Typography.Text>
                            </Col>
                        </Row>
                    </List.Item>
                )}
                header={
                    <Row style={{ width: "100%", fontWeight: "bold" }}>
                        <Col span={4}>Code</Col>
                        <Col span={16}>Name</Col>
                        <Col span={4}>Quantity</Col>
                    </Row>
                }
            />
        </Card>
    );
};

export default WorkOrderDetails;
