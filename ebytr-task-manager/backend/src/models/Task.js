const { DataTypes } = require('sequelize');
const User = require('./User');
const db = require('../database');

const Task = db.define('tasks', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pendente',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: false,
  underscored: true,
});

User.hasMany(Task, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Task.belongsTo(User);

(async () => {
  await db.sync({ force: false });
})();

module.exports = Task;
