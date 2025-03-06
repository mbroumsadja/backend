import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";
const Admin = sequelize.define("admin",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        departement:{
            type: DataTypes.STRING,
            allowNull: false,
        }
});

await Admin.sync({alter: true, force: false});

export default Admin;