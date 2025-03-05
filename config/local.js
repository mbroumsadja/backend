import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.db_name,
  process.env.username,
  process.env.password,
  
  {
    host: process.env.host,
    dialect: "mysql",
    logging: false
  }
);

sequelize.authenticate()
  .then(() => console.log("Connexion réussie à la base de données"))
  .catch(err => console.error("Erreur de connexion :", err));

export default sequelize;