import fs from 'fs';
import path from 'path';
import { Sequelize, Model } from 'sequelize';
import { DataTypes } from 'sequelize';

import process from 'process'; // Renamed process to avoid naming conflict
const basename = path.basename(__filename);
const env: string = (process.env.NODE_ENV as string) || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db: { [key: string]: any } = {}; // Type definition for db object

let sequelize: Sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize((process.env[config.use_env_variable] as string), config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file: string) => {
    const model = require(`./${file}`)(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName: string) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
