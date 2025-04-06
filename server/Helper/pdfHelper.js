import axios from "axios";
import fs from "fs";
import path from "path";
import sharp from "sharp";

const pageWidth = 595; // Assuming A4 paper width
const maxWidth = pageWidth * 0.8; // 80% of the page width
const estimatedCharacterWidth = 10;

export const calculateHeaderPosition = (companyName, doc) => {
    let headerText = companyName.replace(/\s+/g, " ").toUpperCase();
    const orgnizationWidth = companyName.length * estimatedCharacterWidth;
    let headerFontSize = calculateFontSize(
        headerText,
        maxWidth,
        estimatedCharacterWidth
    );
    const adjustedCharacterWidth =
        (estimatedCharacterWidth * headerFontSize) / 12;
    const orgnizationAdjustedWidth = headerText.length * adjustedCharacterWidth;
    let headerX = pageWidth / 2 - headerText.length / 2;

    return { headerText, headerX, headerFontSize };
};

const calculateFontSize = (companyName, maxWidth, estimatedCharacterWidth) => {
    let textWithoutSpace = companyName.replace(/\s+/g, ""); // Remove white space
    let fontSize = 12; // Starting font size
    let textWidth = textWithoutSpace.length * estimatedCharacterWidth;

    while (textWidth > maxWidth && fontSize > 1) {
        fontSize--;
        textWidth =
            companyName.length * ((estimatedCharacterWidth * fontSize) / 12);
    }

    return fontSize;
};

export const calculateStreetPostion = (street) => {
    const startPostion = 267.5; // Assuming A4 paper width
    let orgnizationStreet = street.replace(/\s+/g, " ").toUpperCase();
    const streetPostion = startPostion - 2 * street.length;
    return { streetPostion, orgnizationStreet };
};

export const downloadAndSaveImage = async (url, fileName) => {
    try {
        const folder = "upload";
        const response = await axios.get(url, { responseType: "arraybuffer" });
        const imageName = `${fileName}.png`; // Assuming the image is a PNG
        const imagePath = path.join(folder, imageName);
        fs.writeFileSync(imagePath, response.data);
        return imagePath;
    } catch (error) {
        console.error("Error downloading or saving the image:", error);
        return null;
    }
};

export const downloadImage = async (url) => {
    try {
        const response = await axios.get(url, { responseType: "arraybuffer" });

        // Check if response is valid
        if (response.status !== 200) {
            throw new Error(`Failed to download image: ${response.status}`);
        }

        const imageBuffer = Buffer.from(response.data, "binary");

        // Convert image to PNG format
        const pngBuffer = await sharp(imageBuffer).png().toBuffer();
        return pngBuffer;
    } catch (error) {
        console.error(
            "Error downloading or converting the image:",
            error.message
        );
        if (error.response) {
            console.error("Response status:", error.response.status);
            console.error("Response data:", error.response.data);
        }
        return null;
    }
};

export const addBankDetails = (doc, orgnization) => {
    //here bank Details Can be Come
    doc.font("Helvetica-Bold")
        .fontSize(12)
        .fill("#000")
        .text("COMPANY AND BANK DETAILS", 20, doc.y + 50);
    doc.fontSize(10);
    doc.text(`BANK NAME: ${orgnization.bankDetails.bankName}`, 20, doc.y + 10);
    doc.text(`BANK BRANCH: ${orgnization.bankDetails.branch}`, 20, doc.y + 10);
    doc.text(
        `ACCOUNT NO: ${orgnization.bankDetails.accountNo}`,
        20,
        doc.y + 10
    );
    doc.text(`IFSC CODE: ${orgnization.bankDetails.ifscCode}`, 20, doc.y + 10);
    doc.text(`PAN NO: ${orgnization.panNo}`, 20, doc.y + 10);
    doc.text(`GST NO: ${orgnization.gstNo}`, 20, doc.y + 10);
};
export const getPrimaryOrFirstBank = (bankDetails) => {
    // Find the primary bank (if any)
    let primaryBank = bankDetails.find((item) => item.isPrimary);

    // If no primary bank is found, return the first item
    return primaryBank || bankDetails[0];
};
// Helper function to capitalize the first letter of a string
export const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
