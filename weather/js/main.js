//help here
//https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//weather request http://api.openweathermap.org/data/2.5/weather?lat=54.996612&lon=-7.308575&appid=3a5d98019745c1722223dbf7747d9c8a

// icons here http://openweathermap.org/weather-conditions

var getBackImage = function(icon){
  var firstTwoChars = icon.substr(0,2);
  // console.log(firstTwoChars);
  switch(firstTwoChars){
    case '01':
      return "https://images.unsplash.com/reserve/GBjvTQTou2D0KTHomMoA_IMG_1568.JPG";
    case '02':
      return "https://images.unsplash.com/photo-1430778569142-43551f375f9a";
    case '03':
      return "https://images.unsplash.com/photo-1431315906474-0e7a186c0304";
    case '04':
      return "https://images.unsplash.com/photo-1430089430181-74b60db38d4f";
    case '09':
      return "https://images.unsplash.com/photo-1444384851176-6e23071c6127";
    case '10':
      return "https://images.unsplash.com/reserve/5ByY2laAQiCAZ1fCdnoz_untitled-1528-2.jpg";
    case '11':
      return "https://images.unsplash.com/photo-1442213391790-7656f6e368b9";
    case '13':
      return "https://images.unsplash.com/photo-1454447170982-596ddff4606a";
    case '50':
      return "https://images.unsplash.com/photo-1445294211564-3ca59d999abd";
    default:
      return "https://images.unsplash.com/photo-1431629191947-187f1cf3e62b";
  }
};

var getTemp = function(temp, type){
  var tempC = (parseFloat(temp) - 273.15);
  var tempF = tempC * 1.8 + 32;
  if (type === "F") return tempF.toFixed(1) + " Deg F";
  else return tempC.toFixed(1) + " Deg C";
};

var updateWeather = function(x, y){
  var urlString1 = 'http://api.openweathermap.org/data/2.5/weather?';
  var urlString2 = 'lat=' + x + '&lon=' + y;
  var urlString3 = '&appid=3a5d98019745c1722223dbf7747d9c8a';
  var urlStringFull = urlString1 + urlString2 + urlString3;
  $.getJSON(urlStringFull, function(data) {
//     console.log(data);

//     console.log("Temperature: " + (parseFloat(data.main.temp) - 273.15));
//     console.log("Clouds: " + data.clouds.all + "%");
//     console.log("Humidity: " + data.main.humidity + "%");
//     console.log("Pressure: " + data.main.pressure + "kPa");
//     console.log("Wind Direction: " + data.wind.deg);
//     console.log("Wind Speed: " + data.wind.speed + "m/s");
//     console.log("icon info: " + data.weather[0].icon );
//     console.log(getBackImage(data.weather[0].icon));

    $(".name").html(data.name);
    $(".temperature").html(getTemp(data.main.temp, "C"));
    $(".clouds").html(data.clouds.all + "%");
    $(".humidity").html(data.main.humidity + "%");
    $(".pressure").html(data.main.pressure.toFixed(2) + "kPa");
    $(".winddir").html(data.wind.deg.toFixed(2));
    $(".windspeed").html(data.wind.speed.toFixed(2) + "m/s");
    $(".main").html(data.weather[0].main);
    $(".description").html(data.weather[0].description);
    var iconString = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    $(".icon").attr("src", iconString);
    $(".panel4").css("background-image", "url(" + getBackImage(data.weather[0].icon) + ")");
    
    $('#tempBtn').off('click');
    $('#tempBtn').on('click', function(){
      //need to get the toggle effect to work!
      if ($("#tempBtn").text() === "Deg F"){
        $(".temperature").html(getTemp(data.main.temp, "F"));
        $("#tempBtn").html("Deg C");
      } else {
        $(".temperature").html(getTemp(data.main.temp, "C"));
        $("#tempBtn").html("Deg F");
      }
    });
  });
};


$(document).ready(function() {

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  var error = function(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
  };
  //initially the home radio button is selected by default
  // console.log($('input[name=radioName]:checked', '#locForm').val());

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      updateWeather(pos.coords.latitude, pos.coords.longitude);
    }, error, options);
  }
  
  // listen for the clicks on the radio buttons
  $('#locForm input').on('change', function() {
    console.log($('input[name=radioName]:checked', '#locForm').val());
    if ($('input[name=radioName]:checked', '#locForm').val() === 'london') {updateWeather(51.509077, -0.114770);};
    if ($('input[name=radioName]:checked', '#locForm').val() === 'sydney') {updateWeather(-33.864698, 151.199490);};
    if ($('input[name=radioName]:checked', '#locForm').val() === 'la') {updateWeather(34.051038, -118.246960);};
    if ($('input[name=radioName]:checked', '#locForm').val() === 'home') {
      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(pos) {
          updateWeather(pos.coords.latitude, pos.coords.longitude);
        }, error, options);
      }
      
    };
  });
  
  
});


