import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Upload, Image } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import NotificationHandler from '../EventHandler/NotificationHandler'; // Update the path as necessary
import { useAuth } from '../state/AuthProvider'; // Update the path as necessary

const { Dragger } = Upload;

const UploadImage = ({
    pageTitle,
    uploadTitle,
    aboutImage,
    url,
    updateImageInForm
}) => {
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const [imageUrl, setImageUrl] = useState(url || "");
    const [file, setFile] = useState(null);

    const handleChange = async (info) => {
        const file = info.file.originFileObj;
        setFile(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => setImageUrl(reader.result);

        if (updateImageInForm) {
            updateImageInForm(file);
        }
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
        if (url && url !== "") {
            setEdit(false);
        }
    }, [url]);

    return (
        <>
            <Row justify="end" align="middle">
                <Col span={8}>
                    <h4>{pageTitle}</h4>
                </Col>
                <Col span={8}>
                    {!edit && (
                        <Button
                            style={{ width: "5rem" }}
                            onClick={() => setEdit(true)}
                        >
                            Change
                        </Button>
                    )}
                </Col>
            </Row>
            {edit ? (
                <>
                    <Dragger onChange={handleChange} showUploadList={false}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Preview" style={{ width: "100%", maxHeight: "200px" }} />
                        ) : (
                            <>
                                <p className="ant-upload-drag-icon">
                                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                                </p>
                                <p className="ant-upload-text">{uploadTitle}</p>
                                <p className="ant-upload-hint">{aboutImage}</p>
                            </>
                        )}
                    </Dragger>
                </>
            ) : (
                <Row justify="center">
                    <Image src={url} style={{ width: "100%", maxHeight: "200px" }} />
                </Row>
            )}
        </>
    );
};

export default UploadImage;
