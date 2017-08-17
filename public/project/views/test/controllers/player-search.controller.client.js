/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("playerSearchController", playerSearchController);

    function playerSearchController($location, userService, $rootScope) {
        var model = this;
        model.login = login;
        model.searchUser = searchUser;

        function init() {

        }
        init();

        function searchUser(searchText) {

        }

        function login(user) {
            userService.findUserByUsernameAndPassword(user.username, user.password)
                .then(function (_user) {
                    if (_user === null) {
                        model.errorMessage = "User not found";
                    } else {
                        $rootScope.currentUser = _user;
                        $location.url("profile/" + _user._id);
                    }
                });
        }
    }
})();
