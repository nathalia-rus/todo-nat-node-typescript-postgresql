var Pool = require("pg-pool");

export default new Pool({
  database: "dev-postgres",
  user: "postgres",
  password: "secret!",
  port: 5432,
  host: "172.17.0.4",
  max: 20, // set pool max size to 20
  idleTimeoutMillis: 1000, // close idle clients after 1 second
  connectionTimeoutMillis: 1000, // return an error after 1 second if connection could not be established
  maxUses: 7500, // close (and replace) a connection after it has been used 7500 times (see below for discussion)
});
