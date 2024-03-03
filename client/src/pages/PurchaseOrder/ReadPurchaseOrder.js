import DeliveryChallanForm from "Forms/DeliveryChallanForm";
import { Flex } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "state/AuthProvider";
import { useParams } from "react-router-dom";
import NotificationHandler from "EventHandler/NotificationHandler";
import PageLoader from "pages/PageLoader";
import Header from "components/Header";
import PurchaseOrder from "Forms/PurchaseOrderForm";

const ReadPurchaseOrder = () => {
    const { entity, id } = useParams();
    const { readData } = useAuth();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const fetchData = async () => {
        const { success, result, message } = await readData({ entity, id });
        if (!success) {
            setIsLoading(false);
            return NotificationHandler.error(message);
        } else {
            setIsLoading(false);
            setData(result);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
                title={"DETAILS FOR PURCHASE ORDERS"}
                cancelRoute={"purchaseorder"}
            />
            <PageLoader isLoading={isLoading} />
            {data.items ? (
                <PurchaseOrder
                    onFinish={{}}
                    value={data}
                    disabled={true}
                />
            ) : (
                ""
            )}
        </Flex>
    );
};

export default ReadPurchaseOrder;
