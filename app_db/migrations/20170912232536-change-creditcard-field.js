'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Contacts',
      'ccNumber',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'Contacts',
      'ccNumber',
      {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isCreditCard: true
        }
      }
    );
  }
};
