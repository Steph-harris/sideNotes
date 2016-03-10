//Sequelize database setup
var Sequelize = require("sequelize");
var sequelize = new Sequelize('side_notes_db', 'root');
// var connection = new Sequelize(process.env.JAWSDB_URL);
var User = sequelize.define('user', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

var Note = sequelize.define('note', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.hasMany(Note);

module.exports = sequelize;
