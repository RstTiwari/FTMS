export const epochConveter =(date)=>{
  let epoch = Math.floor(date.getTime()/1000)
  return epoch
} 