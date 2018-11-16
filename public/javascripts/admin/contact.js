angular.module("app", [])
  .controller("mainCtrl", function ($scope, $http) {
    // tada! a users array will now be bound to and made available to our html template
    $scope.contacts = [];

    const url = "/admin/contact/db";
    
    $scope.getContacts = function(){
      $http.get(url).then(function(response){
        $scope.contacts = response.data;
      });
    }
    
    $scope.getContacts();
    
    $scope.delete = function(c){
      $http.delete(url + "/" + c._id).then(function(response){
        console.log(response);
        $scope.getContacts();
      });
    }
    
    
  });