angular.module("app", ['ngSanitize'])
  .controller("mainCtrl", function ($scope, $http) {
    $scope.announcements = [];
    $scope.title;

    const url = "/admin/announcement/db";
    
    $scope.getAnnouncements = function(){
      $http.get(url).then(function(response){
        $scope.announcements = response.data;
      });
    }
    
    $scope.getAnnouncements();
  
    $scope.newAnnouncement = function(){
      var content = document.getElementsByClassName("nicEdit-main")[0].innerHTML;

      //make sure that both fields are filled
      if(!content || !$scope.title){
        alert("Please add a title and content.");
        return;
      }
      
      const data = {
        title: $scope.title,
        text: content,
        date: (new Date()).toString()
      }
      
      console.log(data);
      
      $http.post(url, data).then(function(response){
        console.log("Announcement posted.");
      });
      
      //set fields to be blank
      $scope.title = "";
      document.getElementsByClassName("nicEdit-main")[0].innerHTML = "";
      
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