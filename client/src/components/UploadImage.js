import React, { useState, useEffect } from "react";
import { Row, Col, Button, Upload, Image } from "antd"; // Correctly import Upload and Image from antd
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import NotificationHandler from "../EventHandler/NotificationHandler"; // Correct the import path
import imageCompression from "browser-image-compression";
import { useAuth } from "../state/AuthProvider"; // Correct the import path

const { Dragger } = Upload; // Destructure Dragger from Upload correctly

const UploadImage = ({
  pageTitle,
  uploadTitle,
  aboutImage,
  preFillValue,
  updateImageInForm,
  imageType,
  listType = "picture-card",
  width = "100px",
  height = "100px",
}) => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(true);
  const [imageUrl, setImageUrl] = useState(preFillValue || "");

  const handleChange = async (info) => {
    const file = info.file.originFileObj;
    if (!file) return;
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      NotificationHandler.info({
        content: "Invalid img type. Only PNG or JPG are allowed.",
        duration: 3,
      });
      return; // Exit early if file is not PNG or JPG
    }

    setLoading(true); // Show loading indicator

    try {
      // Create a bitmap from the uploaded file (image)
      const imageBitmap = await createImageBitmap(file);
      console.log(
        `Original Dimensions: ${imageBitmap.height}x${imageBitmap.width}`
      );

      const canvas = document.createElement("canvas");
      const maxSize = imageType === "product" ? 350 : 200; // Adjust to your desired size
      const ctx = canvas.getContext("2d");

      let width = imageBitmap.width;
      let height = imageBitmap.height;

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

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(imageBitmap, 0, 0, width, height);

      // Convert canvas to blob and set it as the image
      canvas.toBlob((blob) => {
        const resizedImage = new File([blob], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        console.log(resizedImage, "--");

        // Update the image URL with the resized image
        setImageUrl(URL.createObjectURL(resizedImage));

        // Pass the resized image to the parent component or perform further actions
        if (updateImageInForm) {
          updateImageInForm(resizedImage);
        }

        setLoading(false); // Hide loading indicator
      }, file.type);
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

  useEffect(() => {
    if (preFillValue) {
      setImageUrl(preFillValue);
      setEdit(false);
    }
  }, [preFillValue]);

  return (
    <>
      {edit ? (
        <Row justify={"end"}>
          <Dragger
            onChange={handleChange}
            showUploadList={false}
            listType={listType}
            style={{ width: width, height: height }}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: width, maxHeight: height }}
              />
            ) : (
              <Row justify={"end"}>
                <p className="ant-upload-drag-icon">
                  {loading ? <LoadingOutlined /> : <PlusOutlined />}
                </p>
                <p className="ant-upload-text">{uploadTitle}</p>
                <p className="ant-upload-hint">{aboutImage}</p>
              </Row>
            )}
          </Dragger>
        </Row>
      ) : (
        <Row justify="end" align={"middle"}>
          <Image
            alt="organization"
            src={preFillValue}
            style={{ width: width, maxHeight: height }}
          />
          <Button
            style={{
              width: "3rem",
              height: "2rem",
              fontSize: "10px",
              color: "#000000",
              backgroundColor: "transparent",
            }}
            onClick={() => handleEdit()}
          >
            EDIT
          </Button>
        </Row>
      )}
    </>
  );
};

export default UploadImage;
