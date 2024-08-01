import React from 'react';
import { Collapse } from 'antd';
import Taglabel from './Taglabel'; // Adjust the import based on your actual file structure

const { Panel } = Collapse;

const AddressCard = ({ billingAddress, shippingAddress }) => (
  <Collapse defaultActiveKey={['1']} style={{ marginTop: '16px' }}>
    <Panel header={<Taglabel text="ADDRESS" />} key="1">
      <Collapse>
          <p>
            <Taglabel text="Street 1" />: <Taglabel text={`${billingAddress?.street1}`} type="text" />
          </p>
          <p>
            <Taglabel text="Street 2" />: <Taglabel text={`${billingAddress?.street2}`} type="text" />
          </p>
          <p>
            <Taglabel text="City" />: <Taglabel text={`${billingAddress?.city}`} type="text" />
          </p>
          <p>
            <Taglabel text="State" />: <Taglabel text={`${billingAddress?.state}`} type="text" />
          </p>
          <p>
            <Taglabel text="Pincode" />: <Taglabel text={`${billingAddress?.pincode}`} type="text" />
          </p>

          <p>
            <Taglabel text="Street 1" />: <Taglabel text={`${shippingAddress?.street1}`} type="text" />
          </p>
          <p>
            <Taglabel text="Street 2" />: <Taglabel text={`${shippingAddress?.street2}`} type="text" />
          </p>
          <p>
            <Taglabel text="City" />: <Taglabel text={`${shippingAddress?.city}`} type="text" />
          </p>
          <p>
            <Taglabel text="State" />: <Taglabel text={`${shippingAddress?.state}`} type="text" />
          </p>
          <p>
            <Taglabel text="Pincode" />: <Taglabel text={`${shippingAddress?.pincode}`} type="text" />
          </p>
      </Collapse>
    </Panel>
  </Collapse>
);

export default AddressCard;
