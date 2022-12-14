const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Request extends Model { }

Request.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    date_needed: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fulfilled: {
      type: DataTypes.BOOLEAN,
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        },
      },
    giver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'request',
  }
);

module.exports = Request;
