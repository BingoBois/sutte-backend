import mysql, { Connection } from 'mysql';
const mysqlCred = require('../../mysql_str.json');

// mysql://root:password@localhost:port/dbName

class DbHandler {

    public connection: Connection;

    constructor() {
        this.connection = mysql.createConnection(process.env.MYSQL_STR ? process.env.MYSQL_STR : mysqlCred.info );
        this.connection.connect();
    }

    public getSutte(): void {
        this.connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
        });
    }

    public closeCon(): void{
        this.connection.destroy();
    }
}

const dbHandler = new DbHandler();

export default dbHandler;
