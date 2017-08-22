/**
 * Created by berti on 7/23/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("profileController", profileController);

    function profileController($routeParams, $location, userService, paramUser, $route, postService, overwatchService) {
        var model = this;

        //declare functions
        model.updateUser = updateUser;
        model.unregisterUser = unregisterUser;
        model.logout = logout;
        model.canEdit = false;
        model.endorseUser = endorseUser;
        model.favoriteUser = favoriteUser;
        model.getBlizzProfileData = getBlizzProfileData;
        model.updateUserBlizzData = updateUserBlizzData;
        model.updateOverwatchProfile = updateOverwatchProfile;

        function init() {
            model.paramUser = paramUser;
            model.playerPortrait = "ohi-bastion";
            model.displayName = paramUser.nickname ? paramUser.nickname : paramUser.username;
            if(paramUser.blizzard) {
                model.battletag = paramUser.blizzard.battletag;
                if(paramUser.overwatchProfile) {
                    model.isAuthenticatedUser = true;
                    model.playerPortrait = model.paramUser.overwatchProfile.heroPortraitSource;
                } else {
                    updateOverwatchProfile(paramUser.blizzard.battletag);
                }
            } else {
                model.isAuthenticatedUser = false;
            }

            model.introduction =
                        (paramUser.introduction || paramUser.introduction ==='')
                            ? paramUser.introduction
                            : "This user has no introduction yet.";

            userService
                .getCurrentUser()
                .then(function (response) {
                    if(response.data) {
                        model.currentUser = response.data;
                        model.canEdit = (paramUser.username === model.currentUser.username)
                                                || model.currentUser.role === "ADMIN";
                        //model.canEdit = paramUser.username === model.currentUser.username;
                    } else {
                        model.currentUser = null;
                    }
                });

            postService
                .getSavedPosts(model.paramUser.username)
                .then(function (posts) {
                   model.posts = posts.data.savedPosts;
                });

            postService
                .getUserPosts(model.paramUser.username)
                .then(function (posts) {
                   model.allPosts = posts.data.posts;
                });

            userService
                .getFavUsers(model.paramUser.username)
                .then(function (users) {
                    model.favUsers = users.data.favUsers;
                });

        }
        init();

        function updateOverwatchProfile(battletag) {
            var owProfile = overwatchService.getOverwatchProfile(battletag);
            var tempUser = model.paramUser;
            tempUser.overwatchProfile = owProfile;

            userService
                    .updateUser(tempUser)
                    .then(function (response) {
                        $route.reload();
                    }, function (err) {
                        console.log("Error on updating user data");
                        console.log(err);
                    });
        }

        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url("/");
                });
        }

        function updateUser(user) {
            userService
                .updateUser(user)
                .then(function () {
                    alert("User updated!");
                });
        }

        function unregisterUser(user) {
            userService
                .unregisterUser(user)
                .then(function () {
                    $location.url("/login");
                });
        }

        function endorseUser() {
            userService
                .endorseUser(model.paramUser)
                .then(function () {
                   alert("User is now coach endorsed!");
                   $route.reload();
                });
        }

        function favoriteUser() {
                userService
                    .getFavUsers(model.currentUser.username)
                    .then(function (users) {
                        model.usrInFaves = false;
                        $.each(users.data.favUsers, function(i,obj) {
                            if (obj._id === model.paramUser._id) {
                                model.usrInFaves = true;
                                return false;}
                        });
                    }).then(function (res) {
                        if (!model.usrInFaves) {
                            userService
                                .favoriteUser(model.currentUser.username, model.paramUser)
                                .then(function () {
                                    alert("Saved user as a favorite!");
                                    $route.reload();
                                });
                        } else {
                            alert("User already saved as a favorite.");
                        }
                });

        }

    }

})();
