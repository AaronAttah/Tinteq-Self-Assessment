import otpGenerator from "otp-generator";

export const generateOTP = async () => {
  const OTP = otpGenerator.generate(4, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });
  return OTP;
};
