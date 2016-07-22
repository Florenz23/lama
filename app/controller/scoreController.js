angular.module('myApp', ['ui.router'])
    .controller('scoreCtrl', function($scope, $http) {
        $http.post('ajax/getPosts.php').success(function(data){
            $scope.posts = data;
        });
        $scope.upVote = function(post){
            post.votes++;
            updateVote(post.id,post.votes);
        };
        $scope.downVote = function(post){
            post.votes--;
            updateVote(post.id,post.votes);
        };
        function updateVote(id,votes){
            $http.post('ajax/updateVote.php?id='+id+'&votes='+votes);
        }
    });
