import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';

import { sequelize } from "@/server/database";

export class Product extends Model<
  InferAttributes<Product>,
  InferCreationAttributes<Product>
> {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stockStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "stock_status",
      validate: {
        isIn: [['in_stock', 'out_of_stock', 'pre_order']],
      },
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);