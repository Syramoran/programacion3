import mysql from 'mysql2/promise';

export const conexion = await mysql.createConnection({
    host: 'localhost',
    user: 'syra-dev',
    database: 'reclamos',
    password: 'syra1234',
    port: 33065,
});
