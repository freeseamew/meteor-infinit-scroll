Template.postList.onCreated(function () {

  window.postCountAll = new ReactiveVar(0);
  window.postLoadingEffect = new ReactiveVar(false);
  window.scrollRock = new ReactiveVar(false);

  var self = this;
  var subs = new SubsManager();

  Meteor.call('getPostCountAll', function (err, result) {
    if(err) {
      console.log(err.message);
    }
    else {
      return postCountAll.set(result);
    }
  });

  self.autorun(function () {
    subs.subscribe('posts', postCnt.get());
  });

});

Template.postList.onRendered(function () {

  window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

      if(!(postCountAll.get() < postCnt.get()) && scrollRock.get() === false ) {
        scrollRock.set(true);

        postLoadingEffect.set(true);
        Meteor.setTimeout(function () {
          postLoadingEffect.set(false);
          scrollRock.set(false);
        }, 1000);

        postCnt.set(postCnt.get() + 10);
        console.log('postCnt: ' + postCnt.get());
        console.log('postCnt: ' + postCountAll.get());
      }
    }
  }

});

Template.postList.helpers({
  list: function () {
    return Posts.find({}, {sort: {postDate: -1}});
  },
  endOfData : function () {
  return postCountAll.get() < postCnt.get() ? true : false;
},
  postLoadingEffect: function () {
    return postLoadingEffect.get();
  }

});
