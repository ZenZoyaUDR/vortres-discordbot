const sql = require('../../database/mysql.js');

let eResult = await sql.Execute(`SELECT * FROM ExampleTable WHERE player = 'testplayer'`);
console.log(eResult);

