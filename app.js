import express from "express";
import 'dotenv/config.js';
import bookRoutes from './routers/BookRoutes.js';
import studentRoutes from './routers/StudentRoutes.js';

//initialize app
const app = express();

const port = 5000;

//middleware
app.use(express.json());

try{
    app.listen(process.env.PORT || 5000, () =>{
         console.log(`Listening to port ${process.env.PORT || 5000}...`)
    })   
}catch(e){
      console.log(e)
}


app.use('/book',bookRoutes);
app.use('/sudents',studentRoutes);