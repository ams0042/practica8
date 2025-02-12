const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Agregar esto

const CursoCentro = sequelize.define("CursoCentro", {
    cursoId: { type: DataTypes.INTEGER, references: { model: "Cursos", key: "id" } },
    centroId: { type: DataTypes.INTEGER, references: { model: "Centros", key: "id" } }
}, { timestamps: false });

module.exports = CursoCentro;
