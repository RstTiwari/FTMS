import React from "react";
import Myfac8ryTemplate from "./Myfac8ryDefault/Index";
import VipPlayTemplate from "./VipPlayTemplate/Index";
import TestingPdf from "./TestingPdf";

const PdfSelector = ({ entity, data }) => {
  // Destructure the templateId from the incoming data prop
  const { templateId } = data;

  // Render the appropriate document based on templateId
  const renderDocument = (entity,data) => {
    switch (templateId) {
      case "myfac8ry":
        return <Myfac8ryTemplate entity={entity} data={data} />;
      // Add more cases for different document types
       case "vipplay":
        return <VipPlayTemplate entity={entity} data={data} />;
      // Add more cases for different document types
      default:
        return <div>Document template not found</div>;
    }
  };

  return <>{renderDocument(entity,data)}</>;
};

export default PdfSelector;
