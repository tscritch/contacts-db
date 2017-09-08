'use strict';
module.exports = function(sequelize, t) {
  var Contact = sequelize.define('Contact', {
    title: {
      type: t.STRING,
      allowNull: true
    },
    gender: {
      type: t.STRING,
      validate: {
        isIn: [['male', 'female', null]]
      }
    },
    firstname: {
      type: t.STRING,
      allowNull: true
    },
    middleinitial: {
      type: t.STRING,
      allowNull: true,
      validate: {
        len: [1,1]
      }
    },
    lastname: {
      type: t.STRING,
      allowNull: true
    },
    streetAddress: {
      type: t.STRING,
      allowNull: true
    },
    city: {
      type: t.STRING,
      allowNull: true
    },
    state: {
      type: t.STRING,
      allowNull: true
    },
    zipcode: {
      type: t.STRING,
      allowNull: true
    },
    country: {
      type: t.STRING,
      allowNull: true
    },
    email: {
      type: t.STRING,
      allowNull: false,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
      }
    },
    username: {
      type: t.STRING,
      allowNull: false
    },
    password: {
      type: t.STRING,
      allowNull: false
    },
    browser: {
      type: t.STRING,
      allowNull: false
    },
    phone: {
      type: t.STRING,
      allowNull: true,
      validate: {
        isMobilePhone: true
      }
    },
    phoneCountryCode: {
      type: t.STRING,
      allowNull: true
    },
    mothersMadien: {
      type: t.STRING,
      allowNull: true
    },
    birthday: {
      type: t.DATE,
      allowNull: true
    },
    age: {
      type: t.INTEGER,
      allowNull: true
    },
    ccType: {
      type: t.STRING,
      allowNull: true
    },
    ccNumber: {
      type: t.STRING,
      allowNull: true,
      validate: {
        isCreditCard: true
      }
    },
    ccv2: {
      type: t.INTEGER,
      allowNull: true
    },
    ccExpires: {
      type: t.STRING,
      allowNull: true
    },
    nationalId: {
      type: t.STRING,
      allowNull: true
    },
    ups: {
      type: t.STRING,
      allowNull: true
    },
    westernUnionMTCN: {
      type: t.STRING,
      allowNull: true
    },
    moneyGramMTCN: {
      type: t.STRING,
      allowNull: true
    },
    color: {
      type: t.STRING,
      allowNull: true
    },
    occupation: {
      type: t.STRING,
      allowNull: true
    },
    company: {
      type: t.STRING,
      allowNull: true
    },
    vehicle: {
      type: t.STRING,
      allowNull: true
    },
    domain: {
      type: t.STRING,
      allowNull: true
    },
    guid: {
      type: t.STRING,
      allowNull: true
    },
    latitude: {
      type: t.STRING,
      allowNull: true,
      validate: {
        isLatLong: true
      }
    },
    latitude: {
      type: t.STRING,
      allowNull: true,
      validate: {
        isLatLong: true
      }
    },
  });
  return Contact;
};
