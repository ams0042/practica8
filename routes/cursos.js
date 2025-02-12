const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mostrar lista de cursos en una página propia
router.get('/', (req, res) => {
    db.query('SELECT * FROM cursos', (err, cursos) => {
        if (err) {
            console.error('Error al obtener cursos:', err);
            return res.status(500).send('Error en el servidor');
        }
        res.render('cursos', { cursos });
    });
});

// Mostrar formulario de edición de curso
router.get('/editar/:id', (req, res) => {
    const cursoId = req.params.id;
    db.query('SELECT * FROM cursos WHERE id = ?', [cursoId], (err, curso) => {
        if (err) {
            console.error('Error al obtener el curso:', err);
            return res.status(500).send('Error en el servidor');
        }
        if (curso.length === 0) {
            return res.status(404).send('Curso no encontrado');
        }
        res.render('editar_curso', { curso: curso[0] });
    });
});

// Actualizar curso en la base de datos
router.post('/actualizar/:id', (req, res) => {
    const cursoId = req.params.id;
    const { nombre, descripcion, nivel, lugar } = req.body;
    db.query('UPDATE cursos SET nombre=?, descripcion=?, nivel=?, lugar=? WHERE id=?',
        [nombre, descripcion, nivel, lugar, cursoId],
        (err, result) => {
            if (err) {
                console.error('Error al actualizar curso:', err);
                return res.status(500).send('Error en el servidor');
            }
            if (result.affectedRows === 0) {
                return res.status(404).send('Curso no encontrado');
            }
            res.redirect('/cursos');
        }
    );
});

module.exports = router;
