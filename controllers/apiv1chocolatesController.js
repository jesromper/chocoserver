'use strict'

var varapiv1chocolatesController = require('./apiv1chocolatesControllerService');

module.exports.getChocolates = function getChocolates(req, res, next) {
  varapiv1chocolatesController.getChocolates(req.swagger.params, res, next);
};

module.exports.addChocolate = function addChocolate(req, res, next) {
  varapiv1chocolatesController.addChocolate(req.swagger.params, res, next);
};
