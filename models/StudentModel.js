import pool from './db.js';

export const getStudents = async () =>{
    const[row] = await pool.query("SELECT *FROM tblstudents");
    return row;
 }


//  export const inseertStudent = async (DataTransferItemList, author) =>{
//     const [result] = await pool.query(
//         "INSERT INTO student(title, author) VALUES(?,?)",[title, author]
//     )
//  }
 