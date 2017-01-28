(function(angular){
   'use strict';

    angular.module('welcomeModule',['directiveModule'])
        .controller('welcomeController',function($scope){
            $scope.storyCategory=[
                {name:'Panchatantra Stories',
                 img_loc:'images/story-tiles/panchatantra.jpg'
                },
                {name:'Sindbad the Sailor',
                 img_loc:'images/story-tiles/sindbad-the-sailor.jpg'
                },
                {name:'Tenali Raman Stories',
                 img_loc:'images/story-tiles/tenali-raman.png'
                },
                {name:'AKbar and Birbal Stories',
                 img_loc:'images/story-tiles/akbar-and-birbal.jpg'
                },
                {name:'Vikram and Betal Stories',
                 img_loc:'images/story-tiles/vikram-betal.jpg'
                },
                {name:'Arabian Nigths Stories',
                 img_loc:'images/story-tiles/arabian-nights.jpg'
                },
                {name:'Aesops Fables',
                 img_loc:'images/story-tiles/aesop-fables.jpg'
                },
                {name:'Grimm Fairy Tales',
                 img_loc:'images/story-tiles/grimm-tales.jpg'
                }
            ];
        
            $scope.openLoginLightBox=function(){
                //if user logged in take them to dashboard
                //if user not logged in show login light box
                $scope.showLoginForm = true;
                $scope.$broadcast('showLoginFormEvent', {
                  showLoginForm: true 
                });
            }
        });
}(angular));