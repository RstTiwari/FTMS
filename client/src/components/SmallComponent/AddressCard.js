import React from 'react';
import { Card, Collapse } from 'antd';
import Taglabel from './Taglabel';

const { Panel } = Collapse;

const AddressCard = ({ billingAddress, shippingAddress }) => (
    <Card title={<Taglabel text={"ADDRESS"} />} style={{ marginTop: "16px" }}>
        <Collapse>
            <Panel header={<Taglabel text={"Billing"} type={"text"} />} key="1">
                <p>
                    {<Taglabel text={"Street 1"} />}:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.street1}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    {<Taglabel text={"Street 2"} />}:{" "}
                    {
                        <Taglabel
                            text={`${billingAddress?.street2}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    {<Taglabel text={"City"} />}:{" "}
                    {
                        <Taglabel
                            text={`${billingAddress?.city}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    <Taglabel text={"State"} />:{" "}
                    {
                        <Taglabel
                            text={`${billingAddress?.state}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    <Taglabel text={"Pincode"} />:{" "}
                    {
                        <Taglabel
                            text={`${billingAddress?.pincode}`}
                            type={"text"}
                        />
                    }
                </p>
            </Panel>

            <Panel
                header={<Taglabel text={"Shipping"} type={"text"} />}
                key="2"
            >
                <p>
                    {<Taglabel text={"Street 1"} />}:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.street1}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    {<Taglabel text={"Street 2"} />}:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.street2}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    {<Taglabel text={"City"} />}:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.city}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    <Taglabel text={"State"} />:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.state}`}
                            type={"text"}
                        />
                    }
                </p>
                <p>
                    <Taglabel text={"Pincode"} />:{" "}
                    {
                        <Taglabel
                            text={`${shippingAddress?.pincode}`}
                            type={"text"}
                        />
                    }
                </p>
            </Panel>
        </Collapse>
    </Card>
);

export default AddressCard;
