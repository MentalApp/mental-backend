/**
 * Access database in here
 */
const mariadb = require('mariadb');
const pool = mariadb.createPool({
  host: 'localhost',                         // change host here
  database: 'mental_development',
  user: 'root', 
  password: '',
  socketPath: '/var/run/mysqld/mysqld.sock', // change socket
  connectionLimit: 5
});
pool.getConnection()
  .then(conn => {
    conn.query("SELECT 1 as val")
      .then((rows) => {
        console.log(rows);
        return "Connected"
      })
      .then((res) => {
        console.log(res);
        conn.end();
      })
      .catch(err => {
        //handle error
        console.log(err);
        conn.end();
      })
  }).catch(err => {
    //not connected
    console.log(err);
  });
