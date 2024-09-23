import { useContext } from "react";
import checksContext from "./ChecksContext.js";

export default function Checks({ className }) {
  const {
    passwordLength,
    specialCharacter,
    numberCharacter,
    uppercaseLetter,
    lowercaseLetter,
    checkAllRequirements,
  } = useContext(checksContext);
  return (
    <div className={className}>
      <p className={checkAllRequirements}>The password should have at least:</p>
      <ul className="list-disc px-5 pb-3">
        <li className={passwordLength}>min 8 max 20 characters</li>
        <li className={specialCharacter}>
          1 special character ({"-'/`~!#*$@_%+=.,^&(){}[]|;:\"<>?"})
        </li>
        <li className={numberCharacter}>1 number character</li>
        <li className={uppercaseLetter}>1 uppercase letter</li>
        <li className={lowercaseLetter}>1 lowercase letter</li>
      </ul>
    </div>
  );
}
