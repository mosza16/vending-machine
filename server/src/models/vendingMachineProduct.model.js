const vendingMachineProduct = (sequelize, DataTypes) => {
  const VendingMachineProduct = sequelize.define(
    'vending_machine_product',
    {
      vendingMachineProductId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'vending_machine_product_id',
      },
      productId: {
        type: DataTypes.STRING,
        field: 'product_id',
      },
      quantity: {
        type: DataTypes.DECIMAL,
        field: 'quantity',
        defaultValue: 0,
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

  VendingMachineProduct.associate = (models) => {
    VendingMachineProduct.hasOne(models.Product, {
      foreignKey: 'product_id',
    });

    VendingMachineProduct.hasOne(models.VendingMachine, {
      foreignKey: 'machine_id',
    });
  };
  return VendingMachineProduct;
};

export default vendingMachineProduct;
