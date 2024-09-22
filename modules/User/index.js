import bcrypt from "bcrypt";
import database from "infra/database";
import createId from "./createId";

export default class User {
  #id;
  #username;
  #email;
  #gender;
  #hash;

  constructor({ id, username, email, gender, hash }) {
    this.#id = id ?? createId();
    this.#username = username;
    this.#email = email;
    this.#email = gender;
    this.#hash = hash;
  }

  static makeNewHash(password) {
    return bcrypt.hash(password, 11, (err, hash) => {
      try {
        return hash;
      } catch {
        console.log(err);
      }
    });
  }

  get() {
    return {
      username: this.#username,
      email: this.#email,
      gender: this.#gender,
    };
  }
  setPasswrod(password) {
    this.#hash = password;
  }
  storeUser() {
    database.query(
      `INSERT INTO users VALUES (${this.#id},${this.#username}, ${this.#email}, ${this.#gender}, ${this.#hash})`,
    );
  }
}
