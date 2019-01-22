$(document).ready(function() {

  //jQuery count letter in tweet composer:
  $("textarea").on("keyup",function() {
    $(this).siblings(".counter").text(140 - this.value.length)
      if ($("span.counter").text() <= 0) {
        $("span.counter").css("color", "red")
      }
      else {
        $("span.counter").css("color", "#244751")
      }
  })
});