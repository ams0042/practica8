const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mostrar página con gráfico
router.get('/', (req, res) => {
    res.render('grafico');
});

// Obtener datos para el gráfico en JSON con aprobados y suspensos sin "Curso de ..."
router.get('/data', (req, res) => {
    db.query(`
        SELECT REPLACE(c.nombre, 'Curso de ', '') AS curso, 
               SUM(a.aprobado) AS aprobados,
               COUNT(a.id) - SUM(a.aprobado) AS suspensos
        FROM cursos c
        LEFT JOIN alumnos a ON c.id = a.curso_id
        GROUP BY c.id, c.nombre
    `, (err, data) => {
        if (err) throw err;
        
        const labels = data.map(d => d.curso.length > 10 ? d.curso.substring(0, 10) + '...' : d.curso);
        res.json({
            labels: labels,
            aprobados: data.map(d => d.aprobados || 0),
            suspensos: data.map(d => d.suspensos || 0)
        });
    });
});

module.exports = router;