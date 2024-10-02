import express from 'express';
import dotenv from 'dotenv';
import {conexion} from './conexion.js';

dotenv.config();

const app = express();

app.use(express.json());

// test
app.get('/', (req, res) => {
    res.status(200).send({'estado':true});
    // res.json({'estado':true});
});

// get all
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

// get by ID
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

// update y borrado lógico
app.patch('/reclamos-estados/:idReclamosEstado', async (req, res) => {
    try{
        
        const { descripcion, activo } = req.body;
        // Se está usando destructuring assignment para extraer las propiedades descripcion y activo del objeto req.body.
        // Esta línea simplifica el acceso a esos datos en lugar de tener que escribir req.body.descripcion y req.body.activo cada vez que quieras usarlos.
            // const descripcion = req.body.descripcion;
            // const activo = req.body.activo;


        // chequeo de que llegue la info necesaria
        if(!descripcion) {
            return res.status(404).json({
                mensaje:"Se requiere el campo descripción"
            })
        }

        if (activo === undefined || activo === null) {
            return res.status(404).json({
                mensaje:"Se requiere el campo descripción"
            })
        }

        const idReclamosEstado = req.params.idReclamosEstado;

        const sql = 'UPDATE reclamos_estado SET descripcion=?, activo=? WHERE idReclamosEstado=?';
        const [result] = await conexion.query(sql, [descripcion, activo, idReclamosEstado]);

        if (result.affectedRows === 0){
            return res.status(404).json({
                mensaje:'No se pudo modificar.'
            })
        }

        res.status(200).json({
            mensaje:'Reclamo modificado'
        });

    } catch(err) {
        console.error(err);
        res.status(500).json({
            mensaje:'Error interno.'
        });
    }
});


// create
app.post('/reclamos-estado', async (req, res) =>{
    try {
        const {descripcion, activo } = req.body;

        if(!descripcion) {
            return res.status(404).json({
                mensaje:"Se requiere el campo descripción"
            })
        }

        if (activo === undefined || activo === null) {
            return res.status(404).json({
                mensaje:"Se requiere el campo descripción"
            })
        }

        const sql = 'INSERT INTO reclamos_estado (descripcion, activo) VALUES (?,?)';
        const [result] = await conexion.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0){
            return res.status(404).json({
                mensaje: "No se pudo crear el reclamo-estado"
            })
        }

        res.status(201).json({
            mensaje:"Reclamo-estado creado"
        });
    }catch(err){
        console.error(err);
        res.status(500).json({
            mensaje:"Error interno."
        });
    }
});



const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log('ok');
});

// node --watch index.js
