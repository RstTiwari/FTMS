import React, { useState, useEffect } from 'react';
import { Card, Collapse, Table, Button } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Panel } = Collapse;

const CollapsibleTable = ({ columns, panelHeader, fetchUrl }) => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [loading, setLoading] = useState(false);

  const fetchData = async (params = {}) => {
    setLoading(true);
    const response = await axios.get(fetchUrl, {
      params: {
        ...params,
        page: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
    setData(response.data.items);
    setPagination({
      ...pagination,
      total: response.data.total,
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleFilterClick = () => {
    fetchData({ filter: 'your-filter-criteria' });
  };

  const handlePanelChange = (key) => {
    if (key) {
      fetchData();
    }
  };

  return (
    <Collapse onChange={handlePanelChange}>
      <Panel
        header={
          <div>
            {panelHeader}
            <Button
              icon={<FilterOutlined />}
              onClick={handleFilterClick}
              style={{ marginLeft: '10px' }}
            />
          </div>
        }
        key="1"
      >
        <Table
          columns={[]}
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
