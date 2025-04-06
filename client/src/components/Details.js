import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useInitialFormValues from "Hook/useIntialFormValues";
import DetailsHeader from "./DetailsHeader";
import PageLoader from "pages/PageLoader";
import DetailsModule from "module/DetailsModule/DetailsModule";
import { fetchTitleName } from "Helper/PageTitle";
import { Row,Col,Button } from "antd";
const Details = ({ entity, id, closeModal }) => {
  const { initialValues, isFetching, fetchInitialValues } =
    useInitialFormValues(entity, "get", id);
  useEffect(() => {
    fetchInitialValues();
  }, [fetchInitialValues, entity, id]);

  if (isFetching) {
    return <PageLoader isLoading={true} text={"Fetching ...."} />;
  }
  return (
    <>
      <Row align={"middle"}>
        <Col span={12}>
          <h3>{`DETAILS OF ${fetchTitleName(entity).toUpperCase()}`}</h3>
        </Col>
        <Col span={12} style={{ textAlign: "right" }}>
          <Button onClick={closeModal}>CLOSE</Button>{" "}
        </Col>
      </Row>
      <DetailsModule
        entity={entity}
        id={id}
        values={initialValues}
        loading={isFetching}
        closeModal={closeModal}
      />
    </>
  );
};
export default Details;
