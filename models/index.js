const sequelize = require("../config/database");
const Curso = require("./Curso");
const Centro = require("./Centro");
const Estudiante = require("./Estudiante");
const CursoCentro = require("./CursoCentro");

// ✅ Definir relaciones después de importar los modelos
Curso.belongsToMany(Centro, { through: CursoCentro, foreignKey: "cursoId" });
Centro.belongsToMany(Curso, { through: CursoCentro, foreignKey: "centroId" });

Curso.hasMany(Estudiante, { foreignKey: "cursoId", onDelete: "CASCADE" });
Estudiante.belongsTo(Curso, { foreignKey: "cursoId", onDelete: "CASCADE" });

const db = {
    Curso,
    Centro,
    Estudiante,
    CursoCentro,
    sequelize
};

module.exports = db;
