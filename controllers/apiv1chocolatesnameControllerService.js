'use strict'

var db = require('../db');
var logger = require("../logger");

module.exports.findChocolateByname = function findChocolateByname(req, res, next) {
  var name = req.name.value;
  if (!name) {
    logger.warn("New GET request to /chocolates/:name without name, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    logger.info("New GET request to /chocolates/" + name);
    db.find({ "name": name }, function (err, filteredchocolates) {
      if (err) {
        logger.error('Error getting data from DB');
        res.sendStatus(500); // internal server error
      } else {
        if (filteredchocolates.length > 0) {
          var chocolate = filteredchocolates[0]; //since we expect to have exactly ONE chocolate with this name
          logger.debug("Sending chocolate: " + JSON.stringify(chocolate, 2, null));
          res.send(chocolate);
        } else {
          logger.warn("There are no chocolates with name " + name);
          res.sendStatus(404); // not found
        }
      }
    });
  }
};

module.exports.deleteChocolate = function deleteChocolate(req, res, next) {
  var name = req.name.value;
  if (!name) {
    logger.warn("New DELETE request to /chocolates/:name without name, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    logger.info("New DELETE request to /chocolates/" + name);
    db.remove({ "name": name }, function (err, numRemoved) {
      if (err) {
        logger.error('Error removing data from DB');
        res.sendStatus(500); // internal server error
      } else {
        logger.info("chocolates removed: " + numRemoved);
        console.info(numRemoved);
        if (numRemoved === 1) {
          logger.debug("The chocolate with name " + name + " has been succesfully deleted, sending 204...");
          res.sendStatus(204); // no content
        } else {
          logger.warn("There are no chocolates to delete");
          res.sendStatus(404); // not found
        }
      }
    });
  }
};

module.exports.updateChocolate = function updateChocolate(req, res, next) {
  var updatedChocolate = req.chocolate.value;
  var name = req.name.value;
  if (!updatedChocolate) {
    logger.warn("New PUT request to /chocolates/ without chocolate, sending 400...");
    res.sendStatus(400); // bad request
  } else {
    logger.info("New PUT request to /chocolates/" + name + " with data " + JSON.stringify(updatedChocolate, 2, null));
    if (!updatedChocolate.name || !updatedChocolate.episodes || !updatedChocolate.premiere || !updatedChocolate.on_air || !updatedChocolate.demographic || !updatedChocolate.genres || !updatedChocolate.themes) {
      logger.warn("The chocolate " + JSON.stringify(updatedChocolate, 2, null) + " is not well-formed, sending 422...");
      res.sendStatus(422); // unprocessable entity
    } else {
      db.find({ "name": updatedChocolate.name }, function (err, chocolates) {
        if (err) {
          logger.error('Error getting data from DB');
          res.sendStatus(500); // internal server error
        } else {
          if (chocolates.length > 0) {
            db.update({ name: name }, updatedChocolate);
            logger.debug("Modifying chocolate with name " + name + " with data " + JSON.stringify(updatedChocolate, 2, null));
            res.sendStatus(204); // no content
          } else {
            logger.warn("There are not any chocolate with name " + name);
            res.sendStatus(404); // not found
          }
        }
      });
    }
  }
};