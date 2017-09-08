var models = require('../models');

var sendJSONResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var Contact = {};

Contact.getAll = function(req, res) {
  models.Contacts.findAll().then(function(contacts) {
    res.status(200);
    res.json(contacts);
});

// Create
Contact.create = function (req, res) {
  if(!req.params.sprintId) {
    sendJSONResponse(res, 404, {"message": "sprintId is a required parameter"});
    return;
  }
  if(!req.body.contacttitle) {
    sendJSONResponse(res, 404, {"message": "contacttitle is a required value in body"});
    return;
  }
  else if(!req.body.score) {
    sendJSONResponse(res, 404, {"message": "score is a required value in body"});
    return;
  }
  else if(!req.body.teammemberid) {
    sendJSONResponse(res, 404, {"message": "teammemberid is a required value in body"});
    return;
  }
  else if(!req.body.contactdesc) {
    sendJSONResponse(res, 404, {"message": "contactdesc is a required value in body"});
    return;
  }

  if(req.body.section !== undefined && req.body.section !== 'todo' && req.body.section !== 'progress' && req.body.section !== 'done') {
    sendJSONResponse(res, 404, {"message": "section must equal one of the following: todo, progress, or done or must be left null"});
    return;
  }

  models.Sprint.findOne({
    where: {
      sprintId: req.params.sprintId
    }
  }).then(function (sprint) {
    if(sprint) {
      var b = req.body;
      models.TeamMember.findOne({
        where: {
          teamMemberId: b.teammemberid
        }
      }).then(function(member) {
        if(member) {
          models.User.findOne({
            where: {
              userId: member.userId
            }
          }).then(function(user) {
            if(user) {
              models.Contact.create({
                contactTitle: b.contacttitle,
                contactDescription: b.contactdesc,
                sprintBaordPositionX: b.sprintposx,
                sprintBaordPositionY: b.sprintposy,
                backlogPositionX: b.backlogposx,
                backlogPositionY: b.backlogposy,
                section: b.section,
                score: parseInt(b.score),
                teamMemberId: member.teamMemberId,
                userId: user.userId,
                sprintId: req.params.sprintId
              }).then(function(contact) {
                if(contact) {
                  sendJSONResponse(res, 200, contact);
                }
                else {
                  sendJSONResponse(res, 500, {"message": "There was an error creating the contact"});
                }
              }, function(err) {
                sendJSONResponse(res, 500, err);
              });
            }
            else {
              sendJSONResponse(res, 404, {"message": "A user with the id: " + member.userId + " could not be found"});
            }
          }, function(err) {
            sendJSONResponse(res, 500, err);
          });
        }
        else {
          sendJSONResponse(res, 404, {"message": "team member with the id: " + req.params.teammemberid + " could not be found"});
        }
      }, function(err) {
        sendJSONResponse(res, 500, err);
      });
    }
    else {
      sendJSONResponse(res, 404, {"message": "Sprint with the id: " + req.params.sprintId + " could not be found"});
    }
  }, function(err) {
    sendJSONResponse(res, 500, err);
  });
};


// Get Contact
Contact.get = function(req, res) {
  if(!req.params.contactId) {
    sendJSONResponse(res, 404, {"message": "contactId is a required parameter"});
    return;
  }

  models.Sprint.findOne({
    where: {
      contactId: req.params.contactId
    }
  }).then(function(sprint) {
    if(sprint) {
      models.Contact.findOne({
        include: [{model: models.TeamMember, include: [{model: models.User, attributes: ['firstName', 'lastName']}]}],
        where: {
          contactId: req.params.contactId
        }
      }).then(function(contact) {
        if(contact) {
          sendJSONResponse(res, 200, contact);
        }
        else {
          sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.contactId + " could not be found in the sprint: " + sprint.sprintName});
        }
      }, function(err) {
        sendJSONResponse(res, 500, err);
      });
    }
    else {
      sendJSONResponse(res, 404, {"message": "A sprint with the id: " + req.params.sprintId + " could not be found"});
    }
  }, function(err) {
    sendJSONResponse(res, 500, err);
  });
};

Contact.update = function (req, res) {
  if(!req.params.contactId) {
    sendJSONResponse(res, 404, {"message": "contactId is a required parameter"});
    return;
  }

  var b = req.body;
  if(!b.contacttitle && !b.sprintPosx && !b.sprintPosy && !b.backlogPosx && !b.backlogPosy && !b.section && !b.score && !b.newteammemberid && !b.newsprint && !b.contactdesc) {
    sendJSONResponse(res, 404, {"message": "At least one new value is required to update a contact: contacttitle, posx, posy, section, score, newsprint"});
    return;
  }

  models.Sprint.findOne({
    where: {
      sprintId: req.params.sprintId
    }
  }).then(function(sprint) {
    if(sprint) {
      models.Contact.findOne({
        where: {
          contactId: req.params.contactId
        }
      }).then(function(contact) {
        if(contact) {
          // check if the value was provided otherwise don't change it and keep the original
          if(!b.contacttitle) {
            b.contacttitle = contact.contactTitle;
          }
          if(!b.contactdesc) {
            b.contactdesc = contact.contactDescription;
          }
          if(!b.sprintPosx) {
            b.posx = contact.sprintBoardPositionX;
          }
          if(!b.sprintPosy) {
            b.posy = contact.sprintBoardPositionY;
          }
          if(!b.backlogPosx) {
            b.posx = contact.backlogPositionX;
          }
          if(!b.backlogPosy) {
            b.posy = contact.backlogPositionY;
          }
          if(!b.section) {
            b.section = contact.section;
          }
          if(!b.score) {
            b.score = contact.score;
          }
          if(!b.newteammemberid) {
            b.newteammemberid = contact.teamMemberId;
          }
          if(!b.newsprint) {
            b.newsprint = contact.sprintId;
          }

          models.Contact.update({
            contactTitle: b.contacttitle,
            contactDescription: b.contactdesc,
            sprintBoardPositionX: parseFloat(b.sprintPosx),
            sprintBoardPositionY: parseFloat(b.sprintPosy),
            backlogPositionX: parseFloat(b.backlogPosx),
            backlogPositionY: parseFloat(b.backlogPosy),
            section: b.section,
            score: parseInt(b.score),
            teamMemberId: b.newteammemberid,
            sprintId: b.newsprint
          }, {
            where: {
              contactId: req.params.contactId
            },

            returning: true
          }).then(function(updatedContact) {
            if(updatedContact) {
              models.Contact.findOne({
                include: [{model: models.TeamMember, include: [{model: models.User, attributes: ['firstName', 'lastName']}]}],
                where: {
                  // contact is wrapped in changed values array.
                  // This only changes 1 value so I return the first one.
                  contactId: updatedContact[1][0].contactId
                }
              }).then(function(newcontact) {
                if(newcontact) {
                  sendJSONResponse(res, 200, newcontact);
                }
                else {
                  sendJSONResponse(res, 404, {"message": "A contact was updated but something went wrong :("});
                }
              });

            }
            else {
              sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.contactId + " could not be found in the sprint: " + sprint.sprintName});
            }
          }, function(err) {
            console.log(err);
            sendJSONResponse(res, 500, err);
          });
        }
        else {
          sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.contactId + " was not found in sprint: " + req.params.sprintId});
        }
      }, function(err) {
        sendJSONResponse(res, 500, JSON.stringify(err));
      });

    }
    else {
      sendJSONResponse(res, 404, {"message": "A sprint with the id: " + req.params.sprintId + " could not be found"});
    }
  }, function(err) {
    console.log(err);
    sendJSONResponse(res, 500, err);
  });
};

// Delete Contact
Contact.delete = function (req, res) {
  if(!req.params.contactId) {
    sendJSONResponse(res, 404, {"message": "contactId is a required parameter"});
    return;
  }

  models.Sprint.findOne({
    where: {
      sprintId: req.params.sprintId
    }
  }).then(function(sprint) {
    if(sprint) {
      models.Contact.destroy({
        where: {
          contactId: req.params.contactId
        }
      }).then(function(contact) {
        if(contact) {
          sendJSONResponse(res, 204, null);
        }
        else {
          sendJSONResponse(res, 404, {"message": "A contact with the id: " + req.params.contactId + " could not be found in the sprint: " + sprint.sprintName});
        }
      }, function(err) {
        sendJSONResponse(res, 500, JSON.stringify(err));
      });
    }
    else {
      sendJSONResponse(res, 500, JSON.stringify(err));
    }
  });
};

module.exports = Contact;
