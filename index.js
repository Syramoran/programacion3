import express from 'express';
import dotenv from 'dotenv';
import {conexion} from './conexion.js'

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({'estado':true});
    // res.json({'estado':true});
});

app.get('/reclamos-estados', async (req, res) => {
    try {
        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1;';

        const [result] = await conexion.query(sql);

        console.log(result);

        res.status(200).json({estado:true})

    } catch(err){
        console.log(err);
    }
})


const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log('ok');
});

// node --watch index.js
