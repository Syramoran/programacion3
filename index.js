import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({'estado':true});
    // res.json({'estado':true});
});


const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log('ok');
});

// node --watch index.js
