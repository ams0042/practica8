const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config/database');
const cursosRoutes = require('./routes/cursos');
const centrosRoutes = require('./routes/centros');
const alumnosRoutes = require('./routes/alumnos');
const graficoRoutes = require('./routes/grafico');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));


// Definir rutas
app.use('/cursos', cursosRoutes);
app.use('/centros', centrosRoutes);
app.use('/alumnos', alumnosRoutes);
app.use('/grafico', graficoRoutes);

// Ruta de inicio
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
