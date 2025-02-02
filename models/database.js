const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const StudySession = sequelize.define('StudySession', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE
  }
});

(async () => {
  await sequelize.sync();
  console.log('Base de dados conectada e sincronizada!');
})();

module.exports = { StudySession };