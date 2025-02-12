const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Curso = sequelize.define("Curso", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: { type: DataTypes.TEXT, allowNull: false },
    nivel: { type: DataTypes.ENUM("Básico", "Intermedio", "Avanzado"), allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false },
    fecha_importacion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Curso;