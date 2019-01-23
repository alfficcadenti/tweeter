/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function() {

  //compose button toggle
  $( "#compose-button" ).click(function () {
      $( "section.new-tweet" ).slideToggle( "slow", function() {
        $("section.new-tweet > form > textarea").focus();
      });
    });


  getTwitterList();


  //PREVENT FORM SUBMISSION AND AJAX CALL
  $("section.new-tweet > form").submit(function( event ) {
    event.preventDefault();

    //ERRORS handling
    var tweetContent = '';
    tweetContent = $("section.new-tweet > form > textarea").val().length;
    if (tweetContent === 0) {
      $("#error-div").css('visibility','visible');
      $(".ui-state-error").text("Error: the tweet is empty!");
    }
    else if (tweetContent > 140) {
      $("#error-div").css('visibility','visible');
      $(".ui-state-error").text("Error: the tweet is too long! Max 140 characters");
    }
    else {
      $("#error-div").css('visibility','hidden');
      //get the action-url of the form
      var actionurl = event.currentTarget.action;
      //submit new tweet
      $.ajax(actionurl, {
        method: 'POST',
        data: $("section.new-tweet > form").serialize(),
        //action after POST to clean the newTweet and reload the tweets
      }).then(function() {
          cleanNewTweet();
          getTwitterList();
        })
    }
  });
});