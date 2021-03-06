/**
 * Created by berti on 8/1/2017.
 */
var app = require("../express");
var postModel = require("./models/post.model.server");

// app.get("/api/user/:userId/website/:websiteId/page", findPagesForWebpage);
// app.post("/api/user/:userId/website/:websiteId/page", createPage);
// app.get("/api/user/:userId/website/:websiteId/page/:pageId", findPageById);
// app.put("/api/user/:userId/website/:websiteId/page/:pageId", updatePage);
// app.delete("/api/user/:userId/website/:websiteId/page/:pageId", deletePage);

app.get("/api/boards/:boardId/posts", findPostsByBoardId);
app.post("/api/boards/:boardId/new", createPost);
app.get("/api/post/:postId", findPostById);
app.post("/api/post/:postId", addComment);
app.get("/api/post/:postId/usr", findPopulatedUserByPostId);
app.put("/api/post/:postId", updatePost);
app.delete("/api/post/:postId", deletePost);
app.get("/api/post/:postId/endorse", endorsePost);
app.put("/api/post/:postId/save", savePost);
app.get("/api/boards/:boardId/search", searchPosts);
app.get("/api/allPosts", getAllPosts);

app.put("/api/post/:postId/comment/:commentId", editComment);
app.delete("/api/:postId/comment/:commentId", deleteComment);
app.get("/api/:username/saved", getSavedPosts);
app.get("/api/:username/posts", getUserPosts);

function getUserPosts(req, res) {
    var username = req.params.username;
    postModel
        .getUserPosts(username)
        .then(function (posts) {
            res.json(posts);
            return;
        },function (err) {
            res.send(err.message);
            return;
        })
}

function getSavedPosts(req, res) {
    var username = req.params.username;
    postModel
        .getSavedPosts(username)
        .then(function (posts) {
            res.json(posts);
            return;
        },function (err) {
            res.send(err.message);
            return;
        })
}

function getAllPosts(req, res) {
    postModel
        .getAllPosts()
        .then(function (posts) {
            res.json(posts);
            return;
        });
}

function searchPosts(req, res) {
    var searchTerm = req.query.searchTerm;

    postModel
        .searchPosts(searchTerm)
        .then(function (results) {
            res.json(results);
            return;
        });
}

function savePost(req, res) {
    var postId = req.params.postId;
    var user = req.body;
    postModel
        .savePost(user, postId)
        .then(function (result) {
            res.json(result);
            return;
        });
}

function endorsePost(req, res) {
    var postId = req.params.postId;
    postModel
        .endorsePost(postId)
        .then(function (result) {
            res.json(result);
            return;
        });
}

function findPopulatedUserByPostId(req, res) {
    var postId = req.params.postId;
    postModel
        .findPopulatedUserByPostId(postId)
        .then(function (result) {
            res.json(result);
            return;
        });
}

function findPostsByBoardId(req, res) {
    var boardId = req.params.boardId;
    postModel
        .findPostsByBoardId(boardId)
        .then(function (posts) {
            res.json(posts);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function createPost(req, res) {
    var post = req.body;

    postModel
        .createPost(post)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function findPostById(req, res) {
    var postId = req.params.postId;

    postModel
        .findPostById(postId)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function addComment(req, res) {
    var comment = req.body.comment;
    var user = req.body.user;
    var postId = req.params.postId;
    postModel
        .addComment(comment, user, postId)
        .then(function (post) {
            res.json(post);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function deletePost(req, res) {
    var postId = req.params.postId;
    postModel
        .deletePost(postId)
        .then(function (status) {
            res.sendStatus(200);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function updatePost(req, res) {
    var postId = req.params.postId;
    var post = req.body;

    postModel
        .updatePost(postId, post)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function editComment(req, res) {
    // var postId = req.params.postId;
    // var commentId = req.params.commentId;
    var comment = req.body;

    postModel
        .editComment(comment)
        .then(function (status) {
            res.json(status);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}

function deleteComment(req, res) {
    var commentId = req.params.commentId;
    var postId = req.params.postId;
    postModel
        .deleteComment(commentId, postId)
        .then(function (status) {
            res.sendStatus(200);
            return;
        }, function (err) {
            res.sendStatus(500).send(err);
            return;
        });
}










function findPageById(req, res) {
    var pageId = req.params.pageId;

    pageModel
        .findPageById(pageId)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });

}

function createPage(req, res) {
    var page = req.body;
    var websiteId = req.params.websiteId;

    pageModel
        .createPage(websiteId, page)
        .then(function (page) {
            res.json(page);
            return;
        }, function (err) {
            res.send(err);
            return;
        });
}

function findPagesForWebpage(req, res) {
    var wid = req.params.websiteId;

    pageModel
        .findPagesForWebsite(wid)
        .then(function (pages) {
            res.json(pages);
            return;
        }, function (err) {
            res.sendStatus(404).send(err);
            return;
        });
}