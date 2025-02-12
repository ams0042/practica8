const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Agregar esta línea
const Curso = require("./Curso");

const Estudiante = sequelize.define("Estudiante", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    estado: { type: DataTypes.ENUM("Aprobado", "Suspendido"), allowNull: false }
});

Estudiante.belongsTo(Curso, { foreignKey: "cursoId", onDelete: "CASCADE" });

module.exports = Estudiante;
