const category = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'category',
    {
      categoryId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'category_id',
      },
      categoryCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'category_code',
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      note: {
        type: DataTypes.STRING,
        field: 'note',
      },
      iconUrl: {
        type: DataTypes.STRING,
        field: 'icon_url',
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
  return Category;
};

export default category;
