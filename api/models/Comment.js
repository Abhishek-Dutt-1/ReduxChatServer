/**
* Comment.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    text: 'STRING',
    commentedBy: {
      model: 'user',
      via: 'comments'
    }
  }

/*
  afterCreate: function(newComment, cb) {
    console.log("NEW INSERTED COMMENT");
    console.log(newComment);
    console.log("Now Populated");
    Comment.findOne(newComment.id).populate('commentedBy').exec(function(err, comment){
      console.log(comment);
      cb(comment);
    });
  }
*/

};

