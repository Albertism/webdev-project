/**
 * Created by berti on 7/25/2017.
 */
(function () {
    angular
        .module("OverHub")
        .controller("postListController", postListController);

    function postListController($routeParams, postService) {
        var model = this;
        model.boardId = $routeParams["boardId"];
        // model.websiteId = $routeParams["websiteId"];

        function init() {
            postService
                .findPostsByBoardId(model.boardId)
                .then(function (posts) {
                    model.posts = posts;
                    console.log(model.posts);
                });
            // pageService
            //     .findPagesForWebpage(model.userId, model.websiteId)
            //     .then(function (pages) {
            //         model.pages = pages;
            //     });
        }
        init ();
    }
})();