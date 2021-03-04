const order = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'order',
    {
      orderId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'order_id',
      },
      thTotalPrices: {
        type: DataTypes.DECIMAL,
        field: 'th_total_prices',
        defaultValue: 0,
      },
      payMethod: {
        type: DataTypes.STRING,
        field: 'pay_method',
        defaultValue: 'CASH',
      },
      machineId: {
        type: DataTypes.STRING,
        field: 'machine_id',
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
  Order.associate = (models) => {
    Order.hasOne(models.VendingMachine, {
      foreignKey: 'machine_id',
    });
  };
  return Order;
};

export default order;
