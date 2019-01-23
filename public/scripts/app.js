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

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


function renderTweets(tweets) {
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
          .append($("<footer>").text(tweetDate))
          );
  return $tweet;
}

$(document).ready(function() {

  renderTweets(data);

});