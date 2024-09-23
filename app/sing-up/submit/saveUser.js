import database from "infra/database";
import User from "modules/User";

export default function submitNewUser({
  username,
  email,
  password,
  verifyPassword,
  gender,
}) {
  if (verifyPassword(username, email, password, verifyPassword, gender)) {
    console.log("save");
    const hash = User.makeNewHash(password);
    const user = new User({ username, email, hash, gender });
    database.storeUser(user);
  } else {
    console.log("no");
  }
}
