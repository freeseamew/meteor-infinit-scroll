
(function () {

  window.postCnt = new ReactiveVar();

  var scrollPositions;
  var backToPosition;

  var postCntGet;
  var backToPage;

  // Keep track of the last position for every page in case we return to it
  // via the back button or history.
  var saveScrollPosition = function () {

    scrollPositions = $(window).scrollTop();
    postCntGet = postCnt.get();
  };

  window.onpopstate = function(event) {
    // We used the back button, find the position we were at on that page
    // last time
    backToPosition = scrollPositions;
    backToPage = postCntGet;
  };

  // Scroll to the right place after changing routes. "The right place" is:
  // 1. The previous position if we're returning via the back button
  // 2. The top of page otherwise
  var scrollToTop = function () {
    // defer until after the DOM update so that the position can be correct
    Tracker.afterFlush(function () {
      var position;

      if (backToPosition) {
        position = backToPosition;
        backToPosition = null;
      }
      else {
        position = 0;
      }

      if(postCntGet)
      {
        postCnt.set(postCntGet);
      }
      else {
        postCnt.set(20);
      }

      $('body,html').animate({
        scrollTop: position
      }, 1);
    });
  };

  FlowRouter.triggers.exit([saveScrollPosition]);
  FlowRouter.triggers.enter([scrollToTop]);

}).call(this);



