import React, { useState, useEffect } from "react";
import { Row, Col, Button, Upload, Image } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import NotificationHandler from "../EventHandler/NotificationHandler"; // Update the path as necessary
import imageCompression from "browser-image-compression";
import { useAuth } from "../state/AuthProvider"; // Update the path as necessary

const { Dragger } = Upload;

const UploadImage = ({
    pageTitle,
    uploadTitle,
    aboutImage,
    preFillValue,
    updateImageInForm,
}) => {
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const [imageUrl, setImageUrl] = useState(preFillValue || "");
    const [file, setFile] = useState(null);

    const handleChange = async (info) => {
        const file = info.file.originFileObj;

        if (!file) return;

        // Set options for image compression
        const options = {
            maxWidthOrHeight: 200,
            useWebWorker: true,
        };

        try {
            // Resize the image
            const resizedFile = await imageCompression(file, options);
            setFile(resizedFile);

            const reader = new FileReader();
            reader.readAsDataURL(resizedFile);
            reader.onload = () => setImageUrl(reader.result);

            if (updateImageInForm) {
                updateImageInForm(resizedFile);
            }
        } catch (error) {
            console.error("Error resizing the image:", error);
            NotificationHandler.error("Failed to resize image");
        }
    };
    const handleEdit = () => {
        setImageUrl(null);
        setEdit(true);
    };

    // const uploadImage = async () => {
    //     if (!file) {
    //         return NotificationHandler.error("Please Select an Image to Upload");
    //     }
    //     setLoading(true);
    //     try {
    //         const formData = new FormData();
    //         formData.append("file", file);
    //         const { success, result, message } = await "" //useAuth().uploadFile(formData); // assuming useAuth has uploadFile method
    //         if (!success) {
    //             return NotificationHandler.error(message);
    //         } else {
    //             setImageUrl(result);
    //             onUploadSuccess(result);
    //             setLoading(false);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         return NotificationHandler.error("Upload failed");
    //     }
    // };
    useEffect(() => {
        if (preFillValue) {
            setImageUrl(preFillValue);
        }
    }, [preFillValue]);

    return (
        <>
            <Row justify="end" align="middle">
                <Col span={8}>
                    <h4>{pageTitle}</h4>
                </Col>
                <Col span={8}>
                    {!edit && (
                        <Button
                            style={{
                                width: "3rem",
                                height: "2rem",
                                fontSize: "10px",
                                color: "#ffffff",
                                background: "green",
                            }}
                            onClick={() => handleEdit()}
                        >
                            EDIT
                        </Button>
                    )}
                </Col>
            </Row>
            {edit ? (
                <>
                    <Dragger onChange={handleChange} showUploadList={false}>
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Preview"
                                style={{ width: "100%", maxHeight: "200px" }}
                            />
                        ) : (
                            <>
                                <p className="ant-upload-drag-icon">
                                    {loading ? (
                                        <LoadingOutlined />
                                    ) : (
                                        <PlusOutlined />
                                    )}
                                </p>
                                <p className="ant-upload-text">{uploadTitle}</p>
                                <p className="ant-upload-hint">{aboutImage}</p>
                            </>
                        )}
                    </Dragger>
                </>
            ) : (
                <Row justify="center">
                    <Image
                        src={preFillValue}
                        style={{ width: "100%", maxHeight: "200px" }}
                    />
                </Row>
            )}
        </>
    );
};

export default UploadImage;
