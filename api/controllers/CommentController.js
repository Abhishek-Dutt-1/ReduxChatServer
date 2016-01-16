/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // Create User
  create: function(req, res) {

    console.log("INSIDE CREATE")
    var comment = req.allParams()
    console.log(comment)
    delete comment.id

    if(comment.author) {

      var author = comment.author
      console.log(author)

      delete comment.author

      Comment.create(comment).populate("commentedBy").exec(function(err, newComment) {

        User.findOrCreate({name: author}, {name: author}).populate("comments").exec(function(err, newUser) {
        
          newUser.comments.add(newComment.id)

          newUser.save(function(err, newUser) {

            Comment.findOne(newComment.id).populate("commentedBy").exec(function(err, newCommentWithUser) {
              Comment.publishCreate(newCommentWithUser)
              return res.send(newCommentWithUser)
            })

          })

        })
      })
    } else {
      // Normal RESTfull routes
      console.log("YOLO")
      Comment.create(comment, function(err, newComment) {
        Comment.findOne(newComment.id).populate("commentedBy").exec(function(err, commentPopulated) {
          Comment.publishCreate(commentPopulated)
          return res.send(commentPopulated)
        })
      })
    }

  },

};

