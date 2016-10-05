/*
url string to use for query - from api sandbox - https://en.wikipedia.org/wiki/Special:ApiSandbox

https://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&srsearch=elon+musk

random article https://en.wikipedia.org/wiki/Special:Random
*/

$(document).ready(function() {

  var getResults = function() {
    var searchTerm = $('#searchterm').val().trim();

    // if no search term
    if (searchTerm === '') {
      var noresult = '<h3>Please enter a search term in the box above</h3>';
      $(".results").html("");
      $(".results").append(noresult);
      return;
    }
    
    // carry out the search
    var urlstring = "http://en.wikipedia.org/w/api.php?action=query&format=json&prop=&list=search&srsearch=" + searchTerm + "&utf8=&callback=?";
    $.getJSON(urlstring, function(data) {
      
      // the case of zero results
      if (data.query.searchinfo.totalhits < 1) {
        var zeroresults = '<h3>Sorry no results - please try another term</h3>';
        $(".results").html("");
        $(".results").html(zeroresults);
        return;
      }
      
      //clear and display results
      $(".results").html("");
      for (var i = 0; i < data.query.search.length; i++) {
        var aresult = '<a href="https://en.wikipedia.org/wiki/_' + data.query.search[i].title + '" target="_blank">' +
          '<article class="message is-info">' +
            '<div class="message-header">' +
              '<h3>' + data.query.search[i].title + '</h3>' +
            '</div>' +
            '<div class="message-body messitem' + i + '">' +
              ' <p>' + data.query.search[i].snippet + '</p>' +
            '</div>' +
          '</article></a><br />';
        $(".results").append(aresult);
        //highlight result on hover
        $(".message-body").hover(function() {
          $(this).css({
            'color': '#222324'
          });
        }, function() {
          $(this).css({
            'color': '#69707a'
          });
        });
      } //end for loop
      
    });//end getJSON
  };//end getResults function

  //register event handlers
  $(".button").on("click", function() {
    getResults();
  });
  $("#searchterm").on("keypress", function(e) {
    if (e.which === 13) getResults();
  });
});