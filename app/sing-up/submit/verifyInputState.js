import checkEmail from "../checks/checkEmail";
import checkPasswordAgain from "../checks/checkVerifyPassword";
import inputTextCheck from "../checks/checkPassword";

export default function verifyInputState(
  usernameState,
  emailState,
  passwordState,
  checkPasswordState,
  genderState,
) {
  const { checkAllPassword, textCheck } = inputTextCheck();
  textCheck(passwordState);
  if (usernameState === "") {
    document.querySelector("#username").focus();
    return false;
  }
  if (checkEmail(emailState)) {
    document.querySelector("#email").focus();
    return false;
  }
  if (checkAllPassword === "error") {
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
