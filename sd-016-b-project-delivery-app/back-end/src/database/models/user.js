module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    timestamps: false,
    underscored: false,
    tableName: 'users'
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, { as: 'user', foreignKey: 'userId' });
    User.hasMany(models.Sale, { as: 'seller', foreignKey: 'sellerId' });
  };

  return User;
};
