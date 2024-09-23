import { useState } from "react";

export default function useCheckPassword() {
  const [passwordLength, setPasswordLength] = useState("error");
  const [specialCharacter, setSpecialCharacter] = useState("error");
  const [numberCharacter, setNumberCharacter] = useState("error");
  const [uppercaseLetter, setUppercaseLetter] = useState("error");
  const [lowercaseLetter, setLowercaseLetter] = useState("error");
  const [whiteSpace, setWhiteSpace] = useState("hidden");
  const [checkAllRequirements, setCheckAllRequirements] = useState("error");

  const checks = [
    passwordLength,
    specialCharacter,
    numberCharacter,
    uppercaseLetter,
    lowercaseLetter,
    whiteSpace,
  ];

  function setCheckState(condition, checkIndex) {
    if (condition) {
      checks[checkIndex] = "success";
      setCheckAllRequirements(checks.includes("error") ? "error" : "success");
      return "success";
    } else {
      checks[checkIndex] = "error";
      setCheckAllRequirements(checks.includes("error") ? "error" : "success");
      return "error";
    }
  }
  function textCheck(inputText) {
    setPasswordLength(() =>
      setCheckState(inputText.length >= 8 && inputText.length <= 20, 0),
    );
    setSpecialCharacter(() =>
      setCheckState(inputText.match(/[-'/`~!#*$@_%+=.,^&(){}[\]|;:"<>?]/), 1),
    );
    setNumberCharacter(() => setCheckState(inputText.match(/\d/), 2));
    setUppercaseLetter(() => setCheckState(inputText.match(/[A-Z]/), 3));
    setLowercaseLetter(() => setCheckState(inputText.match(/[a-z]/), 4));
    setWhiteSpace(() => {
      if (inputText.match(/\s/)) {
        setCheckAllRequirements("error");
        return "";
      }
      return "hidden";
    });
  }

  return {
    passwordLength,
    specialCharacter,
    numberCharacter,
    uppercaseLetter,
    lowercaseLetter,
    whiteSpace,
    checkAllRequirements,
    textCheck,
  };
}
