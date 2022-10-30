module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales_products',
    },
  );

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { as: 'sales', foreignKey: 'saleId' });
    SaleProduct.belongsTo(models.Product, {
      as: 'product',
      foreignKey: 'productId',
    });
  };

  return SaleProduct;
};
