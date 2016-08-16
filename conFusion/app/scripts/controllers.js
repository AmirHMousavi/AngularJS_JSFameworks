'use strict';

// menu.html page controllers
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = false;
        $scope.message = "Loading ...";
        $scope.dishes = menuService.getDishes().query(function(response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }

        );
        $scope.toggleDetails = function() {
            $scope.showDetails = !$scope.showDetails;
        };
        $scope.select = function(setTab) {
            $scope.tab = setTab;
            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };
        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };
    }])

// contactus.html controllers
.controller('ContactController', ['$scope', function($scope) {
        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };
        var channels = [{
            value: "tel",
            label: "Tel."
        }, {
            value: "Email",
            label: "Email"
        }];
        $scope.channels = channels;
        $scope.invalidChannelSelection = false;
    }])
    // Feedback form controller
    .controller('FeedbackController', ['$scope', function($scope) {
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
    }])
    // dishdetail.html controllers
    .controller('DishDetailController', ['$scope', '$stateParams', 'menuService', function($scope, $stateParams, menuService) {
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuService.getDishes().get({
            id: parseInt($stateParams.id, 10)
        }).$promise.then(
            function(response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        var sort = '-rating';
        $scope.sort = sort;
    }])
    // commentForm controller
    .controller('DishCommentController', ['$scope', 'menuService', function($scope, menuService) {
        // Step 1: Create a JavaScript object to hold the comment from the form
        $scope.theComment = {
            rating: '5',
            comment: "",
            author: "",
            date: ""
        };

        $scope.submitComment = function() {
            // Step 2: This is how you record the date
            $scope.theComment.date = new Date().toISOString();
            // Step 3: Push your comment into the dish's comment array
            $scope.dish.comments.push($scope.theComment);
            menuService.getDishes().update({
                id: $scope.dish.id
            }, $scope.dish);
            // Step 4: reset your form to pristine
            $scope.commentForm.$setPristine();
            // Step 5: reset your JavaScript object that holds your comment
            $scope.theComment = {
                rating: '5',
                comment: "",
                author: "",
                date: ""
            };
        };
    }])
    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', '$stateParams', 'menuService', 'corporateService', function($scope, $stateParams, menuService, corporateService) {
        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.leader = corporateService.getLeader(3);
        $scope.promotion = menuService.getPromotion(0);
        $scope.featuredDish = menuService.getDishes().get({
            id: 0
        }).$promise.then(
            function(response) {
                $scope.featuredDish = response;
                $scope.showDish = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }])
    .controller('AboutController', ['$scope', '$stateParams', 'corporateService', function($scope, $stateParams, corporateService) {
        $scope.leaders = corporateService.getLeaders();

    }]);
