export const epochConveter =(date)=>{
  let epoch = Math.floor(date.getTime()/1000)
  return epoch
} 

export const convertUnixTimestampToDate = (timestamp) => {
  // Convert Unix timestamp to milliseconds by multiplying by 1000
  const milliseconds = timestamp * 1000;
  // Create a new Date object using the milliseconds
  const dateObject = new Date(milliseconds);
  // Get the individual components of the date (year, month, day)
  const year = dateObject.getFullYear().toString().slice(-2); // Extract last two digits of the year
  const month = ('0' + (dateObject.getMonth() + 1)).slice(-2); // Month is zero-based, so add 1
  const day = ('0' + dateObject.getDate()).slice(-2);
  // Concatenate the components to form the desired date format
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};