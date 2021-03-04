const categoryProduct = (sequelize, DataTypes) => {
  const CategoryProduct = sequelize.define(
    'category_product',
    {
      categoryProductId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'category_product_id',
      },
      productId: {
        type: DataTypes.STRING,
        field: 'product_id',
      },
      categoryId: {
        type: DataTypes.STRING,
        field: 'category_id',
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

  CategoryProduct.associate = (models) => {
    CategoryProduct.hasOne(models.Product, {
      foreignKey: 'product_id',
      constraints: false,
    });
    CategoryProduct.hasOne(models.Category, {
      foreignKey: 'category_id',
    });
  };
  return CategoryProduct;
};

export default categoryProduct;
