(function () {

    var app = angular.module('myApp', ['ui.bootstrap'])
        .controller('MyController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

            //pagging
            $scope.curPage = 1,
                $scope.bubbleUp = false;
            $scope.isLoading = false;
            $scope.requestPageNumber = 1; //the page number
            $scope.objPerRequest = 10; //the number of objects from the response.
            $scope.itemsPerPage = 5,
                $scope.maxSize = 10;
            $scope.totalRepos = 0;
            $scope.bookMarks = app.bookMarks;
            $scope.searchText = "";
            var total_count = 0;
            var wholeRepos = [];
            var bookMarks = [];
            var highestPageNumber = 0;
            //$scope.repositories = [{ id: 26537135, node_id: "MDEwOlJlcG9zaXRvcnkyNjUzNzEzNQ==", name: "u-boot", full_name: "u-boot/u-boot", private: false },
            //{ id: 33441749, node_id: "MDEwOlJlcG9zaXRvcnkzMzQ0MTc0OQ==", name: "youtube", full_name: "rodrigobranas/youtube", private: false }];
            //$scope.repositories = [];
            $scope.onTextChange = onTextChange;
            if (app.bookMarks && app.bookMarks.length > 0) {

                var promises = [];
                angular.forEach(app.bookMarks, function (value, key) {

                    var req = {
                        method: 'GET',
                        url: 'https://api.github.com/repositories/' + value,
                    }
                    var request = $http(req);
                    promises.push(request);
                    debugger
                });

                Promise.all(promises).then(function (response) {
                    if (response) {
                        angular.forEach(response, function (value, key) {
                            let data = value.data
                            data.isSelected = true;
                           // wholeRepos.push(data);
                            $scope.repositories.push(data);
                        })
                    }
                    //let begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                    //    end = begin + $scope.itemsPerPage;
                    //$scope.repositories = wholeRepos.slice(begin, end);
                    $scope.totalRepos = $scope.repositories.length;
                    $scope.$apply();
                }, function (err) {
                    $scope.isLoading = false;
                    console.log(err);
                })
                //$scope.repositories = wholeRepos;
            }


            $scope.onItemselected = function (item) {
                debugger
                // this.value.isSelected = !this.value.isSelected;
                var req = {
                    method: 'POST',
                    url: '/Home/AddBookMarkByRepoId',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { id: item.value.id }
                }
                $http(req).then(function (response) {
                    if (response.data) {
                        item.value.isSelected = true;
                    } else {
                        if (wholeRepos.length == 0) {
                            var itemIndex = $scope.repositories.indexOf(item.value);
                            $scope.repositories.splice(itemIndex, 1);
                            $scope.totalRepos = $scope.repositories.length;
                        } 
                        item.value.isSelected = false;
                    }
                }, errorCallback);

            }
            $scope.numOfPages = function () {
                return Math.ceil(total_count / $scope.itemsPerPage);
                // return Math.ceil(wholeRepos.length / $scope.itemsPerPage);
            };

            $scope.$watch('curPage + numPerPage', function () {
                debugger
                var begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                var requestPageNumber = (($scope.curPage * $scope.itemsPerPage) / $scope.objPerRequest) <= 1 ? 1 : Math.ceil(($scope.curPage * $scope.itemsPerPage) / $scope.objPerRequest);// this parameter is for sending the api page number
                if ($scope.requestPageNumber != requestPageNumber) {
                    onTextChange();
                    //  }
                } else {
                    begin = begin % 10 == 5 ? 5 : 0;
                    end = begin == 5 ? 10 : 5;
                    $scope.repositories = wholeRepos.slice(begin, end);
                    $scope.requestPageNumber = requestPageNumber
                }
            });

            function bookRepoCallback(response) {

            }
            function successCallback(response) {

                if (response && response.data && response.data.items) {
                    //angular.forEach(response.data.items, function (value, key) {
                    //    wholeRepos.push(value);// = response.data.items;
                    //})

                    //let begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                    //    end = begin + $scope.itemsPerPage;
                    //$scope.repositories = wholeRepos.slice(begin, end);
                    let begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                    begin = begin % 10 == 5 ? 5 : 0;
                    end = begin == 5 ? 10 : 5;
                    wholeRepos = response.data.items;
                    $scope.repositories = wholeRepos.slice(begin, end);
                    total_count = response.data.total_count;
                    $scope.totalRepos = total_count;
                    $scope.isLoading = false;
                }
            }
            function errorCallback(err) {
                $scope.bubbleUp = false;
                $scope.isLoading = false;
                alert(err.data.message)
            }
            function onTextChange() {
                debugger
                $scope.isLoading = true;

                //reduce the amount of the results.
                //if ($scope.searchText.length < 2) {
                //    $scope.repositories = [];
                //    return
                //}


                //else if ($scope.searchText.length == 2) {
                debugger
                var requestPageNumber = (($scope.curPage * $scope.itemsPerPage) / $scope.objPerRequest) <= 1 ? 1 : Math.ceil(($scope.curPage * $scope.itemsPerPage) / $scope.objPerRequest);
                //if (wholeRepos.length == 0 || $scope.requestPageNumber < requestPageNumber || wholeRepos.length < $scope.objPerRequest || (wholeRepos.length > 0 && !(wholeRepos[0].full_name.includes($scope.searchText) || wholeRepos[0].name.includes($scope.searchText)))) {
                //$scope.requestPageNumber = requestPageNumber;
                // if (highestPageNumber > $scope.requestPageNumber) {
                let begin = (($scope.curPage - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                begin = begin % 10 == 5 ? 5 : 0;
                end = begin == 5 ? 10 : 5;
                // (highestPageNumber - 1 > $scope.requestPageNumber && $scope.requestPageNumber % 2 == 1)
                if (end == 10 && ($scope.requestPageNumber == requestPageNumber)) {
                    //$scope.repositories = filterFromCache();
                    getReposFromCache(begin, end);
                    return;
                }
                // }
                else {
                    $scope.requestPageNumber = requestPageNumber
                    highestPageNumber = highestPageNumber < $scope.requestPageNumber ? $scope.requestPageNumber : highestPageNumber;
                    $http({
                        method: 'get',
                        url: 'https://api.github.com/search/repositories?q=' + $scope.searchText + '&per_page=' + $scope.objPerRequest + '&page=' + $scope.requestPageNumber
                    }).then(successCallback, errorCallback);
                }
                //}
                //else {
                //    $scope.repositories = filterFromCache();
                //}
                // } else {
                //   $scope.repositories = filterFromCache();
                // }
            }

            function insertSlash(val) {
                let s = val.split('');
                s = s.toString().replace(/,/g, '.*')
                return s;
            }


            function getReposFromCache(begin, end) {
                $scope.repositories = wholeRepos.slice(begin, end);
                return;
            }

            function filterFromCache() {
                //var pattern = new RegExp('/^' + $scope.searchText + '.*/g');
                var parameter = insertSlash($scope.searchText);
                var pattern = new RegExp('.*' + parameter + '.*', 'i');
                var result = $filter('filter')(wholeRepos, function (repo) {
                    if (pattern.test(repo.name) || pattern.test(repo.full_name)) return repo;
                })
                return result;
            }

            function isBookMarked(obj) {
                var result = $filter('filter')(bookMarks, function (repo) {
                    return (repo.id == obj.id);
                })

            }

        }]);
    app.bookMarks = bookMarks;
}())