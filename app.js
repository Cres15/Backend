import express from "express";

//initialize app
const app = express();

const port = 3000;

//middleware
app.use(express.json());

try{
app.listen(port, () => {
    console.log('Listening to port 3000...');
});
}catch(e){
    console.log(e);
}

app.get('/', async (request, response) => {
    response.status(200).json({message: "Cres"});
});