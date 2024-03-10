import axios from 'axios'
import fs from "fs"


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
    console.log(companyName, maxWidth, estimatedCharacterWidth<"companyName, maxWidth, estimatedCharacterWidth");
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
    let orgnizationStreet = street.replace(/\s+/g, " ");
    let orgnizationStreetPostion =
        orgnizationStreet.length <= 30
            ? 225
            : orgnizationStreet.length <= 45
            ? 190
            : orgnizationStreet.length <= 55
            ? 175
            : 150;

    return { orgnizationStreet, orgnizationStreetPostion };
};


export const  downloadAndSaveImage = async(url, fileName) => {
  try {

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const imageName = `${fileName}.png`;
    fs.writeFileSync(imageName, response.data);
    console.log(`Image downloaded and saved as ${imageName}`);
    return imageName
  } catch (error) {
    console.error('Error downloading or saving the image:', error);
    return null

  }
}