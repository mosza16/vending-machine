const product = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      productId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'product_id',
      },
      productCode: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'product_code',
      },
      name: {
        type: DataTypes.STRING,
        field: 'name',
      },
      thPrice: {
        type: DataTypes.DECIMAL,
        field: 'th_price',
        defaultValue: 0,
      },
      note: {
        type: DataTypes.STRING,
        field: 'note',
      },
      imageUrl: {
        type: DataTypes.STRING,
        field: 'image_url',
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

  Product.associate = (models) => {
    Product.hasOne(models.CategoryProduct, {
      foreignKey: 'product_id',
      sourceKey: 'product_id',
      constraints: false
    });
  };

  return Product;
};

export default product;
