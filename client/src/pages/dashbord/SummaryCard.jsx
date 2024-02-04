import { Meta } from 'antd/es/list/Item';
import React from 'react'
import { Tag, Divider, Row, Col, Spin, Tooltip,Card } from 'antd';

const SummaryCard = ({title,cardContent,tagColor,prefix ,isLoading}) => {
    const {Meta} = Card
  return (
      <Col
          className="gutter-row"
          xs={{ span: 24 }}
          sm={{ span: 12 }}
          md={{ span: 12 }}
          lg={{ span: 6 }}
      >
          <div
              className="whiteBox shadow"
              style={{
                  fontSize: 13,
                  minHeight: "106px",
                  height: "100%",
                  padding:"10px",
                  borderRadius:"10px",
                  backgroundColor:"white"
              }}
          >
              <div
                  className="pad15 strong"
                  style={{ textAlign: "center", justifyContent: "center" }}
              >
                  <h3
                      style={{
                          color: "blue",
                          fontSize: "large",
                          margin: "5px 0",
                          textTransform: "capitalize",
                      }}
                  >
                      {title}
                  </h3>
              </div>
              <Divider style={{ padding: 0, margin: 0 }}></Divider>
              <div >
                  <Row gutter={[0, 0]} justify="space-between" wrap={false}>
                      <Col
                          className="gutter-row"
                          flex="85px"
                          style={{ textAlign: "left" }}
                          fontSize= {"1rem"}
                      >
                          <div
                              className="left"
                              style={{ whiteSpace: "nowrap",fontSize:"1rem" ,color:"#000"}}
                          >
                              {prefix}
                          </div>
                      </Col>
                      <Divider
                          style={{
                              height: "100%",
                              padding: "10px 0",
                              justifyContent: "center",
                              alignItems: "center",
                          }}
                          type="vertical"
                      ></Divider>
                      <Col
                          className="gutter-row"
                          flex="auto"
                          style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize:"2rem"
                          }}
                      >
                          {isLoading ? (
                              <Spin />
                          ) : (
                              <Tooltip title={cardContent}>
                                  <Tag
                                      color={tagColor}
                                      style={{
                                          margin: "0 auto",
                                          justifyContent: "center",
                                          overflow: "hidden",
                                          whiteSpace: "nowrap",
                                          textOverflow: "ellipsis",
                                          fontSize:"1.5rem"
                                      }}
                                  >
                                      {cardContent
                                          ? cardContent
                                          : { amount: 0 }}
                                  </Tag>
                              </Tooltip>
                          )}
                      </Col>
                  </Row>
              </div>
          </div>
      </Col>
  );
}

export default SummaryCard
