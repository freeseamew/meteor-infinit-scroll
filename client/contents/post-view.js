
import { Random } from 'meteor/random'

Template.postView.onRendered(function(){});
Template.postView.onCreated(function () {

  var self = this;

  self.autorun(function ()
  {
    self.subscribe('postDetail', postIdSet.get());
  });

});

Template.postView.helpers({

  contentView: function()
  {
    var postOne = Posts.findOne({_id: postIdSet.get()});
    return postOne;
  }

});
