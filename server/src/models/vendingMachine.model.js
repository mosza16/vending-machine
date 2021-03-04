const vendingMachine = (sequelize, DataTypes) => {
  const VendingMachine = sequelize.define(
    'vending_machine',
    {
      machineId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'machine_id',
      },
      machineCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'machine_code',
      },
      locationId: {
        type: DataTypes.STRING,
        field: 'location_id',
      },
      statusCode: {
        type: DataTypes.STRING,
        field: 'status_code',
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

  VendingMachine.associate = (models) => {
    VendingMachine.hasOne(models.VendingMachineStatus, {
      foreignKey: 'status_code',
    });

    VendingMachine.hasOne(models.VendingMachineLocation, {
      foreignKey: 'location_id',
    });

    VendingMachine.belongsToMany(models.Product, {
      through: 'vending_machine_product',
      as: 'products',
      foreignKey: 'machine_id',
      otherKey: 'product_id',
    });
  };

  return VendingMachine;
};

export default vendingMachine;
