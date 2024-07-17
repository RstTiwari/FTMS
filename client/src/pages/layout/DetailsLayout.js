import { Row,Col } from 'antd'
import React, { useState } from 'react'
import { useParams,useNavigate, Outlet } from 'react-router-dom'


import CoustomListPage from 'components/CustomList'

const DetailsLayout = () => {
  const { tenantId,entity,id,pageNo ,pageSize } = useParams()
  const [details,setDetails] = useState(false)
  const navigate = useNavigate()
  
  const onTableChange = (pagination, filter, sorter) => {
      const { current: pageNo, pageSize } = pagination;
      navigate(`/app/${tenantId}/${entity}/${pageNo}/${pageSize}`);
  };

    // Handle row click to open new route
    const handleRowClick = (record) => {
      setDetails(true)
      navigate(`/app/${tenantId}/${entity}/${record._id}`);
  };
  
  
  return (
      <Row>
          <Col
              xs={24}
              sm={24}
              md={details ? 6 : 24}
              lg={details ? 6 : 24}
              xl={details ? 6 : 24}
          >
              <CoustomListPage
                  onTableChange={onTableChange}
                  onRowClick={handleRowClick}
              />
          </Col>
          {details && (
              <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                  <Outlet />
              </Col>
          )}
      </Row>
  );
}

export default DetailsLayout
