// import { Sequelize } from "sequelize";
// import 'dotenv/config';

// const sequelize = new Sequelize(
//   process.env.db_name,
//   process.env.username,
//   process.env.password,

//   {
//     host: process.env.host,
//     dialect: "mysql",
//     logging: true
//   }
// );

// sequelize.authenticate()
//   .then(() => console.log("Connexion réussie à la base de données"))
//   .catch(err => console.error("Erreur de connexion :", err));

// export default sequelize;
import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(process.env.db_url, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
  logging: false
});

sequelize.authenticate()
  .then(() => console.log("Connexion réussie à la base de données"))
  .catch(err => console.error("Erreur de connexion 2:", err));

export default sequelize;