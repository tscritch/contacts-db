'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Contacts', {
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['male', 'female', null]]
        }
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      middleinitial: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: [1,1]
        }
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      streetAddress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true
      },
      browser: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isMobilePhone: true
        }
      },
      phoneCountryCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      mothersMadien: {
        type: Sequelize.STRING,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ccType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ccNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isCreditCard: true
        }
      },
      ccv2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      ccExpires: {
        type: Sequelize.STRING,
        allowNull: true
      },
      nationalId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      ups: {
        type: Sequelize.STRING,
        allowNull: true
      },
      westernUnionMTCN: {
        type: Sequelize.STRING,
        allowNull: true
      },
      moneyGramMTCN: {
        type: Sequelize.STRING,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      occupation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company: {
        type: Sequelize.STRING,
        allowNull: true
      },
      vehicle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      domain: {
        type: Sequelize.STRING,
        allowNull: true
      },
      guid: {
        type: Sequelize.STRING,
        allowNull: true
      },
      latitude: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isLatLong: true
        }
      },
      longitude: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isLatLong: true
        }
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Contacts');
  }
};
