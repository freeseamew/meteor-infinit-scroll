Meteor.methods({

  getPostCountAll: function () {
    return Posts.find().count();
  }
});
