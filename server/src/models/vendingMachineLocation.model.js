const vendingMachineLocation = (sequelize, DataTypes) => {
  const VendingMachineLocation = sequelize.define(
    'vending_machine_location',
    {
      locationId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'location_id',
      },
      subdistrictCode: {
        type: DataTypes.STRING,
        field: 'subdistrict_code',
      },
      districtCode: {
        type: DataTypes.STRING,
        field: 'district_code',
      },
      provinceCode: {
        type: DataTypes.STRING,
        field: 'province_code',
      },
      countryCode: {
        type: DataTypes.STRING,
        field: 'country_code',
        defaultValue: 'TH',
      },
      longitude: {
        type: DataTypes.STRING,
        field: 'longitude',
      },
      latitude: {
        type: DataTypes.STRING,
        field: 'latitude',
      },
      note: {
        type: DataTypes.STRING,
        field: 'note',
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

  VendingMachineLocation.associate = (models) => {
    VendingMachineLocation.hasOne(models.VendingMachine, {
      foreignKey: 'machine_id',
    });
  };

  return VendingMachineLocation;
};

export default vendingMachineLocation;
