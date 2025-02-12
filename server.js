const express = require('express');
const db = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Asegura que Express encuentre las vistas
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Página de inicio - Mostrar cursos
app.get('/', (req, res) => {
    db.query("SELECT * FROM cursos", (err, results) => {
        if (err) throw err;
        res.render('index', { cursos: results });
    });
});

// Listado de centros
app.get('/centros', (req, res) => {
    db.query("SELECT * FROM centros", (err, results) => {
        if (err) throw err;
        res.render('centros', { centros: results });
    });
});

// Alumnos de un curso
app.get('/curso/:id/alumnos', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM alumnos WHERE curso_id = ?", [id], (err, results) => {
        if (err) throw err;
        res.render('alumnos', { alumnos: results, cursoId: id });
    });
});

// Borrar alumno
app.post('/alumno/:id/eliminar', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM alumnos WHERE id = ?", [id], err => {
        if (err) throw err;
        res.redirect('back');
    });
});

// Modificar curso
app.get('/curso/:id/editar', (req, res) => {
    db.query("SELECT * FROM cursos WHERE id = ?", [req.params.id], (err, result) => {
        if (err) throw err;
        res.render('editar', { curso: result[0] });
    });
});

app.post('/curso/:id/actualizar', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    db.query("UPDATE cursos SET nombre = ?, descripcion = ? WHERE id = ?", [nombre, descripcion, id], err => {
        if (err) throw err;
        res.redirect('/');
    });
});

app.listen(3000, () => console.log("🚀 Servidor corriendo en http://localhost:3000"));
