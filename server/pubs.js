Meteor.publish('posts', function (postCnt) {
  return Posts.find({}, {limit: postCnt, sort: {postDate: -1}});
});

Meteor.publish('postDetail', function (id) {
  return Posts.find({_id: id}); // 여기서 findOne를 사용하면 두번 리턴되는 문제 발생
});
