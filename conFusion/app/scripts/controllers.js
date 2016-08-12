'use strict';

// menu.html page controllers
angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuService', function($scope, menuService) {
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.dishes = menuService.getDishes();

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

.controller('DishDetailController', ['$scope','$routeParams', 'menuService', function($scope,$routeParams, menuService) {

    $scope.dish = menuService.getDish(parseInt($routeParams.id,10));
    var sort = '-rating';
    $scope.sort = sort;

}])

.controller('DishCommentController', ['$scope', function($scope) {
    //Step 1: Create a JavaScript object to hold the comment from the form
    $scope.theComment = {
        rating: '5',
        comment: "",
        author: "",
        date: ""
    };

    $scope.submitComment = function() {


        //Step 2: This is how you record the date
        $scope.theComment.date = new Date().toISOString();

        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.theComment);

        //Step 4: reset your form to pristine
        $scope.commentForm.$setPristine();
        console.log($scope.theComment);
        //Step 5: reset your JavaScript object that holds your comment
        $scope.theComment = {
            rating: '5',
            comment: "",
            author: "",
            date: ""
        };
    };
}]);
