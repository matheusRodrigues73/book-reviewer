import checkEmail from "../checks/checkEmail";
import checkPassword from "../checks/checkPassword";
import checkPasswordAgain from "../checks/checkVerifyPassword";

export default function verifyInputsState(
  usernameState,
  emailState,
  passwordState,
  checkPasswordState,
  genderState,
) {
  const { verifyAllRequirements } = checkPassword(passwordState);
  if (usernameState === "") {
    document.querySelector("#username").focus();
    return false;
  }
  if (checkEmail(emailState) === "error") {
    document.querySelector("#email").focus();
    return false;
  }
  if (verifyAllRequirements === false) {
    document.querySelector("#password").focus();
    return false;
  }
  if (checkPasswordAgain(passwordState, checkPasswordState) === "error") {
    document.querySelector("#checkPassword").focus();
    return false;
  }
  if (!genderState) {
    document.querySelector("#gender").className = "error";
    return false;
  }
  return true;
}
