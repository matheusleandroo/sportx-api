import Sequelize, { Model } from 'sequelize';

class Phone extends Model {
  static init(sequelize) {
    super.init(
      {
        customer_id: Sequelize.INTEGER,
        number: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'costumers',
    });
  }
}

export default Phone;
