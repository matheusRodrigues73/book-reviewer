export default function checkPassword(password) {
  const requirements = {
    minMaxLength: true,
    haveNumberCharacter: true,
    haveUppercaseCharacter: true,
    haveLowercaseCharacter: true,
    haveSpecialCharacter: true,
    haveWhiteSpaces: false,
    verifyAllRequirements: true,
  };
  if (password.length < 8 || password.length > 20) {
    requirements.minMaxLength = false;
    requirements.verifyAllRequirements = false;
  }
  if (!password.match(/[0-9]/)) {
    requirements.haveNumberCharacter = false;
    requirements.verifyAllRequirements = false;
  }
  if (!password.match(/[A-Z]/)) {
    requirements.haveUppercaseCharacter = false;
    requirements.verifyAllRequirements = false;
  }
  if (!password.match(/[a-z]/)) {
    requirements.haveLowercaseCharacter = false;
    requirements.verifyAllRequirements = false;
  }
  if (!password.match(/[-'/`~!#*$@_%+=.,^&(){}[\]|;:"<>?]/)) {
    requirements.haveSpecialCharacter = false;
    requirements.verifyAllRequirements = false;
  }
  if (password.match(/\s/)) {
    requirements.haveWhiteSpaces = true;
    requirements.verifyAllRequirements = false;
  }
  return requirements;
}
