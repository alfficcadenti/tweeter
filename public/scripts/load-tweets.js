// function dateDiff(date) {
//     var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7, month=week*4;
//     date = new Date(date);
//     let Now = Date.now();
//     var timediff = Now - date;
//     if (isNaN(timediff)) return NaN;
//     //if less than 1 minute
//     if (timediff < 1000*60) {
//         let time = Math.floor(timediff / second);
//         return time + " seconds ago";
//     }
//     //if less than 1 hour
//     else if (timediff < 1000*60*60) {
//         let time = Math.floor(timediff / minute);
//         return time + " minutes ago";
//     }
//     //if less than 1 day
//     else if (timediff < 1000*60*60*24) {
//         let time = Math.floor(timediff / hour);
//         return time + " days ago";
//     }
//     //if less than 1 week
//     else if (timediff < 1000*60*60*24*7) {
//         let time = Math.floor(timediff / day);
//         return time + " months ago";
//     }
//     else {
//         let time = Math.floor(timediff / month);
//         return time + " months ago";
//     }
// }


// $(document).ready(function() {
//   //jQuery get tweets Json and appen to the main page:

//   //get json
//   $.get("/tweets", function(data, status){
//     //alert("Data: " + data + "\nStatus: " + status);
//     //for loop on tweet data
//     for (let tweet in data) {
//       console.log(data[tweet])
//       // pass to the build function to get HTML code
//       //let tweetHTML = buildTweet(data[tweet]);
//       let tweetObj = data[tweet];
//       //
//       // calculate date distance
//       var date = dateDiff(data[tweet].created_at);
//       console.log(date)
//       //append the article to the tweet container
//       $("#tweet-container")
//         .append($("<article>").addClass("tweet")
//           // append a header to the article
//           .append($("<header>")
//             .append($("<img>")
//               .attr("src",tweetObj.user.avatars.small))
//             .append($("<span>").text(tweetObj.user.name).addClass("username"))

//             .append($("<span>").text(tweetObj.user.handle).addClass("handle")
//               )
//           )
//           // append a main to the article
//           .append($("<div>").text(tweetObj.content.text))
//           // append a footer to the article
//           .append($("<footer>").text(date))
//         );
//     }
//   });

// });