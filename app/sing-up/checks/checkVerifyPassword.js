export default function checkPasswordAgain(password, checkPassword) {
  if (password === checkPassword && password.length > 0) {
    return "success";
  } else {
    return "error";
  }
}
