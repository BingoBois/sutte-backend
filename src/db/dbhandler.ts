import mysql, { Connection } from 'mysql';
import { IAccount, ICourse } from '../types';
import { hashPass } from '../helpers/hash';
import { rejects } from 'assert';
import { resolve } from 'dns';

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

  public createAccount(email: string, pass: string, role: 'admin' | 'teacher', name: string): Promise<boolean> {
    const hashedPass = hashPass(pass);
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO account (email, pass, role, name) VALUES (?, ?, ?, ?);',
        [email, hashedPass, role, name], (err) => {
          if (err) {
            return reject(err);
          }
          resolve(true);
        });
    });
  }

  public getAccount(search: number | string): Promise<IAccount> {
    return new Promise(async (resolve, reject) => {
      if (!search) {
        return reject('No id or email in getAccount');
      }
      const condInput = typeof (search) === "number" ? 'WHERE id = ?;' : 'WHERE email = ?;';
      this.connection.query(`SELECT * FROM account ${condInput}`, [search], async (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.length <= 0) {
          return reject(`Account not found`);
        }
        resolve({
          id: result[0].id,
          email: result[0].email,
          pass: result[0].pass,
          name: result[0].name,
          role: result[0].role
        });
      });
    });
  }

  //public getAccounts

  public deleteAccount(id?: number, email?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (!id && !email) reject('No id or email in deleteAccount');
      const valArr = id ? [id] : [email];
      const condInput = id ? 'WHERE id = ?;' : 'WHERE email = ?;';
      this.connection.query('DELETE FROM account ' + condInput,
        valArr, async (err, result) => {
          if (err) {
            return reject(err);
          }
          if (result.affectedRows < 1) {
            return reject("No user to delete");
          }
          resolve(true);
        });
    });
  }

  public getCourses(search?: number | string, fuzzy: boolean = true): Promise<Array<ICourse>> {
    return new Promise(async (resolve, reject) => {
      const fuzzyName = 'WHERE name ' + (fuzzy ? 'LIKE CONCAT("%", ?,  "%")' : '= ?');
      const fuzzyDesc = 'description ' + (fuzzy ? 'LIKE CONCAT("%", ?,  "%")' : '= ?');
      const condInput = (search ? typeof (search) === "number" ? 'WHERE id = ?;' : `${fuzzyName} OR ${fuzzyDesc};` : ';');
      console.log(`SELECT * FROM course ${condInput}`);
      this.connection.query(`SELECT * FROM course ${condInput}`, [search, search], (err, result: Array<ICourse>) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        if (result.length <= 0) {
          return reject(`Courses not found`);
        }
        const courseArray: Array<ICourse> = [];
        result.forEach((course) => {
          courseArray.push(course);
        });
        resolve(courseArray);
      });
    });
  }

  public createCourse(name: string, description: string, active: boolean, fk_suggestedBy: number) {
    return new Promise(async (resolve, reject) => {
      this.connection.query(`INSERT INTO course (name, description, active, fk_suggestedBy) VALUES (?, ?, ?, ?);`,
        [name, description, active, fk_suggestedBy], (err) => {
          if (err) {
            console.log(err);
            return reject(err)
          }
          resolve()
        });
    });
  }

  public deleteCourse(courseID: number) {
    return new Promise(async (resolve, reject) => {
      this.connection.query(`DELETE FROM course WHERE id = ?`, async (err, result) => {
        if (err) {
          return reject(err);
        }
        if (result.affectedRows <= 0) {
          return reject(`No course with id ${courseID} to delete`);
        }
        resolve();
      });
    });
  }

  public closeCon(): void {
    this.connection.destroy();
  }

}

export default DbHandler;
