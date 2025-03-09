import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    matricule: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    filiere: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    niveau: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    indexes: [
        {
          unique:true,
          fields: ['matricule','email'],
        },
      ]
});

export default User;

