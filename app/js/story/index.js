'use strict';
var angular = require('angular');

var storyComponent = require('./story.component');

angular.module('sfk.story', [])
    .component('storyComponent', storyComponent);