import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import CustomModal from "../../components/CustomProductSelect"
import FormItemCol from "components/Comman/FormItemCol";
import CustomFormTableList from "./CustomFormTableList";
import PaymentLayoutComponent from "./PaymentLayoutComponent";
import useInitialFormValues from "Hook/useIntialFormValues";
import { Row, Col, Checkbox, Form, Button, InputNumber, Select } from "antd";
import NotesForm from "./NoteForm";
import Taglabel from "components/Comman/Taglabel";
import AddressDetails from "components/Comman/AddressDetails";
import DeliveryAddressDropdown from "components/Comman/DeliveryAdress";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";


const DeliveryChallan = ({ form, isUpdate, entity }) => {
  const isLaptop = useMediaQuery("(min-width:1000px)");
  const [isCustomerChecked, setIsCustomerChecked] = useState(false);
  const [isVendorChecked, setIsVendorChecked] = useState(false);

  const [delivery, setDelivery] = useState("");
  const { tenantId, id } = useParams();
  const { initialValues, isFetching, fetchInitialValues } =
    useInitialFormValues("tenant", "get", tenantId);

  const updateDeliveryAddress = (values) => {
    form.setFieldsValue({
      delivery: {
        type: values?.type,
        to: values?.to,
        address: values?.address,
      },
    });
  };

  const handleCheckboxChange = async (type) => {
    if (type === "customer") {
      form.setFieldsValue({ delivery: "" });
      setIsVendorChecked(false);
      setIsCustomerChecked(true);
    } else if (type === "vendor") {
      form.setFieldsValue({ delivery: "" });
      setIsCustomerChecked(false);
      setIsVendorChecked(true);
    }
  };

  const handleItemsUpdate = (value, filedName, rowName) => {
    const items = form.getFieldValue("items");
    let temObj = items[rowName];
    if (filedName === "description") {
      let { description, rate, hsnCode } = value;
      temObj.description = description;
      temObj.rate = Math.ceil(rate);
      temObj.finalAmount = Math.ceil(temObj.qty * Number(rate));
    } else if (filedName === "rate") {
      temObj.rate = value;
      temObj.finalAmount = Number(Math.ceil(temObj.qty * value));
    } else if (filedName === "qty") {
      temObj.qty = value;
      temObj.finalAmount = Number(Math.ceil(temObj.qty * temObj.rate));
    } else if (filedName === "customer") {
      form.setFieldsValue({ customer: value });
    } else if (filedName === "no") {
      form.setFieldsValue({ no: value });
    } else if (filedName === "challanDate") {
      form.setFieldsValue({ challanDate: value });
    } else if (filedName === "transportAmount") {
      form.setFieldsValue({ transportAmount: value });
    } else if (filedName === "gstPercent") {
      temObj.gstPercent = value;
    } else if (filedName === "challanType") {
      form.setFieldsValue({ challanType: value });
    }

    items[rowName] = temObj;
    form.setFieldsValue({ items: items });


  
  };

  useEffect(() => {
    let delivery = form.getFieldValue("delivery");
    if (delivery) {
      delivery?.type === "customer"
        ? setIsCustomerChecked(true)
        : setIsVendorChecked(true);
      setDelivery({
        ...delivery,
        to: delivery?.to,
        address: delivery?.address,
      });
    }
  }, []);

  useEffect(() => { }, []);
  return (
    <div>
      <FormItemCol
        name={"prefix"}
        labelAlign="left"
        required={true}
        hidden={true}
      />

      <FormItemCol
        label={"#Delivery Challan"}
        name={"no"}
        labelAlign="left"
        required={true}
        labelCol={{ span: 8 }}
        type={"counters"}
        rules={[
          {
            required: "true",
            message: "Please Provide Challan No",
          },
        ]}
        entity={entity}
        updateInForm={(value) => handleItemsUpdate(value, "no")}
        preFillValue={form.getFieldValue("no")}
        parentForm={form}
        width={"30vw"}
      />
      <FormItemCol name={"suffix"} required={true} hidden={true} />
      <FormItemCol
        label={"Challan Date"}
        name={"challanDate"}
        required={true}
        rules={[
          {
            required: true,
            message: "Please Select Challan Date",
          },
        ]}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"date"}
        width={"30vw"}
        preFillValue={form.getFieldValue("challanDate")}
        updateInForm={(value) => handleItemsUpdate(value, "challanDate")}
      />
      <FormItemCol
        label={"Challan Type"}
        name={"challanType"}
        required={true}
        rules={[
          {
            required: true,
            message: "Please Select Challan Type",
          },
        ]}
        labelCol={{ span: 8 }}
        width={"30vw"}
        labelAlign="left"
        type={"select"}
        entity={"Challan Type"}
        entityName={"challanType"}
        updateInForm={(value) => handleItemsUpdate(value, "challanType")}
        preFillValue={form.getFieldValue("challanType")}
      />

      <FormItemCol
        label={"Vehicle No"}
        name={"vehicleNo"}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"input"}
        width={"30vw"}
      />
      <FormItemCol
        label={"Contact No"}
        name={"contactNo"}
        labelCol={{ span: 8 }}
        labelAlign="left"
        type={"input"}
        width={"30vw"}
      />
      <div>
        <Row>
          <Col
            xs={24}
            sm={24}
            md={{ span: 12 }}
            lg={{ span: 12 }}
            xl={{ span: 12 }}
          >
            <Form.Item
              label={
                <Taglabel
                  text={"Delivery Address"}
                  type={"forFormField"}
                />
              }
              labelCol={{ span: 8 }}
              labelAlign="left"
              name={"delivery"}
              required={true}
              rules={[
                {
                  required: true,
                  message: "Delivery To Required",
                },
              ]}
            >
              <DeliveryAddressDropdown />
            </Form.Item>
          </Col>
        </Row>

      </div>

      <Row
        justify={"center"}
        style={{
          marginBottom: "10px",
          top: 0,
          background: "#fff",
          zIndex: 1,
        }}
      >
        <Taglabel text={"ITEM TABLE"} weight={1000} />
      </Row>
      <div
        style={{
          position: "relative",
          border: "2px solid #bfbfbb",
          marginBottom: "20px",
          zIndex: 10,
          margin: "20px",
          overflow: "auto",
        }}
      >
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            paddingBottom: "10px",
            minWidth: 1200,
          }}
        >
          <Row
            style={{
              position: "sticky",
              top: "30px",
              background: "#fff",
              border: "1px solid #bfbfbb",
              zIndex: 1,
            }}
          >

            <Col
              className="gutter-row"
              span={8}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"ITEM DESCRIPTION"} weight={700} />
            </Col>
            <Col
              className="gutter-row"
              span={5}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"HSN CODE"} />
            </Col>
            <Col
              className="gutter-row"
              span={5}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"UNIT"} />
            </Col>
            <Col
              className="gutter-row"
              span={5}
              style={{
                borderRight: "1px solid #bfbfbb",
                textAlign: "center",
                minWidth: "200px",
              }}
            >
              <Taglabel text={"QTY"} />
            </Col>

          </Row>
        </div>

        <Form.List
          name={"items"}
          initialValue={[
            {
              product: {
                code: "",
                name: "",
              },
              qty: 1,
            },
          ]}
        >
          {(subFields, subOpt) => (
            <div>
              <div
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  minHeight: "10vh",
                  maxHeight: "70vh",
                  minWidth: 1200,
                }}
              >
                {subFields.map(({ key, name, ...restField }) => (
                  <Row
                    key={key}
                    align={"middle"}
                    style={{ marginTop: "5px" }}
                  >

                    <Col
                      className="gutter-row"
                      span={8}
                      style={{
                        textAlign: "center",
                        minWidth: "300px",
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "description"]}
                      >
                        <CustomModal
                          entity={"products"}
                          fieldName={"name"}
                          updateInForm={(value) =>
                            handleItemsUpdate(
                              value,
                              "description",
                              name
                            )
                          }
                          preFillValue={
                            form.getFieldValue(
                              "items"
                            )?.[name]?.description
                          }
                          width={"100%"}
                          form={form}
                          row={name}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "hsnCode"]}
                      >
                        <InputNumber
                          onChange={(value) =>
                            handleItemsUpdate(
                              value,
                              "hsnCode",
                              name
                            )
                          }
                          controls={false}
                          min={0}
                          style={{
                            textAlign: "center",
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "unit"]}
                      >
                        <Select
                           options={[
                            {label:"Box",value:"Box"},
                            {label:"Kg",value:"Kg"},
                            {label:"Nos",value:"Nos"},
                            {label:"Mtr",value:"Mtr"},
                            {label:"Unit",value:"Unit"}
                           ]}
                          onChange={(value) =>
                            handleItemsUpdate(
                              value,
                              "unit",
                              name
                            )
                          }
                          controls={false}
                          min={0}
                          style={{
                            textAlign: "center",
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={5}>
                      <Form.Item
                        {...restField}
                        name={[name, "qty"]}
                      >
                        <InputNumber
                          onChange={(value) =>
                            handleItemsUpdate(
                              value,
                              "qty",
                              name
                            )
                          }
                          controls={false}
                          min={0}
                          style={{
                            textAlign: "center",
                            width: "100%",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      span={1}
                      style={{ textAlign: "center" }}
                    >
                      <Form.Item>
                        <DeleteOutlined
                          style={{
                            color: "red",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            subOpt.remove(name);
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                ))}
              </div>

              {/* Button to add new item */}
              <Row justify="start">
                <Button
                  type="link"
                  style={{
                    color: "#22b378",
                  }}
                  onClick={() => {
                    subOpt.add({
                      description: "",
                      qty: 1,
                      hsnCode: "",
                      rate: 0,
                      discountPercent: 0,
                      gstPercent: 0,
                    });
                  }}
                  details={true}
                  withIcon={true}
                >
                  ADD NEW ROW
                </Button>
              </Row>
            </div>
          )}
        </Form.List>

      </div>
      <NotesForm form={form} width="50vw" />

    </div>
  );
};

export default DeliveryChallan;
