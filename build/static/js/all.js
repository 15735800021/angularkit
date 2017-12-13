var app = angular.module('starkapp',[
    'ngRoute',
    'controllers',
    'services'
]);
angular.module('controllers',[]);
angular.module('services',[]);
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

angular.module('controllers').controller('GoodsController',[
    '$scope',
    '$route',
    '$routeParams',
    'GoodsService',
    function(
        $scope,
        $route,
        $routeParams,
        GoodsService
){
    $scope.goodsList = GoodsService.fetchGoodsList();
}])
angular.module('starkapp')
    .factory('GoodsService',['$http',function($http){
        return{
            fetchGoodsList:function(){
                return $http.get('https://easy-mock.com/mock/59664d4d58618039284c7710/example/goods/list').then(function(data){
                    return data;
                })
            }
        }
}])