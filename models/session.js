// import sequelize from "../config/db.js";
import sequelize from "../config/local.js";
import { DataTypes } from "sequelize";
const Session = sequelize.define('session', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    cours: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jour: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lieu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    debut: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    fin: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    enseignant: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filiere: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    niveau: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    support: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, { timestamps: true });

await Session.sync({ alter: true , force:false});
export default Session;