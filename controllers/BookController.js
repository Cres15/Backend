import * as BookModel from "../models/BookModel.js";

export const createBooks = async (req, res) =>{
    const {title, genre, status} = req.body
    try{
        const bookId = await BookModel.insertBook(title, genre, status);
        res.status(200).json({success : true, message : bookId})
    }catch(e){
        console.log(e);
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}