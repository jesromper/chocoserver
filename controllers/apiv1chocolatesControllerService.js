'use strict'

var db = require('../db');
var logger = require("../logger");

module.exports.getChocolates = function getChocolates(req, res, next) {
  logger.info("New GET request to /chocolates");
  db.find({}, function (err, chocolates) {
    if (err) {
      logger.error('Error getting data from DB');
      res.sendStatus(500); // internal server error
    } else {
      logger.debug("Sending chocolates: " + JSON.stringify(chocolates, 2, null));
      res.send(chocolates);
    }
  },{limit: 15});
};

module.exports.addChocolate = function addChocolate(req, res, next) {
  var newChocolate = req.chocolate.value;
  if (!newChocolate) {
    logger.warn("New POST request to /chocolates/ without chocolate, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    logger.info("New POST request to /chocolates with body: " + JSON.stringify(newChocolate, 2, null));
    if (!newChocolate.name || !newChocolate.owner || newChocolate.frutos_secos === null || !newChocolate.tipo || !newChocolate.precio) {
      logger.warn("The chocolate " + JSON.stringify(newChocolate, 2, null) + " is not well-formed, sending 422...");
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ "name": newChocolate.name }, function (err, chocolates) {
        if (err) {
          logger.error('Error getting data from DB');
          res.sendStatus(500); // internal server error
        } else {
          if (chocolates.length > 0) {
            logger.warn("The chocolate " + JSON.stringify(newChocolate, 2, null) + " already exists, sending 409...");
            res.sendStatus(409); // conflict
          } else {
            logger.debug("Adding chocolate " + JSON.stringify(newChocolate, 2, null));
            db.insert(newChocolate);
            res.sendStatus(201); // created
          }
        }
      });
    }
  }
};
