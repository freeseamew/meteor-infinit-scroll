
FlowRouter.route('/', {
  name: 'main',
  action: function() {

    FlowRouter.go('/postList');
  }
});

FlowRouter.route('/postList', {
  name: 'main',
  action: function() {

    BlazeLayout.render('mainLayout', {
      content:'postList'
    });
  }
});

FlowRouter.route('/postView/:id', {
  name: 'postView',
  action: function () {

    var id = FlowRouter.getParam('id');

    window.postIdSet = new ReactiveVar(id);

    BlazeLayout.render('mainLayout', {
      content: 'postView'
    });
  }
});
