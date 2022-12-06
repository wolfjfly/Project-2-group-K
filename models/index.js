const User = require('./User');
const Request = require('./Request.js');
const Give = require('/.Give');

User.hasMany(Request, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Project.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Give, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Give.belongsTo(User, {
    foreignKey: 'user_id'
  });
module.exports = { User, Request, Give };

