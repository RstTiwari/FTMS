
  export const  emailVerification = ({  name, otp }) => {
    return `${name} Thank you for signing up for Myfac8ry FTMS ! Before we can activate your account, we kindly ask you to verify your email  by entring the otp provided below ${otp} valid for 15 minutes only` ;
};

export const passwordVerification =({name,otp})=>{
  return `Hello ${name} We have received a request to reset the password for your account on Myfac8ry. To proceed with the password reset,  by entring the otp provided below ${otp} valid for 15 minutes only` ;
};
