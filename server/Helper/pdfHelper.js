import axios from 'axios'
import fs from "fs"
import path from 'path';
import  sharp from 'sharp'


export const calcultTitlePostion = (companyName) => {
    const pageWidth = 595; // Assuming A4 paper width
    const maxWidth = pageWidth * 0.8;
    const estimatedCharacterWidth = 10;
    let orgnizationHeaderText = companyName.replace(/\s+/g, " ").toUpperCase();
    const orgnizationWidth =
        orgnizationHeaderText.length * estimatedCharacterWidth;
    let orgnizationHeaderPostion = (pageWidth - orgnizationWidth) / 2;
    let fontSize = calculateFontSize(
        orgnizationHeaderText,
        maxWidth,
        estimatedCharacterWidth
    );
    return { orgnizationHeaderText, orgnizationHeaderPostion, fontSize };
};

const calculateFontSize = (companyName, maxWidth, estimatedCharacterWidth) => {
    let nameWithoutWhitespace = companyName.replace(/\s+/g, ''); // Remove white space
    let nameWidth = nameWithoutWhitespace.length * estimatedCharacterWidth;
    
    // Calculate font size based on maxWidth and nameWidth
    let fontSize = Math.floor(maxWidth / (nameWidth * 0.6)); // Assuming an average character width of 0.6

    // Ensure fontSize is not too small
    if (fontSize < 8) {
        fontSize = 15; // Minimum font size
    }
    console.log(fontSize,"---");
    return fontSize;
};


export const calculateStreetPostion = (street) => {
    const startPostion = 267.5; // Assuming A4 paper width
    console.log(street.length,);
    let orgnizationStreet = street.replace(/\s+/g, " ").toUpperCase();
    const streetPostion =  startPostion - 2*street.length;
    console.log(streetPostion,orgnizationStreet);
    return {streetPostion,orgnizationStreet};
};



 export const downloadAndSaveImage = async (url, fileName) => {
    try {
        const folder = "upload"
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageName = `${fileName}.png`; // Assuming the image is a PNG
        const imagePath = path.join(folder, imageName);
        fs.writeFileSync(imagePath, response.data);
        console.log(`Image downloaded and saved as ${imageName}`);
        return imagePath;
    } catch (error) {
        console.error('Error downloading or saving the image:', error);
        return null;
    }
}

export  const downloadImage = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data, 'binary');

        // Convert image to PNG format
        const pngBuffer = await sharp(imageBuffer).png().toBuffer();
        return pngBuffer;
    } catch (error) {
        console.error('Error downloading or converting the image:', error);
        return null;
    }
}


export const addBankDetails = (doc,orgnization)=>{
    
         //here bank Details Can be Come
         doc.font("Helvetica-Bold")
         .fontSize(12)
         .fill("#000")
         .text("COMPANY AND BANK DETAILS", 20, doc.y + 50);
     doc.fontSize(10);
     doc.text(
         `BANK NAME: ${orgnization.bankDetails.bankName}`,
         20,
         doc.y + 10
     );
     doc.text(
         `BANK BRANCH: ${orgnization.bankDetails.branch}`,
         20,
         doc.y + 10
     );
     doc.text(
         `ACCOUNT NO: ${orgnization.bankDetails.accountNo}`,
         20,
         doc.y + 10
     );
     doc.text(
         `IFSC CODE: ${orgnization.bankDetails.ifscCode}`,
         20,
         doc.y + 10
     );
     doc.text(`PAN NO: ${orgnization.panNo}`, 20, doc.y + 10);
     doc.text(`GST NO: ${orgnization.gstNo}`, 20, doc.y + 10);
}