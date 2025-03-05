import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.db_url, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: false,
      rejectUnauthorized: false
    }
  },
  logging: true
});

sequelize.authenticate()
  .then(() => console.log("Connexion réussie à la base de données"))
  .catch(err => console.error("Erreur de connexion 2:", err));

export default sequelize;