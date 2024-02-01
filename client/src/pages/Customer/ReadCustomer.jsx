import { Flex, Form ,Col,Row} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "state/AuthProvider";
import Header from "components/Header";
import CoustomersForm from "Forms/CoustomersForm";
const ReadCustomer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState("");
    const { readData } = useAuth();
    const { entity, id } = useParams();
    const [form] = Form.useForm();
    let fetchData = async () => {
        const { success, result, message } = await readData({
            entity: entity,
            id: id,
        });
        console.log(result,"---");
        if (success === 1) {
            setIsLoading(false);
            setData(result);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log(data,"data");
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
            <Header title={" Customer Details"} subTitle={""} />
            <Form
                name="coustomerForm"
                form={form}
                initialValues={{ customerName: "ROht" }}
            >
                <CoustomersForm current={form} />
            </Form>
        </Flex>
    );
};

export default ReadCustomer;
