import { DataTypes } from 'sequelize';

import { Migration } from '../connection';

export const up: Migration = ({ context: queryInterface }) =>
  queryInterface.createTable('users', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

export const down: Migration = ({ context: queryInterface }) =>
  queryInterface.dropTable('users');
