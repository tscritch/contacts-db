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
    streetaddress: {
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
      allowNull: true,
      validate: {
        is: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
      }
    }
  },
  });
  return Contact;
};
