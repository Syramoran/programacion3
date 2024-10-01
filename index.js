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

app.get('/reclamos-estados/:idReclamosEstado', async (req, res) => {
    try{
        const idReclamosEstado = req.params.idReclamosEstado;

        const sql = 'SELECT * FROM reclamos_estado WHERE activo = 1 AND idReclamosEstado = ?';
        const [result] = await conexion.query(sql, [idReclamosEstado]);

        if (result.length === 0){
            return res.status(404).json({
                mensaje: 'No se encontro el estado.'
            });
        }

        res.status(200).json(result);
    } catch(err){
        res.status(500).json({mensaje:'error interno'});
    }
})


const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log('ok');
});

// node --watch index.js
