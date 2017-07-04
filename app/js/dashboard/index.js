/**
 * Created by beeraman on 6/30/2017.
 */
var angular = require('angular');
require('../services');
//var dashboard = require('./dashboard.module');

var dashRoutes = require('./dashboard.routes');
var dashBoardMain = require('./dashboard.component');
angular.module('dashboardModule', [
    'servicesModule'
])
    .config(dashRoutes)
    .component('dashBoardMain', dashBoardMain);