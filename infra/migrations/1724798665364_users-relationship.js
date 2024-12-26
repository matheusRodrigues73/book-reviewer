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
  pgm.createType("gender", ["Male", "Female", "Not Inform"]);
  pgm.createTable("users", {
    id: { type: "varchar(10)", notNull: true, unique: true },
    username: { type: "varchar(25)", notNull: true },
    email: { type: "varchar(60)", notNull: true, unique: true },
    hash: { type: "varchar(100)", notNull: true },
    gender: { type: "gender", notNull: true },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {};
