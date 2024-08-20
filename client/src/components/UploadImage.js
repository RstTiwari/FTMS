import React, { useState, useEffect } from "react";
import { Row, Col, Button, Upload } from "antd";
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
    imageType,
}) => {
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const [imageUrl, setImageUrl] = useState(preFillValue || "");

    const handleChange = async (info) => {
        const file = info.file.originFileObj;
        if (!file) return;
    
        setLoading(true); // Show loading indicator
    
        try {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                console.log("e",e)
    
                img.onload = () => {
                    console.log(`Original Dimensions: ${img.height}x${img.width}`);
    
                    const canvas = document.createElement("canvas");
                    const maxSize = imageType === "product" ? 350 : 200; // Adjust to your desired size
                    const ctx = canvas.getContext("2d");
    
                    let width = img.width;
                    let height = img.height;
    
                    // Resize logic
                    if (width > height) {
                        if (width > maxSize) {
                            height = (height * maxSize) / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = (width * maxSize) / height;
                            height = maxSize;
                        }
                    }
    
                    console.log(`Resized Dimensions: ${height}x${width}`);
    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
    
                    // Convert canvas to blob and set it as the image
                    canvas.toBlob((blob) => {
                        const resizedImage = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now(),
                        });
    
                        // Update the image URL with the resized image
                        setImageUrl(URL.createObjectURL(resizedImage));
    
                        // Pass the resized image to the parent component or perform further actions
                        if (updateImageInForm) {
                            updateImageInForm(resizedImage);
                        }
    
                        setLoading(false); // Hide loading indicator
                    }, file.type);
                };
            };
    
            reader.readAsDataURL(file);
        } catch (error) {
            console.error("Error resizing the image:", error);
            NotificationHandler.error("Failed to resize image");
            setLoading(false); // Hide loading indicator
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
            setEdit(false)
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
                    <Dragger onChange={handleChange} showUploadList={false} listType="picture-circle" >
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
                    <img
                        
                        src={preFillValue}
                        style={{ width: "100%", maxHeight: "200px" }}
                    />
                </Row>
            )}
        </>
    );
};

export default UploadImage;
