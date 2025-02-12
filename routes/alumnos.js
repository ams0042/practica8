const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mostrar lista de cursos para seleccionar
router.get('/', (req, res) => {
    db.query('SELECT * FROM cursos', (err, cursos) => {
        if (err) throw err;
        res.render('alumnos', { cursos, alumnos: [] });
    });
});

// Mostrar alumnos matriculados en un curso específico
router.get('/:cursoId', (req, res) => {
    const cursoId = req.params.cursoId;
    db.query('SELECT * FROM cursos', (err, cursos) => {
        if (err) throw err;
        db.query('SELECT nombre, aprobado FROM alumnos WHERE curso_id = ?', [cursoId], (err, alumnos) => {
            if (err) throw err;
            res.render('alumnos', { cursos, alumnos });
        });
    });
});

module.exports = router;
