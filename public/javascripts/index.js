angular.module("app", [])
  .controller("mainCtrl", function ($scope, $http) {
    // tada! a users array will now be bound to and made available to our html template
    $scope.name = "";
    $scope.email = "";
    $scope.phone = "";

    const url = "/admin/contact/db";
    
    $scope.newContact = function(){
      
      var data = {
        name: $scope.name,
        email: $scope.email,
        phone: $scope.phone
      }
      
      $http.post(url,data).then(function(response){
        console.log(response);
      });
      
      $scope.name = "";
      $scope.email = "";
      $scope.phone = "";
      
      alert("Thank you! We will be in touch with you shortly.");
      
      return false;
    }
    
    
  });