$(document).ready(function() {

  //jQuery get tweets Json and appen to the main page:

  //get json
  $.get("/tweets", function(data, status){
    //alert("Data: " + data + "\nStatus: " + status);

    //for loop on tweet data
    for (let tweet in data) {
      console.log(data[tweet])
      // pass to the build function to get HTML code
      //let tweetHTML = buildTweet(data[tweet]);
      let tweetObj = data[tweet];
      //append the article to the tweet container
      $("#tweet-container")
        .append($("<article>").addClass("tweet")
          // append a header to the article
          .append($("<header>")
            .append($("<span>").text(tweetObj.user.name).addClass("username"))
            .append($("<img>")
              .attr("src",tweetObj.user.avatars.small))
            .append($("<span>").text(tweetObj.user.handle).addClass("handle")
              )
          )
          // append a main to the article
          .append($("<main>").text(tweetObj.content.text))
          // append a footer to the article
          .append($("<footer>").text(tweetObj.created_at))
        );
    }
  });

});