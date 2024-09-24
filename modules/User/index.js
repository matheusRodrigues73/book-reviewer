import createId from "./createId";

export default class User {
  constructor({ id, username, email, gender, hash }) {
    this.id = id ?? createId();
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.hash = hash;
  }
}
