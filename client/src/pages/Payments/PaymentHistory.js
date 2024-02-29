import React from "react";
import { List, Typography, Row } from "antd";
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
                        <div>
                            <Text strong>Date: </Text>
                            <Text>
                                {convertUnixTimestampToDate(item.paymentDate)}
                            </Text>
                        </div>
                        <div>
                            <Text strong>Amount: </Text>
                            <Text>{item.amount}</Text>
                        </div>
                        <div>
                            <Text strong>Payment Mode: </Text>
                            <Text>{item.paymentMode}</Text>
                        </div>
                        <div>
                            <Text strong>Note: </Text>
                            <Text>{item.note}</Text>
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
};

export default PaymentHistoryList;
