const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Obtener lista de centros con los cursos que imparten
router.get('/', (req, res) => {
    db.query(`
        SELECT centros.nombre AS centro, GROUP_CONCAT(cursos.nombre SEPARATOR ', ') AS cursos
        FROM centros
        JOIN curso_centro ON centros.id = curso_centro.centro_id
        JOIN cursos ON curso_centro.curso_id = cursos.id
        GROUP BY centros.id, centros.nombre
    `, (err, data) => {
        if (err) throw err;
        res.render('centros', { centros: data });
    });
});

module.exports = router;
