import React, { useState } from "react";
import { Col, Row, Button, Divider } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import CoustomButton from "./Comman/CoustomButton";
import { fetchTitleName } from "Helper/PageTitle";
import CustomDialog from "./CustomDialog";
import CustomForm from "./CreateCustomForm";

const HeaderComponent = ({ onlyTitle = false, title, details }) => {
  const { tenantId, entity } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handelAddNewClick = () => {
    setShow(true);
  };
  return (
    <>
      {!onlyTitle ? (
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 5px 0px 5px",
          }}
        >
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              color: "black",
              fontSize: details ? "12px" : "1.2rem",
              color: "#22b378",
            }}
          >
            LIST OF {fetchTitleName(entity)?.toUpperCase()}
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              textAlign: "right",
              fontSize: details ? "0.55rem" : "1rem",
              right: 20,
            }}
          >
            <CoustomButton
              onClick={handelAddNewClick}
              text={"New"}
              withIcon={true}
              details={details}
            />
          </Col>
        </Row>
      ) : (
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            style={{
              fontSize: details ? "0.9rem" : "1.5rem",
              color: "#22b378",
              marginRight: 5,
            }}
          >
            {title}
          </Col>
        </Row>
      )}
      <CustomDialog
        show={show}
        setShow={setShow}
        children={
          <CustomForm
            entityOfModal={entity}
            closeModal={() => setShow(!show)}
            isUpdate={false}
          />
        }
      />
    </>
  );
};

export default HeaderComponent;
