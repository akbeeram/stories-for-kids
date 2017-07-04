/**
 * Created by beeraman on 6/30/2017.
 */
var angular = require('angular');

var headerBlock = require('./headerBlock.component');

angular.module('headerBlockModule', [])
    .component('headerBlock', headerBlock);