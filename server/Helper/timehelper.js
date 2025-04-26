import dayjs from 'dayjs';
export const epochInDDMMYY = (timestamp) => {
    // Convert Unix timestamp to milliseconds by multiplying by 1000
    const milliseconds = timestamp * 1000;
    // Create a new Date object using the milliseconds
    const dateObject = new Date(milliseconds);
    // Get the individual components of the date (year, month, day)
    const year = dateObject.getFullYear().toString().slice(-2); // Extract last two digits of the year
    const month = ("0" + (dateObject.getMonth() + 1)).slice(-2); // Month is zero-based, so add 1
    const day = ("0" + dateObject.getDate()).slice(-2);
    // Concatenate the components to form the desired date format
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;
};



export const jsDateIntoDDMMYY = (dateString) => {
    return dayjs(dateString).format("DD-MM-YYYY");
};


export function localDateString(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = date.toLocaleString('en-IN', { month: 'short', timeZone: 'UTC' });
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  }
  
