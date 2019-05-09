import mysql, { Connection } from 'mysql';
import bcrypt from 'bcrypt';
import { IAccount } from '../types';

class DbHandler {

  public connection: Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.MYSQL_ADR,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
      multipleStatements: true
    });
    this.connection.connect();
  }

  public async createAccount(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const hashedPass = await bcrypt.hash(password, 2);
      this.connection.query('INSERT INTO account (email, pass) VALUES (?, ?)',
        [email, hashedPass], async (err) => {
          if (err) reject(err);
          resolve(true);
        });
    })
  }

  public async getAccount(id?: number, email?: string): Promise<IAccount> {
    return new Promise(async (resolve, reject) => {
      if (!id && !email) reject('No id or email in getAccount');
      const valArr = id ? [id] : [email];
      const condInput = id ? 'WHERE id = ?' : 'WHERE email = ?';
      this.connection.query('SELECT * FROM account ' + condInput,
       valArr, async (err, result) => {
          if (err) reject(err);
          if(result.length < 1) reject('No user found')
          resolve(JSON.parse(JSON.stringify(result[0])));
        });
    })
  }

  public async deleteAccount(id?: number, email?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (!id && !email) reject('No id or email in deleteAccount');
      const valArr = id ? [id] : [email];
      const condInput = id ? 'WHERE id = ?' : 'WHERE email = ?';
      this.connection.query('DELETE FROM account ' + condInput,
       valArr, async (err, result) => {
          if (err) reject(err);
          resolve(true);
        });
    })
  }

  public closeCon(): void {
    this.connection.destroy();
  }
}

export default DbHandler;
