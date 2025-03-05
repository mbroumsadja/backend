// import sequelize from "../config/db.js";
import sequelize from "../config/local.js";
import Role from "./role.js";
import User from "./user.js";
import { DataTypes } from "sequelize";
const UserRole = sequelize.define('user_role', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    roleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
   },{timestamps:true});

   UserRole.belongsTo(User, {foreignKey: 'userId'});
   UserRole.belongsTo(Role, {foreignKey: 'roleId'}); 

 await UserRole.sync({alter:true, force: false});

export default UserRole;