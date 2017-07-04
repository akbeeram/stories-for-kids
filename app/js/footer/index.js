/**
 * Created by beeraman on 6/30/2017.
 */
var angular = require('angular');
var footerBlockComponent = require('./footerBlock.component');
angular.module('footerBlockModule', [])
    .component('footerBlock', footerBlockComponent);