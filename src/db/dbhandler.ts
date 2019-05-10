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

  public async createAccount(email: string, pass: string, role: 'admin' | 'teacher', name: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const hashedPass = await bcrypt.hash(pass, 2);
      this.connection.query('INSERT INTO account (email, pass, role, name) VALUES (?, ?, ?, ?);',
        [email, hashedPass, role, name], async (err) => {
          if (err){
            reject(err);
          } 
          resolve(true);
        });
    })
  }

  public async getAccount(id?: number, email?: string): Promise<IAccount> {
    return new Promise(async (resolve, reject) => {
      if (!id && !email) reject('No id or email in getAccount');
      const valArr = id ? [id] : [email];
      const condInput = id ? 'WHERE id = ?;' : 'WHERE email = ?;';
      this.connection.query('SELECT * FROM account ' + condInput,
       valArr, async (err, result) => {
          if (err) reject(err);
          const newRes = Object.assign({}, result[0]);
          resolve({
            id: newRes.id,
            email: newRes.email,
            pass: newRes.pass,
            name: newRes.name,
            role: newRes.role
          });
        });
    })
  }

  public async deleteAccount(id?: number, email?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!id && !email) reject('No id or email in deleteAccount');
      const valArr = id ? [id] : [email];
      const condInput = id ? 'WHERE id = ?;' : 'WHERE email = ?;';
      this.connection.query('DELETE FROM account ' + condInput,
       valArr, async (err, result) => {
          if (err) reject(err);
          if(result.affectedRows < 1) reject("No user to delete")
          resolve(true);
        });
    })
  }

  public closeCon(): void {
    this.connection.destroy();
  }
}

export default DbHandler;
