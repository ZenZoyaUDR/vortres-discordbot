const mysql = require("mysql2");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

//create the pool connection using environment variables for values
const pool = mysql.createPool({
  // Database connection details:
  //The hostname of the database you are connecting to. (Default: localhost)
  host: DB_HOST,
  //port: 3306, //unused for PlanetScale
  //localAddress: The source IP address to use for TCP connection. (Optional)
  //The MySQL user to authenticate as.
  user: DB_USERNAME,
  //The password of that MySQL user.
  password: DB_PASSWORD,
  //Name of the database to use for this connection (Optional).
  database: DB_DATABASE,

  // The following configuration options have been pre-set to allow for ease of use.
  // **Do NOT modify unless you know what you are doing.**

  //socketPath:
  //The path to a unix domain socket to connect to. When used host and port are ignored.
  //socketPath: /var/run/mysqld/mysqld.sock ?? 127.0.0.1:3306

  //charset:
  //The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci).
  //If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used. (Default: 'UTF8_GENERAL_CI')
  charset: "utf8mb4",

  //ssl:
  //Object with ssl parameters or a string containing name of ssl profile.
  ssl: {
    rejectUnauthorized: true,
  },

  //debug:
  //Prints protocol details to stdout.
  //Can be true/false or an array of packet type names that should be printed. (Default: false)
  debug: false,

  //trace:
  //Generates stack traces on Error to include call site of library entrance ("long stack traces").
  //Slight performance penalty for most calls. (Default: true)
  trace: true,

  //connectTimeout:
  //The milliseconds before a timeout occurs during the initial connection to the MySQL server. (Default: 10000)
  connectTimeout: 15000,

  //waitForConnections:
  //Determines the pool's action when no connections are available and the limit has been reached.
  //If true, the pool will queue the connection request and call it when one becomes available. If false, the pool will immediately call back with an error. (Default: true)
  waitForConnections: true,

  //connectionLimit:
  //The maximum number of connections to create at once. (Default: 10)
  connectionLimit: 100,

  //queueLimit:
  //The maximum number of connection requests the pool will queue before returning an error from getConnection.
  //If set to 0, there is no limit to the number of queued connection requests. (Default: 0)
  queueLimit: 0,

  //stringifyObjects:
  //Stringify objects instead of converting to values. (Default: false)
  stringifyObjects: false,

  //supportBigNumbers:
  //When dealing with big numbers (BIGINT and DECIMAL columns) in the database,
  //you should enable this option (Default: false)
  supportBigNumbers: false,

  //bigNumberStrings:
  //Enabling both supportBigNumbers and bigNumberStrings forces big numbers (BIGINT and DECIMAL columns)
  //to be always returned as JavaScript String objects (Default: false)
  bigNumberStrings: false,
});

//now get a Promise wrapped instance of the pool
//this is a built-in process
const promisePool = pool.promise();

//Modules:
//create module "execute" and export it for use in project files
module.exports = {
  execute: async (queryString) => {
    try {
      if ((m = await promisePool.execute(`${queryString}`))) {
        return m[0];
      } else return false;
    } catch (e) {
      console.log(e);
    }
  },
};
