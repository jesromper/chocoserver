'use strict'

var varapiv1chocolatesControllerService = require('./apiv1analyticsControllerService');

module.exports.getAnalytics = function getAnalytics(req, res, next) {
  varapiv1chocolatesControllerService.getAnalytics(req.swagger.params, res, next);
};
