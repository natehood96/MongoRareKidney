angular.module("app", [])
  .controller("mainCtrl", function ($scope, $http) {
    // tada! a users array will now be bound to and made available to our html template
    $scope.announcements = [];
    $scope.title;
    $scope.text;

    const url = "/admin/announcement/db";
    
    $scope.getAnnouncements = function(){
      $http.get(url).then(function(response){
        $scope.announcements = response.data;
      });
    }
    
    $scope.getAnnouncements();
  
    $scope.newAnnouncement = function(){
      const data = {
        title: $scope.title,
        text: $scope.text,
        date: (new Date()).toString()
      }
      
      console.log(data);
      
      $http.post(url, data).then(function(response){
        console.log("Announcement posted.");
      });
      
      //set fields to be blank
      $scope.title = "";
      $scope.text = "";
      
      //fetch announcements again
      $scope.getAnnouncements();
      
      return false;
    }
    
    $scope.delete = function(a){
      $http.delete(url + "/" + a._id).then(function(response){
        console.log(response);
        $scope.getAnnouncements();
      });
    }
    
    
  });