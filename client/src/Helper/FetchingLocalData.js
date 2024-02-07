export const removeLocalData = (cookieName) => {
    sessionStorage.removeItem(`${cookieName}`);
    window.location.reload();
};
export const getLocalData = (tokenName) => {
    let data = sessionStorage.getItem(`${tokenName}`);
    const decodedData = base64ToArray(data)
    return  decodedData ? decodedData : null
};

export const setLocalData = (tokenName,data) => {
    let encodedData =  arrayToBase64(data)
    sessionStorage.setItem(tokenName, encodedData);
};


// Encode array to Base64
function arrayToBase64(array) {
    const jsonString = JSON.stringify(array); // Convert array to JSON string
    return btoa(jsonString); // Encode JSON string to Base64
}

function base64ToArray(base64String) {
    try {
        const jsonString = atob(base64String); // Decode Base64 to JSON string
        return JSON.parse(jsonString); // Parse JSON string back to array
    } catch (error) {
        console.error('Error decoding Base64 string:', error);
        return null; // Return null if decoding fails
    }
}






