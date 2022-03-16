'use strict'

var db = require('../db');
var logger = require("../logger");

module.exports.getAnalytics = function getAnalytics(req, res, next) {

  db.find({}, function (err, chocolates) {
    if (err) {
      logger.error('Error getting data from DB');
      res.sendStatus(500); // internal server error
    } else {
      logger.debug("Sending chocolates: " + JSON.stringify(chocolates, 2, null));
      res.send({elements:chocolates.length});
    }
  });
  
};

