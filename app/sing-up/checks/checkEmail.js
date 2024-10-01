export default function checkEmail(inputText) {
  if (inputText.match(/..*@..*\...*/)) {
    console.log(inputText);
    return "success";
  } else {
    return "error";
  }
}
