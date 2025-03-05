import { DataTypes } from "sequelize";
import sequelize from "../config/local.js";
import User from "./user.js";

const Message = sequelize.define('message',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        unique: true
    },
    message:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    vue:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{timestamps:true});

User.hasMany(Message,{foreignKey:"userID"});
Message.belongsTo(User,{foreignKey:"userID"});

await Message.sync({alter:true, force:false});

export default Message