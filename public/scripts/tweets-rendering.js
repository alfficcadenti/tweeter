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
        return time + " hours ago";
    }
    //if less than 1 week
    else if (timediff < 1000*60*60*24*7) {
        let time = Math.floor(timediff / day);
        return time + " day ago";
    }
    else {
        let time = Math.floor(timediff / month);
        return time + " months ago";
    }
}


function compareAge(a, b) {
  if (a.created_at > b.created_at) {
    return -1;
  }
  if (b.created_at > a.created_at) {
    return 1;
  }
  // a must be equal to b
  return 0;
}



function renderTweets(tweets) {
  $('#tweet-container').html('');

  //order the tweets first
  var tweets = tweets.sort(compareAge);
  for (let i in tweets) {
      let $tweet = createTweetElement(tweets[i]);
      $('#tweet-container').append($tweet);
  };
}

function createTweetElement(tweetData) {

  let tweetDate = tweetAge(tweetData.created_at);
  let $tweet =
          ($("<article>").addClass("tweet")
          // append the header to the article/tweet
            .append($("<header>")
              .append($("<img>")
                .attr("src",tweetData.user.avatars.small))
              .append($("<span>").text(tweetData.user.name).addClass("username"))

              .append($("<span>").text(tweetData.user.handle).addClass("handle")
                )
            )
            // append the text to the article/tweet
            .append($("<p>").text(tweetData.content.text))
            // append the footer to the article/tweet
            .append($("<footer>").append($("<span>").text(tweetDate).addClass("tweetAge"))
              .append($("<span>").addClass("tweetbuttons")
                .append($("<i>").addClass("far fa-heart"))
                .append($("<i>").addClass("far fa-flag"))
                .append($("<i>").addClass("fas fa-retweet"))
              )
            )

          );
  return $tweet;
}

function cleanNewTweet() {
  tweetContent = $("section.new-tweet > form > textarea").val('');
  $("span.counter").text(140).css("color", "#244751");
}


function getTwitterList() {
  $.get("/tweets", function(data, status){
    renderTweets(data);
    $(".tweet").hover(
      function(){
        $("footer > span.tweetbuttons", this).toggle();
      }
      ,function() {
        $("footer > span.tweetbuttons", this).toggle();
      }
    );
  });
}