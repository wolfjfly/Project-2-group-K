const User = require('./User');
const Request = require('./Request');

User.hasMany(Request, {
  foreignKey: 'receiver_id',
  onDelete: 'CASCADE'
});

Request.belongsTo(User, {
  foreignKey: 'receiver_id'
});

User.hasMany(Request, {
  foreignKey: 'giver_id',
  onDelete: 'SET NULL'
});

Request.belongsTo(User, {
  foreignKey: 'giver_id'
});

module.exports = { User, Request };

