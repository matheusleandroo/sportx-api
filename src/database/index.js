import Sequelize from 'sequelize';

import Customer from '../app/models/Customer';

import databaseConfig from '../config/database';

const models = [Customer];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
