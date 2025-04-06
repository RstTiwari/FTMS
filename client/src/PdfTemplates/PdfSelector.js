import React from "react";
import MyDocument from "./Myfac8ryDefault/MyDocument";

const PdfSelector = ({ entity, data }) => {
  // Destructure the templateId from the incoming data prop
  const { templateId } = data;

  // Render the appropriate document based on templateId
  const renderDocument = (entity,data) => {
    switch (templateId) {
      case "myfac8ry":
        return <MyDocument entity={entity} data={data} />;
      // Add more cases for different document types
      default:
        return <div>Document template not found</div>;
    }
  };

  return <>{renderDocument(entity,data)}</>;
};

export default PdfSelector;
