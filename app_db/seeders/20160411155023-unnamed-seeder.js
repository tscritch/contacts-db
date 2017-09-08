'use strict';

module.exports = {
  up: function (query, Sequelize) {
    return query.bulkInsert('Contact', [
      // put contacts here
      ], {});





  },

  down: function (query, Sequelize) {
    // return query.bulkDelete('Contact', null, {});
  }
};
