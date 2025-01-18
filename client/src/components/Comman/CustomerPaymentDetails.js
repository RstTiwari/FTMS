import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import Taglabel from "./Taglabel";
import PageLoader from "pages/PageLoader";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";

const PaymentCard = ({title,id}) => {
    const { entity } = useParams();
    let { initialValues, isFetching, fetchInitialValues } =
        useInitialFormValues(entity, "totalReciveables", id);

    useEffect(() => {
        fetchInitialValues();
    }, [id]);

    if (isFetching) {
        return <PageLoader text="Loading..." isLoading={true} height="10vh" />;
    }
    return (
        <>
            <Row justify={"center"}>
                <Taglabel text={title} type={"heading"} weight={1000} />
            </Row>
            <Row gutter={16} style={{ marginBottom: "50px" }}>
                {initialValues &&
                    initialValues.map((item) => (
                        <Col span={6} key={item.id}>
                            <div
                                style={{
                                    padding: "8px",
                                    border: "1px solid #e8e8e8",
                                    borderRadius: "4px",
                                }}
                            >
                                <Row>
                                    <Taglabel
                                        text={item.title}
                                        weight={900}
                                        type={"heading"}
                                    />
                                </Row>
                                <Row justify={"start"}>
                                    <Taglabel
                                        text={`₹${item.value}`}
                                        weight={300}
                                        type={"text"}
                                    />
                                </Row>
                            </div>
                        </Col>
                    ))}
            </Row>
        </>
    );
};

export default PaymentCard;
