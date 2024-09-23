"use client";
import { useState } from "react";
import checkPassword from "./checks/checkPassword.js";
import PasswordChecks from "./checks/PasswordChecks.js";
import ChecksContext from "./checks/ChecksContext.js";
import checkEmail from "./checks/checkEmail.js";
import checkPasswordAgain from "./checks/checkVerifyPassword.js";
import checkUsername from "./checks/checkUsername.js";
import checkGender from "./checks/checkGender.js";
import saveUser from "./submit/saveUser.js";

export default function singUp() {
  const [checks, setChecks] = useState("hidden");
  const {
    passwordLength,
    specialCharacter,
    numberCharacter,
    uppercaseLetter,
    lowercaseLetter,
    whiteSpace,
    checkAllRequirements,
    textCheck,
  } = checkPassword();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [gender, setGender] = useState("");

  return (
    <form
      className="w-3/4 p-2 rounded-md m-auto bg-orange-950 text-yellow-100 flex flex-col justify-center gap-2"
      onSubmit={(ev) => {
        ev.preventDefault();
        saveUser({ username, email, password, verifyPassword, gender });
      }}
    >
      <h1>Sing Up</h1>
      <div className="p-2">
        <div>
          <label className={checkUsername(username)}>Username:</label>
          <input
            id="username"
            className="w-full px-1 py-0.5 rounded text-slate-700 text-xl"
            value={username}
            onChange={(ev) => {
              setUsername(ev.target.value);
            }}
          ></input>
        </div>
        <div>
          <label className={checkEmail(email)}>Email:</label>
          <input
            id="email"
            className="w-full px-1 py-0.5 rounded text-slate-700 text-xl"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
        </div>
        <div>
          <label className={checkAllRequirements}>Password:</label>
          <input
            id="password"
            className={"w-full px-1 py-0.5 rounded text-slate-700 text-xl"}
            value={password}
            onChange={(ev) => {
              textCheck(ev.target.value);
              setPassword(ev.target.value);
            }}
            onFocus={() => {
              setChecks("");
            }}
            onBlur={() => {
              setChecks("hidden");
            }}
          ></input>
          <p className={`${whiteSpace} error`}>Don't use spaces!</p>
          <ChecksContext.Provider
            value={{
              passwordLength,
              specialCharacter,
              numberCharacter,
              uppercaseLetter,
              lowercaseLetter,
              checkAllRequirements,
            }}
          >
            <PasswordChecks className={checks} />
          </ChecksContext.Provider>
        </div>
        <div>
          <label className={checkPasswordAgain(password, verifyPassword)}>
            Check Password
          </label>
          <input
            id="checkPassword"
            className="w-full px-1 py-0.5 rounded text-slate-700 text-xl"
            value={verifyPassword}
            onChange={(ev) => setVerifyPassword(ev.target.value)}
          ></input>
        </div>
        <div>
          <label id="gender" className={checkGender(gender)}>
            Gender:
          </label>
          <div className="flex justify-around">
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onClick={() => setGender("Male")}
                  className="mr-1"
                ></input>
                Male
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onClick={() => setGender("Female")}
                  className="mr-1"
                ></input>
                Female
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="gender"
                  onClick={() => setGender("Not Inform")}
                  className="mr-1"
                ></input>
                No Inform
              </label>
            </div>
          </div>
          <div className="w-full text-end mt-2">
            <button
              type="submit"
              className="px-5 py-1 bg-yellow-200 text-orange-950 rounded"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
