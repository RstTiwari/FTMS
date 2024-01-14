export const epochConveter =(date)=>{
    console.log(date);
  let epoch = Math.floor(date.getTime()/1000)
  return epoch
} 