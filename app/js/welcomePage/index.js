/**
 * Created by beeraman on 6/30/2017.
 */
var angular = require('angular');
var welcomePageComponent = require('./welcomePage.component');
angular.module('welcomeModule', [])
    .component('welcomePage', welcomePageComponent);