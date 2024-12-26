import { useState } from "react";
import checkPassword from "./checkPassword";

export default function useCheckPassword() {
  const [passwordLength, setPasswordLength] = useState("error");
  const [specialCharacter, setSpecialCharacter] = useState("error");
  const [numberCharacter, setNumberCharacter] = useState("error");
  const [uppercaseCharacter, setUppercaseCharacter] = useState("error");
  const [lowercaseCharacter, setLowercaseCharacter] = useState("error");
  const [whiteSpace, setWhiteSpace] = useState("hidden");
  const [checkAllRequirements, setCheckAllRequirements] = useState("error");

  function checkPasswordText(password) {
    const {
      minMaxLength,
      haveNumberCharacter,
      haveUppercaseCharacter,
      haveLowercaseCharacter,
      haveSpecialCharacter,
      haveWhiteSpaces,
      verifyAllRequirements,
    } = checkPassword(password);
    setPasswordLength(minMaxLength ? "success" : "error");
    setNumberCharacter(haveNumberCharacter ? "success" : "error");
    setUppercaseCharacter(haveUppercaseCharacter ? "success" : "error");
    setLowercaseCharacter(haveLowercaseCharacter ? "success" : "error");
    setSpecialCharacter(haveSpecialCharacter ? "success" : "error");
    setWhiteSpace(haveWhiteSpaces ? "" : "hidden");
    setCheckAllRequirements(verifyAllRequirements ? "success" : "error");
  }
  return {
    passwordLength,
    numberCharacter,
    uppercaseCharacter,
    lowercaseCharacter,
    specialCharacter,
    whiteSpace,
    checkAllRequirements,
    checkPasswordText,
  };
}
