const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from a .env file

// Use environment variables for sensitive information
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_PATH || 'database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false, // Enable logging in development
  pool: {
    max: 10, // Maximum number of connection pools
    min: 0,
    acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
    idle: 10000 // Maximum time, in milliseconds, that a connection can be idle before being released
  }
});

const StudySession = sequelize.define('StudySession', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE
  }
}, {
  indexes: [
    {
      unique: false,
      fields: ['startTime'] // Index the startTime field for faster queries
    }
  ]
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synchronized!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = { StudySession };
