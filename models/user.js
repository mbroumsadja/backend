import { DataTypes } from "sequelize";
// import sequelize from "../config/db.js";
import sequelize from "../config/local.js";
const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    matricule:{
        type: DataTypes.STRING,
        allowNull: false,
    },
   nom:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    numero:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    departement:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    filiere:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    niveau:{
        type: DataTypes.STRING,
        allowNull: false,   
    },
    },{timestamps:true});

 await User.sync({alter:true, force: false});

export default User;

