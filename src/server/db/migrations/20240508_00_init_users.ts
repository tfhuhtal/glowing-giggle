import { DataTypes } from 'sequelize';

import { Migration } from '../connection';

export const up: Migration = ({ context: queryInterface }) =>
  queryInterface.createTable('users', {
    iid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable('users');
