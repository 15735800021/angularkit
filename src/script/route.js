app.config(function($routeProvider){
    $routeProvider.when('/',{
        template:'<h1>好暖啊{{msg}}</h1>',
        controller: function($scope){
            $scope.msg = "ggdg啦";
        }
    })
    .when('/stark',{
        template:'<h1>好暖啊{{msg}}</h1>',
        controller: function($scope){
            $scope.msg = "呵呵呵";
        }
    })
    .when('/goodslist',{
        templateUrl:'goodsList.html',
        controller: 'GoodsController'
    })
})
