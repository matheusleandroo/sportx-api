import Sequelize, { Model } from 'sequelize';

class Customer extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        tipo: Sequelize.INTEGER,
        documento: Sequelize.STRING,
        razao: Sequelize.STRING,
        cep: Sequelize.STRING,
        email: Sequelize.STRING,
        classificacao: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Phone, {
      foreignKey: 'customer_id',
      as: 'phones',
    });
  }
}

export default Customer;
