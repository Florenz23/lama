angular.module('myApp')
    .controller('insertCtrl', function ($scope, $http) {
        $scope.post = {};
        $scope.post.users = [];
        $scope.tempUser = {};
        $scope.editMode = false;
        $scope.index = '';

        var url = 'ajax/manageStar.php';

        $scope.saveUser = function () {
            $http({
                method: 'post',
                url: url,
                data: $.param({'pStar': $scope.tempUser, 'type': 'save_pStar'}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                success(function (data, status, headers, config, error) {
                    if (data.success) {
                        if ($scope.editMode) {
                            $scope.post.users[$scope.index].id = data.id;
                            $scope.post.users[$scope.index].name = $scope.tempUser.name;
                            $scope.post.users[$scope.index].email = $scope.tempUser.email;
                            $scope.post.users[$scope.index].companyName = $scope.tempUser.companyName;
                            $scope.post.users[$scope.index].designation = $scope.tempUser.designation;
                        } else {
                            $scope.post.users.push({
                                id: data.id,
                                name: $scope.tempUser.name,
                                email: $scope.tempUser.email,
                                companyName: $scope.tempUser.companyName,
                                designation: $scope.tempUser.designation
                            });
                        }
                        $scope.messageSuccess(data.message);
                        $scope.userForm.$setPristine();
                        $scope.tempUser = {};

                    } else {
                        console.log(data);
                        console.log(status);
                        console.log(headers);
                        console.log(config);
                        console.log(error);
                        $scope.messageFailure(data.message);
                    }
                }).
                error(function (data, status, headers, config) {
                    //$scope.codeStatus = response || "Request failed";
                });

        }

        $scope.addUser = function () {
            console.log("jojo2");
            $scope.saveUser();
            $scope.editMode = false;
            $scope.index = '';
        }

        $scope.updateUser = function () {
            $('.btn-save').button('loading');
            $scope.saveUser();
        }

        $scope.editUser = function (user) {
            $scope.tempUser = {
                id: user.id,
                stageName: user.stageName,
                scoreImageUrl: user.scoreImageUrl,
                pStarVotes: user.pStarVotes,
            };
            $scope.editMode = true;
            $scope.index = $scope.post.users.indexOf(user);
        }


        $scope.deleteUser = function (user) {
            var r = confirm("Are you sure want to delete this user!");
            if (r == true) {
                $http({
                    method: 'post',
                    url: url,
                    data: $.param({'id': user.id, 'type': 'delete_pStar'}),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).
                    success(function (data, status, headers, config) {
                        if (data.success) {
                            var index = $scope.post.users.indexOf(user);
                            $scope.post.users.splice(index, 1);
                        } else {
                            $scope.messageFailure(data.message);
                        }
                    }).
                    error(function (data, status, headers, config) {
                        //$scope.messageFailure(data.message);
                    });
            }
        }

        $scope.init = function () {
            $http({
                method: 'post',
                url: url,
                data: $.param({'type': 'getUsers'}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).
                success(function (data, status, headers, config) {
                    console.log(data.data);
                    if (data.success && !angular.isUndefined(data.data)) {
                        $scope.post.users = data.data;
                    } else {
                        $scope.messageFailure(data.message);
                    }
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    //$scope.messageFailure(data.message);
                });
        }

        $scope.messageFailure = function (msg) {
            jQuery('.alert-failure-div > p').html(msg);
            jQuery('.alert-failure-div').show();
            jQuery('.alert-failure-div').delay(5000).slideUp(function () {
                jQuery('.alert-failure-div > p').html('');
            });
        }

        $scope.messageSuccess = function (msg) {
            jQuery('.alert-success-div > p').html(msg);
            jQuery('.alert-success-div').show();
            jQuery('.alert-success-div').delay(5000).slideUp(function () {
                jQuery('.alert-success-div > p').html('');
            });
        }


        $scope.getError = function (error, name) {
            if (angular.isDefined(error)) {
                if (error.required && name == 'name') {
                    return "Please enter name";
                } else if (error.email && name == 'email') {
                    return "Please enter valid email";
                } else if (error.required && name == 'company_name') {
                    return "Please enter company name";
                } else if (error.required && name == 'designation') {
                    return "Please enter designation";
                } else if (error.required && name == 'email') {
                    return "Please enter email";
                } else if (error.minlength && name == 'name') {
                    return "Name must be 3 characters long";
                } else if (error.minlength && name == 'company_name') {
                    return "Company name must be 3 characters long";
                } else if (error.minlength && name == 'designation') {
                    return "Designation must be 3 characters long";
                }
            }
        }
        $scope.init();

    });