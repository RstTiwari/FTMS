import React, { useState, useEffect } from "react";
import { Card, Collapse, Table, Button, Col,Row } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import axios from "axios";
import Taglabel from "./Taglabel";

const { Panel } = Collapse;

const CollapsibleTable = ({ columns, panelHeader}) => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
    const [loading, setLoading] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    
    
    // const fetchData = async (params = {}) => {
    //   setLoading(true);
    //   const response = await axios.get(fetchUrl, {
    //     params: {
    //       ...params,
    //       page: pagination.current,
    //       pageSize: pagination.pageSize,
    //     },
    //   });
    //   setData(response.data.items);
    //   setPagination({
    //     ...pagination,
    //     total: response.data.total,
    //   });
    //   setLoading(false);
    // };

    useEffect(() => {
        // fetchData();
    }, [pagination.current]);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleFilterClick = () => {
        // fetchData({ filter: 'your-filter-criteria' });
    };

    const onPanelChange = (key) => {
      handlePanelChange(key);
      setIsPanelOpen(key.length > 0); // Check if panel is open
    };

    const handlePanelChange = (key) => {
        if (key) {
            // fetchData();
        }
    };

    return (
      <Collapse onChange={onPanelChange}>
      <Panel
        header={
          <Row align="middle">
            <Col flex="auto">
              <Taglabel text={panelHeader} type="text" weight={800} />
            </Col>
            <Col>
              {isPanelOpen && (
                <Button
                  icon={<FilterOutlined />}
                  onClick={handleFilterClick}
                  style={{ marginLeft: '10px' }}
                />
              )}
            </Col>
          </Row>
        }
        key="1"
      >
        <Table
          columns={columns}
          dataSource={[]}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </Panel>
    </Collapse>
    );
};

export default CollapsibleTable;
