export default function checkGender(genderState) {
  switch (genderState) {
    case "Male":
      return "success";
    case "Female":
      return "success";
    case "Not Inform":
      return "success";
    default:
      return "error";
  }
}
