/**
 * Created by beeraman on 6/30/2017.
 */
'use strict';
var angular = require('angular');
require('../services');
require('../welcomePage');
require('../footer');
require('../header');
require('../boringStuff');
require('../dashboard');
require('../story');

require('./app.module.less');

module.exports = angular.module('storiesApp',[
        'ui.router',
        'ngSanitize',
        'servicesModule',
        'welcomeModule',
        'footerBlockModule',
        'headerBlockModule',
        //'AuthenticationService',
        //'StoryService',
        'boringStuff',
        'sfk.story'
        //'adminModule',
        //'dashboardModule'
        //'localStorageModule'
    ]);