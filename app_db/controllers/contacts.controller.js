var models = require('../models');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var Contact = {};

Contact.getAll = function(req, res) {
  var page = req.query.page ? { limit: 100, offset: parseInt(req.query.page) * 100 } : null;
  if (page) {
    models.Contact.findAll(page).then(function(contacts) {
      res.status(200);
      res.json(contacts);
    });
  }
  else {
    models.Contact.findAll().then(function(contacts) {
      res.status(200);
      res.json(contacts);
    });
  }

};

// Create
Contact.create = function (req, res) {

  var b = req.body;

  if (!b.contact) {
    sendJSONResponse(res, 422, {"message": "contact is a required field in body"});
    return;
  }

  if (!b.contact.firstname) {
    sendJSONResponse(res, 422, {"message": "name is a required field in contact"});
    return;
  }

  models.Contact.create(b.contact).then(function(contact) {
    if(contact) {
      sendJSONResponse(res, 200, contact);
    }
    else {
      sendJSONResponse(res, 500, {"message": "There was an error creating the contact"});
    }
  }, function (error) {
    sendJSONResponse(res, 422, {"message": JSON.stringify(error.message)});
  });
};


// Get Contact
Contact.get = function(req, res) {
  if(!req.params.id) {
    sendJSONResponse(res, 422, {"message": "id is a required parameter"});
    return;
  }

  models.Contact.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(contact) {
    if(contact) {
      sendJSONResponse(res, 200, contact);
    }
    else {
      sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.id + " could not be found"});
    }
  }, function (error) {
    sendJSONResponse(res, 422, {"message": error.message});
  });
};

// Update Contact
Contact.update = function (req, res) {

  var b = req.body;

  if(!req.params.id) {
    sendJSONResponse(res, 422, {"message": "id is a required parameter"});
    return;
  }

  if (!b.contact) {
    sendJSONResponse(res, 422, {"message": "contact is a required field in body"});
    return;
  }

  models.Contact.update(b.contact, {
    where: {
      id: req.params.id
    },
    returning: true,
    fields: Object.keys(b.contact)
  }).then(function(contact) {
    if(contact) {
      sendJSONResponse(res, 200, contact);
    }
    else {
      sendJSONResponse(res, 500, {"message": "something went wrong"});
    }
  }, function (error) {
    sendJSONResponse(res, 422, {"message": error.message});
  });
};

// Delete Contact
Contact.delete = function (req, res) {
  if(!req.params.id) {
    sendJSONResponse(res, 422, {"message": "id is a required parameter"});
    return;
  }

  models.Contact.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(contact) {
    if(contact) {
      sendJSONResponse(res, 204, null);
    }
    else {
      sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.id + " could not be found"});
    }
  }, function (error) {
    sendJSONResponse(res, 422, {"message": error.message});
  });
};

module.exports = Contact;
