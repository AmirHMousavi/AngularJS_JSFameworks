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
            email: "",
            date: ""
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
    .controller('FeedbackController', ['$scope', 'feedbackService', function($scope, feedbackService) {
        $scope.feedbacks = feedbackService.getFeedbacks().query(function(response) {
            $scope.feedbacks = response;
        });
        $scope.sendFeedback = function() {
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback.date = new Date().toISOString();
                feedbackService.getFeedbacks().save($scope.feedback);

                $scope.feedbackForm.$setPristine();
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: "",
                    date: ""
                };
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

        var sort = '';
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
        $scope.showLeader = false;
        $scope.showPromotion = false;
        $scope.message = "Loading ...";

        $scope.leader = corporateService.getLeaders().get({
            id: 3
        }).$promise.then(
            function(response) {
                $scope.leader = response;
                $scope.showLeader = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
        $scope.promotion = menuService.getPromotions().get({
            id: 0
        }).$promise.then(
            function(response) {
                $scope.promotion = response;
                $scope.showPromotion = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
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
        $scope.showLeaders = false;
        $scope.message = "Loading ...";
        $scope.leaders = corporateService.getLeaders().query(function(response) {
                $scope.leaders = response;
                $scope.showLeaders = true;
            },
            function(response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    }]);
