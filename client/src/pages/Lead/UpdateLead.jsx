import {
    Form,
    Select,
    Divider,
    Space,
    Input,
    Button,
    Row,
    Col,
    DatePicker,
    InputNumber,
    Flex,
    Table,
} from "antd";
import PageLoader from "pages/PageLoader";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMediaQuery } from "@mui/material";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import NotificationHandler from "EventHandler/NotificationHandler";
import { epochInDDMMYY } from "Helper/EpochConveter";
import UpdateLeadForm from "Forms/UpdateLeadForm";

const UpdateLead = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { entity, id } = useParams();
    const { readData } = useAuth();

    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        if (success === 1) {
            setData(result);
            setIsLoading(false);
        } else {
            return NotificationHandler.error("Failed to Fetch");
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
                margin: "1.5rem 2rem",
                padding: "2rem",
                backgroundColor: "#ffffff",
                borderRadius: "1rem",
            }}
        >
            <Header title={` Update - ${entity} Details`} subTitle={""} cancelRoute={"lead"} />
            <PageLoader
                text={`Please hold Fetching ${entity}`}
                isLoading={isLoading}
            />

            {!isLoading && data ? (
                <>
                    <UpdateLeadForm
                        initialValues={{
                            recivedDate: epochInDDMMYY(data.recivedDate),
                            customer: data.customer._id,
                            comments: data.comments,
                            source: data.source,
                            status: data.status,
                        }}
                        id={id}
                    />
                </>
            ) : (
                ""
            )}
        </Flex>
    );
};

export default UpdateLead;
