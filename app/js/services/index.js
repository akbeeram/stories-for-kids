/**
 * Created by beeraman on 6/30/2017.
 */
var angular = require('angular');

//var appModule = require('../app/app.module');
var categoryService = require('./categoryService');
var authService = require('./authService');
var StoryService = require('./storyService');
var localStorageService = require('./localStorageService');

angular.module('servicesModule',[])
    .service('categoryService', categoryService)
    .service('authService', authService)
    .service('StoryService', StoryService)
    .service('localStorageService', localStorageService);