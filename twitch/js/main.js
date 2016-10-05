var channels = ["freecodecamp", "MedryBW", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "comster404", "test_channel", "cretetion", "sheevergaming", "TR7K", "OgamingSC2", "ESL_SC2", "brunofin"];
var count = channels.length;
var results = [];

$(document).ready(function() {
  channels.forEach(function(item) {
    getChannelInfo(item);
  });
});

var getChannelInfo = function(name) {
  $.getJSON('https://api.twitch.tv/kraken/channels/' + name + '?callback=?', function(generalData) {
    $.getJSON('https://api.twitch.tv/kraken/streams/' + name + '?callback=?', function(streamData) {

      var logo = 'http://digitalmarketingstrategy.ucd.ie/wp-content/uploads/2015/11/Ask-The-Right-Questions--300x300.jpg';
      if (generalData.logo !== null) logo = generalData.logo;
      if (generalData.logo === undefined) logo = 'http://rlv.zcache.co.uk/no_entry_sign_square_sticker-r7c34f57abc1e4e3782619f45a7e3410f_v9wf3_8byvr_324.jpg';

      var linkUrl = "#";
      if (generalData.url !== null) linkUrl = generalData.url;
      if (generalData.url === undefined) linkUrl = '#';

      var status = "Offline";
      if (streamData.stream !== null) status = "Streaming";
      if (streamData.stream === undefined) status = "Unavailable";

      var desc = "";
      if (status === "Streaming") desc = streamData.stream.channel.status;

      var channelInfo = {
        logo: logo,
        name: name,
        linkUrl: linkUrl,
        desc: desc,
        status: status
      };
      //push the channel information onto the results object
      results.push(channelInfo);
      //call the next function 
      next();
    });
  });
};

var next = function() {
  //decrement the number of channels to countdown the async calls
  count--;
  //if the count < 1 ensures that all the channels have been added to the results array
  //i.e. all the async calls have been made and completed
  if (count < 1) {
    buildTable(results);
    
    $("#btn-all").on("click", function() {
      $('#btn-all, #btn-online, #btn-offline').removeClass("is-active");
      $('#btn-all').addClass("is-active");
      buildTable(results);
    });
    
    $("#btn-online").on("click", function() {
      $('#btn-all, #btn-online, #btn-offline').removeClass("is-active");
      $('#btn-online').addClass("is-active");
      var onlineRes = results.filter(function(row) {
        if (row.status === "Streaming") return true;
      });
      buildTable(onlineRes);
    });
    
    $("#btn-offline").on("click", function() {
      $('#btn-all, #btn-online, #btn-offline').removeClass("is-active");
      $('#btn-offline').addClass("is-active");
      var offlineRes = results.filter(function(row) {
        if (row.status === "Offline") return true;
      });
      buildTable(offlineRes);
    });
    
    $('#search-btn').keyup(function() {
      $('#btn-all, #btn-online, #btn-offline').removeClass("is-active");
      var searchStr = this.value;
      var filteredRes = results.filter(function(row) {
        if (row.name.toLowerCase().includes(searchStr)) return true;
      });
      buildTable(filteredRes);
    });
  }
};

var buildTable = function(resultsArr) {
  //clear the table
  $('#channelList').html('');
  //build the table based on the results
  resultsArr.forEach(function(row) {
    $('#channelList').append('<tr>' +
      '<td><img src="' + row.logo + '" class="logo"></td>' +
      '<td><a href="' + row.linkUrl + '" target="_blank">' + row.name + '</a><p class="smallDesc">' + row.desc + '</p></td>' +
      '<td>' + row.status + '</td>' +
      '</tr>');
  });
};