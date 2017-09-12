'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Contacts',
      'phone',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    queryInterface.changeColumn(
      'Contacts',
      'latitude',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
    queryInterface.changeColumn(
      'Contacts',
      'longitude',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Contacts',
      'phone',
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isMobilePhone: true
        }
      }
    );
    queryInterface.changeColumn(
      'Contacts',
      'latitude',
      {
        type: t.STRING,
        allowNull: true,
        validate: {
          isLatLong: true
        }
      }
    );
    queryInterface.changeColumn(
      'Contacts',
      'longitude',
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isLatLong: true
        }
      }
    );
  }
};
