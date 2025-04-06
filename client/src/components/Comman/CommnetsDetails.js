import React, { useState, useEffect } from "react";
import { Timeline } from "antd";
import PageLoader from "pages/PageLoader";
import moment from "moment";
import useInitialFormValues from "Hook/useIntialFormValues";

const CommentDetails = ({ entity, id }) => {
  const [loading, setLoading] = useState(true);
  const { initialValues, isFetching, fetchInitialValues } =
    useInitialFormValues(entity, "fetchComments", id);

  useEffect(() => {
    const fetchData = async () => {
      await fetchInitialValues();
      setLoading(false); // Ensure loading is set to false after fetching
    };

    fetchData();
  }, [fetchInitialValues]);

  if (isFetching || loading) {
    return <PageLoader text="Loading..." isLoading={loading} height="10vh" />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        height: "calc(100vh - 80px)", // Adjust based on your header/footer height
        overflow: "auto",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Timeline mode="left">
          {initialValues
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <Timeline.Item key={comment._id}>
                <div
                  style={{
                    padding: "10px",
                    backgroundColor: "#f9f9f9",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    {comment.text}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#666",
                    }}
                  >
                    {comment?.additionalInfo?.no
                      ? `${comment?.entity} No - ${comment.additionalInfo?.no} `
                      : ""}
                  </div>
                  <div
                    style={{
                      marginTop: "5px",
                      fontSize: "12px",
                      color: "#999",
                    }}
                  >
                    by {comment.userName}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#aaa",
                    }}
                  >
                    {moment(comment.createdAt).format("DD/MM/YYYY h:mm A")}
                  </div>
                </div>
              </Timeline.Item>
            ))}
        </Timeline>
      </div>
    </div>
  );
};

export default CommentDetails;
