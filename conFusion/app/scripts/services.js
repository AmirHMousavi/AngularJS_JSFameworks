    'use strict';

    angular.module('confusionApp')
        .constant("baseURL", "http://localhost:3000/")
        .service('menuService', ['$resource', 'baseURL', function($resource, baseURL) {

            this.getDishes = function() {
                return $resource(baseURL + "dishes/:id", null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };

            this.getPromotions = function() {
                return $resource(baseURL + "promotions/:id", null, {
                    'update': {
                        method: 'PUT'
                    }
                });
            };

        }])

    .service('corporateService', ['$resource', 'baseURL', function($resource, baseURL) {
        this.getLeaders = function() {
            return $resource(baseURL + "leadership/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
    }])

    .service('feedbackService', ['$resource', 'baseURL', function($resource, baseURL) {
        this.getFeedbacks = function() {
            return $resource(baseURL + "feedbacks/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };
    }]);
