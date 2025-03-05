// import sequelize from "../config/db.js";
import sequelize from "../config/local.js";
import { DataTypes } from "sequelize";
const Role = sequelize.define('role', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false,
    },
   },{timestamps:true});

   await Role.sync({alter: true, force: false});

export default Role;
