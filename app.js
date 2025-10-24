import express from 'express';

const app = express();

app.use(express.json());

const port = 3000;

try {
    app.listen(port,()=>{
        console.log('Listening port 3000....');
    });

} catch (e) {
    console.log(e);
}

app.get('/Dexter',async(req,res)=> {
    res.status(200).json({message: 'kupal si aquiz gusto babae ayaw ligo'});
})