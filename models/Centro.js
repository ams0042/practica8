const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // ✅ Agregar esta línea

const Centro = sequelize.define("Centro", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    ubicacion: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Centro;
