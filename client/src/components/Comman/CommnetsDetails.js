import React, { useState, useEffect } from "react";
import { Spin, Timeline } from "antd";
import PageLoader from "pages/PageLoader";

const CommentDetails = ({ apiUrl }) => {
    const [comments, setComments] = useState([
        {
            id: 1,
            entityType: "Customer",
            entityId: "12344555",
            text: "Customer Added",
            date: "2024-07-19T10:45:45.194+00:00",
            author: "Rohit",
        },
        {
            id: 2,
            entityType: "Customer",
            entityId: "12344555",
            text: "Customer Added",
            date: "2024-07-19T10:45:45.194+00:00",
            author: "Rohit",
        },
        {
            id: 3,
            entityType: "Customer",
            entityId: "12344555",
            text: "Customer Added",
            date: "2024-07-19T10:45:45.194+00:00",
            author: "Rohit",
        },
    ]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(apiUrl);
                const result = await response.json();
                setComments(result);
            } catch (error) {
                console.error("Error fetching comments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [apiUrl]);

    if (loading) {
        return (
            <PageLoader text="Loading..." isLoading={loading} height="10vh" />
        );
    }

    return (
        <div>
            <Timeline mode="alternate">
                {comments
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((comment) => (
                        <Timeline.Item key={comment.id}>
                            <div>
                                <strong>{comment.author}</strong> (
                                {new Date(comment.date).toLocaleString()})
                            </div>
                            <div>{comment.text}</div>
                            <div>Entity: {comment.entityType}</div>
                            <div>Entity ID: {comment.entityId}</div>
                        </Timeline.Item>
                    ))}
            </Timeline>
        </div>
    );
};

export default CommentDetails;
