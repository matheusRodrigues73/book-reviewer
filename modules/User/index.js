import database from "infra/database";
import createId from "./createId";
import bcrypt from "bcryptjs";

export default class User {
  constructor({ id, username, email, hash, gender }) {
    this.id = id ?? createId();
    this.username = username;
    this.email = email;
    this.hash = hash;
    this.gender = gender;
  }
  static async encryptPassword(password) {
    return await bcrypt.hash(password, 11);
  }
  async storeUser() {
    await database.query(
      `INSERT INTO users VALUES ('${this.id}', '${this.username}', '${this.email}', '${this.hash}', '${this.gender}');`,
    );
  }
}
