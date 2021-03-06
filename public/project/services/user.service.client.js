/**
 * Created by berti on 7/23/2017.
 */
(function () {
        angular
            .module("OverHub")
            .factory("userService", userService);
        
        function userService($http) {

            var api = {
                "login": login,
                "findUserById" : findUserById,
                "findUserByUsername" : findUserByUsername,
                "registerUser" : registerUser,
                "updateUser" : updateUser,
                "unregisterUser" : unregisterUser,
                "checkLogin" : checkLogin,
                "logout" : logout,
                "getCurrentUser" : getCurrentUser,
                "findUserByNickname" : findUserByNickname,
                "endorseUser" : endorseUser,
                "favoriteUser" : favoriteUser,
                "getFavUsers" : getFavUsers,
                "getAllUsers" : getAllUsers,
                "endorseUser" : endorseUser
            };

            return api;

            function getFavUsers(username) {
                var url="/api/" + username + "/fav";
                return $http.get(url);
            }

            function favoriteUser(currUsr, toFav) {
                var url = "/api/" + currUsr + "/fav";
                return $http.put(url, toFav);
            }

            function getAllUsers() {
                var url="/api/users";

                return $http.get(url);
            }

            function endorseUser(user) {
                var url="/api/" + user.username + '/endorse';
                return $http.put(url, user);
            }

            function findUserByNickname(nickname) {
                var url="/api/nickname?" + nickname;
                return $http.get(url);
            }

            function getCurrentUser() {
                var url="/api/currentUser";
                return $http.get(url);
            }


            function logout() {
                return $http.get("/api/logout");
            }

            function checkLogin() {
                return $http.get("/api/checkLogin")
                    .then(function (res) {
                        return res.data;
                    });
            }

            function updateUser(user) {
                var url = "/api/user/" + user._id;
                return $http.put(url, user);
            }

            function unregisterUser(user) {
                var url = "/api/user/" + user._id;

                return $http.delete(url);
            }

            function findUserByUsername(username) {
                var url = "/api/findUser";
                return $http.post(url, {username: username});
            }

            function registerUser(user) {
                var url = "/api/register";

                return $http.post(url, user);

            }

            function findUserById(userId) {
                return $http.get("/api/user/" + userId)
                    .then(function (response) {
                        return response.data;
                    });
            }
            
            function login(username, password) {
                var url = "/api/login";

                return $http.post(url, {username: username, password: password})
                    .then(function (response) {
                        return response.data;
                    });
            }

        }
})();