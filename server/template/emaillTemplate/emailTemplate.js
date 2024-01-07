
  export const  emailVerification = ({  name, link }) => {
    return `${name} Thank you for signing up for Myfac8ry FTMS ! Before we can activate your account, we kindly ask you to verify your email address by clicking on the link provided below ${link}`;
};

export const passwordVerification =({name,link})=>{
  return `Hello ${name} We have received a request to reset the password for your account on IDURAR. To proceed with the password reset, please click on the link provided below: ${link}`
}