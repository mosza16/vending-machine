const orderProduct = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'order_product',
    {
      orderProductId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'order_product_id',
      },
      quantity: {
        type: DataTypes.DECIMAL,
        field: 'quantity',
        defaultValue: 0,
      },
      thTotalPrices: {
        type: DataTypes.DECIMAL,
        field: 'th_total_price',
        defaultValue: 0,
      },
      productId: {
        type: DataTypes.STRING,
        field: 'product_id',
      },
      orderId: {
        type: DataTypes.STRING,
        field: 'order_id',
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        type: DataTypes.STRING,
        field: 'created_by',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: DataTypes.NOW,
      },
      updatedBy: {
        type: DataTypes.STRING,
        field: 'updated_by',
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  OrderProduct.associate = (models) => {
    OrderProduct.hasOne(models.Product, {
      foreignKey: 'product_id',
    });
    OrderProduct.hasOne(models.Order, {
      foreignKey: 'order_id',
    });
  };

  return OrderProduct;
};

export default orderProduct;
