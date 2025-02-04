import React, { useEffect, useState } from "react";
import { Select, Button, Divider, Modal, Input, Row, Space } from "antd";
import { productCategory } from "../../Data/ProductData";
const ProductType = ({ width = "15vw", updateInForm, preFillValue ,options}) => {
    const [value, setValue] = useState(preFillValue);

    useEffect(() => {
        if (preFillValue) {
            setValue(preFillValue);
        }
    }, [preFillValue]);

    const handleChange = (value) => {
        setValue(value);
        updateInForm(value);
    };
    return (
      <>
        <Select
          value={value ? value : ""}
          options={options}
          onChange={handleChange}
          style={{ width: width }}
          getPopupContainer={(trigger) => document.body}
          dropdownStyle={{ position: "fixed", zIndex: 20000000 }}
          dropdownRender={(menu) => {
            return (
              <>
                <div
                  style={{
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                >
                  {menu}
                </div>
                <Divider
                  style={{
                    margin: "8px 0",
                  }}
                />
                <Space
                  style={{
                    padding: "0 8px 4px",
                  }}
                ></Space>
              </>
            );
          }}
        />
      </>
    );
};

export default ProductType;
