/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.

function tweetAge(date) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7, month=week*4;
    date = new Date(date);
    let Now = Date.now();
    var timediff = Now - date;
    if (isNaN(timediff)) return NaN;
    //if less than 1 minute
    if (timediff < 1000*60) {
        let time = Math.floor(timediff / second);
        return time + " seconds ago";
    }
    //if less than 1 hour
    else if (timediff < 1000*60*60) {
        let time = Math.floor(timediff / minute);
        return time + " minutes ago";
    }
    //if less than 1 day
    else if (timediff < 1000*60*60*24) {
        let time = Math.floor(timediff / hour);
        return time + " days ago";
    }
    //if less than 1 week
    else if (timediff < 1000*60*60*24*7) {
        let time = Math.floor(timediff / day);
        return time + " months ago";
    }
    else {
        let time = Math.floor(timediff / month);
        return time + " months ago";
    }
}

function renderTweets(tweets) {
  $('#tweet-container').html('')
  var tweets = tweets.reverse();
  for (let i in tweets) {
      let $tweet = createTweetElement(tweets[i]);
      $('#tweet-container').append($tweet);
  };
}

function createTweetElement(tweetData) {

  let tweetDate = tweetAge(tweetData.created_at);
  let $tweet =
          ($("<article>").addClass("tweet")
          // append a header to the article
            .append($("<header>")
              .append($("<img>")
                .attr("src",tweetData.user.avatars.small))
              .append($("<span>").text(tweetData.user.name).addClass("username"))

              .append($("<span>").text(tweetData.user.handle).addClass("handle")
                )
            )
            // append a main to the article
            .append($("<div>").text(tweetData.content.text))
            // append a footer to the article
            .append($("<footer>").text(tweetDate)//.append($("<span").addClass("ui-icon ui-icon-arrowthick-1-n"))
            )

          );
  return $tweet;
}

function cleanNewTweet() {
  tweetContent = $("section.new-tweet > form > textarea").val('')
   $("span.counter").text(140)
}

$(document).ready(function() {


  //compose button toggle
  $( "#compose-button" ).click(function () {
      $( "section.new-tweet" ).slideToggle( "slow", function() {
        $("section.new-tweet > form > textarea").focus();
      });
    });


  //GET TWEETS
  $.get("/tweets", function(data, status){
    renderTweets(data);
  });


  //PREVENT FORM SUBMISSION AND AJAX CALL
  $("section.new-tweet > form").submit(function( event ) {
    event.preventDefault();

    //ERRORS handling
    var tweetContent = '';
    tweetContent = $("section.new-tweet > form > textarea").val().length;
    if (tweetContent === 0) {
      $(".ui-state-error").css('visibility','visible');
      $(".ui-state-error").text("Error: the tweet is empty!");
    }
    else if (tweetContent > 140) {
      $(".ui-state-error").css('visibility','visible');
      $(".ui-state-error").text("Error: the tweet is too long! Max 140 characters");
    }
    else {
      $(".ui-state-error").css('visibility','hidden');
      //get the action-url of the form
      var actionurl = event.currentTarget.action;
      //submit new tweet
      $.ajax(actionurl, {
        method: 'POST',
        data: $("section.new-tweet > form").serialize(),
        success: function() {},
        error: function() {},
        //action after POST
      }).then(function() {
          cleanNewTweet();
          $.get("/tweets", function(data, status){
            renderTweets(data);
          });
        })
    }

  });


});


