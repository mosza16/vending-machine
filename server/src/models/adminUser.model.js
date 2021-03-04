const adminUser = (sequelize, DataTypes) => {
  const AdminUser = sequelize.define(
    'adminUser',
    {
      userId: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        primaryKey: true,
        field: 'user_id',
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'email',
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        field: 'phone',
      },
      password: {
        type: DataTypes.STRING,
        field: 'password',
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'firstName',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
      },
      profileUrl: {
        type: DataTypes.STRING,
        field: 'last_name',
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
  return AdminUser;
};

export default adminUser;
