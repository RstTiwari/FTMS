import React from "react";
import { Select } from "antd";
import { taxPercent } from "../../Data/PaymentReceivedData";

const TaxPercent = ({
  entity,
  entityName,
  width = "100%",
  updateInForm,
  preFillValue = "", // default empty string
}) => {

  // Handle change and pass selected option to parent
  const handleChange = (value, option) => {
    updateInForm(value, option); // parent gets both value and selected option
  };

  return (
    <Select
      value={preFillValue || ""} // fully controlled by parent
      options={taxPercent}       // your options array
      onChange={handleChange}
      style={{ width }}
      getPopupContainer={() => document.body}
      dropdownStyle={{ position: "fixed", zIndex: 20000000 }}
      placeholder="Select Tax Percent"
    />
  );
};

export default TaxPercent;
