angular.module("app", ['ngSanitize'])
  .controller("mainCtrl", function ($scope, $http) {
    $scope.announcements = [];

    const url = "/admin/announcement/db";
    
    $scope.getAnnouncements = function(){
      $http.get(url).then(function(response){
        $scope.announcements = response.data;
      });
    }
    
    $scope.getAnnouncements();
  });