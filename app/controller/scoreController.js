angular.module('myApp', ['ui.router'])
    .controller('scoreCtrl', function($scope, $http) {
        $http.post('ajax/getPosts.php').success(function(data){
            $scope.pStars = data;
        });
        $scope.upVote = function(post){
            post.pStarVotes++;
            updateVote(post.id,post.pStarVotes);
        };
        $scope.downVote = function(post){
            post.pStarVotes--;
            updateVote(post.id,post.pStarVotes);
        };
        function updateVote(id,votes){
            console.log(id);
            console.log(votes);
            $http({
                method: 'post',
                url: 'ajax/updateVote.php?id='+id+'&votes='+votes,
                data: $.param({'id': id, 'votes': votes}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                success(function (data, status, headers, config, error) {
                    if (data.success) {

                    } else {
                        console.log(data);
                    }
                }).
                error(function (data, status, headers, config) {
                    //$scope.codeStatus = response || "Request failed";
                });
        }
    });
