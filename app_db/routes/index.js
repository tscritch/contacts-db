var express = require('express');
var router = express.Router();

var contacts = require('../controllers/contacts.controller');

router.get('/', function(req, res) {
  res.send("API HOME");
});


// CONTACT API ROUTES
// ---------------

// get all contacts
router.get('/contacts', contacts.getAll);
// create contact
router.post('/contacts', contacts.create);
// get contact
router.get('/contacts/:id', contacts.get);
// update contact
router.put('/contacts/:id', contacts.update);
// delete contact
router.delete('/contacts/:id', contacts.delete);


module.exports = router;
