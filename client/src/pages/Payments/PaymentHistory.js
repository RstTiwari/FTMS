import React from "react";
import { List, Typography, Row, Col } from "antd";
import {
    convertUnixTimestampToDate,
    epochInDDMMYY,
} from "Helper/EpochConveter";
const { Text } = Typography;

const PaymentHistoryList = ({ data }) => {
    return (
        <>
            <Row justify={"center"}>
                <Text type="success">PAYMENT HISTORY</Text>
            </Row>
            <List
                itemLayout="vertical"
                dataSource={data}
                style={{ border: "2px solid green", padding: "10px" }}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Row>
                            <Col span={6}>
                                <Text strong>Date: </Text>
                                <Text>
                                    {convertUnixTimestampToDate(
                                        item.paymentDate
                                    )}
                                </Text>
                            </Col>
                            <Col span={6}>
                                <Text strong>Amount: </Text>
                                <Text>{item.amount}</Text>
                            </Col>
                            <Col span={6}>
                                <Text strong>Payment Mode: </Text>
                                <Text>{item.paymentMode}</Text>
                            </Col>
                            <Col span={6}>
                                <Text strong>Note: </Text>
                                <Text>{item.note}</Text>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </>
    );
};

export default PaymentHistoryList;
