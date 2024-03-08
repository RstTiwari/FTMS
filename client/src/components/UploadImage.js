import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, Image, Row, Button, Col } from "antd";
import { useAuth } from "state/AuthProvider";
import NotificationHandler from "EventHandler/NotificationHandler";
const { Dragger } = Upload;

const UploadImage = ({
    pageTitle,
    uploadTitle,
    aboutImage,
    onUploadSuccess,
    logo,
}) => {
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const [imageUrl, setImageUrl] = useState("");
    const [file,setFile] = useState("")
    const { uploadFile } = useAuth();

    const handleChange = async (info) => {
        setFile(info.file.originFileObj);
    };

    const uploadImage = async () => {
      if(!file){
       return NotificationHandler.error("Please Select an Image to Upload")
      }
        try {
            const formData = new FormData();
            formData.append("file", file);
            const { success, result, message } = await uploadFile(formData);
            if (!success) {
                return NotificationHandler.error(message);
            } else {
                setImageUrl(result);
                onUploadSuccess(result);
            }
        } catch (error) {
            console.error(error);
            return NotificationHandler.error(message);
        }
    };
    /**
     * Changin edit status bas
     */
   useEffect(() => {
       if (logo && logo !== "") {
           setEdit(false);
       }
   }, []);
    return (
        <>
            <Row justify={"end"} align={"middle"}>
                <Col span={8}>
                    <h4>{pageTitle}</h4>
                </Col>
                <Col span={8}>
                    {!edit ? (
                        <Button
                            style={{ width: "5rem" }}
                            onClick={() => (!edit ? setEdit(!edit) : "")}
                        >
                            EDIT
                        </Button>
                    ) : (
                        ""
                    )}
                </Col>
            </Row>
            {edit ? (
                <>
                    <Dragger onChange={(info) => handleChange(info)}>
                        <h2>{uploadTitle}</h2>
                        {imageUrl ? (
                            <img
                                src={`${imageUrl}`}
                                style={{ width: "5rem" }}
                            />
                        ) : (
                            ""
                        )}
                        <p className="ant-upload-drag-icon">
                            {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        </p>
                        <p className="ant-upload-text">
                            Click to this area to upload
                        </p>
                        <p className="ant-upload-hint">{aboutImage}</p>
                    </Dragger>
                    <Row justify={"center"}>
                        <Button type="primary" onClick={()=>uploadImage()}>UPLOAD</Button>
                    </Row>
                </>
            ) : (
                <>
                    <Row justify={"center"}>
                        <Image src={logo} style={{ width: "5rem" }} />
                    </Row>
                </>
            )}
        </>
    );
};
export default UploadImage;
