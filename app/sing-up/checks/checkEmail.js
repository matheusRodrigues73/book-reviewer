export default function checkEmail(inputText) {
  if (inputText.match(/..*@..*\...*/)) {
    return "success";
  } else {
    return "error";
  }
}
