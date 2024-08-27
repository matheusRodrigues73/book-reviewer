/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createType("gender", ["M", "F", "NoInfo"]);
  pgm.createTable("users", {
    id: { type: "varchar(100)", notNull: true, unique: true },
    username: { type: "varchar(70)", notNull: true },
    email: { type: "varchar(80)", notNull: true, unique: true },
    password: { type: "varchar(100)", notNull: true },
    gender: { type: "gender", notNull: true },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
