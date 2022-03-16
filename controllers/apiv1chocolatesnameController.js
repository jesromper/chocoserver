'use strict'

var varapiv1chocolatesnameController = require('./apiv1chocolatesnameControllerService');

module.exports.findChocolateByname = function findChocolateByname(req, res, next) {
  varapiv1chocolatesnameController.findChocolateByname(req.swagger.params, res, next);
};

module.exports.deleteChocolate = function deleteChocolate(req, res, next) {
  varapiv1chocolatesnameController.deleteChocolate(req.swagger.params, res, next);
};

module.exports.updateChocolate = function updateChocolate(req, res, next) {
  varapiv1chocolatesnameController.updateChocolate(req.swagger.params, res, next);
};