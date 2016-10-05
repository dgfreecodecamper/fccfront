// var startTimer = function(time, color) {
//   var duration = time*60*1000/100;

//   var x = 0;

//   function start() {
//     if (x <= 100) {
//       $('#timer-fill').attr('d', getSvgDString(300, x, 30));
//       $('#timer-fill').attr('fill', color);
//       x++;
//       setTimeout(start, duration);
//     }
//   }
//   start();
// };

//  var countDown = function(sessTotal, sessSecs, sColor, breakTotal, breakSecs, bColor) {

//    var formatSecs = function(seconds) {
//      var mins = Math.floor(seconds / 60);
//      var secs = Math.round((seconds / 60 - mins) * 60);
//      return mins + ':' + secs;
//    };

//   if (sessSecs < 1) {
//     if (breakSecs < 1) {
//       console.log('finished');
//       //turn on the event handlers
//       $("#session-btn-neg").attr("disabled", false);
//       $("#session-btn-pos").attr("disabled", false);
//       $("#break-btn-neg").attr("disabled", false);
//       $("#break-btn-pos").attr("disabled", false);
//       started=false;
//       return;
//     } else {
//       breakSecs--;
//       $('#main-text').html('Break');
//       $('#timer-text').html(formatSecs(breakSecs));
//       var bPercenFill = 100 - (breakSecs / breakTotal) * 100;
//       $('#timer-fill').attr('d', getSvgDString(300, bPercenFill, 30));
//       $('#timer-fill').attr('fill', bColor);
//       var sTime = setTimeout(function() {
//         countDown(sessTotal, sessSecs, sColor, breakTotal, breakSecs, bColor);
//       }, 1000);
//     }
//   } else {
//     sessSecs--;
//     $('#main-text').html('Session');
//     $('#timer-text').html(formatSecs(sessSecs));
//     var sPercenFill = 100 - (sessSecs / sessTotal) * 100;
//     $('#timer-fill').attr('d', getSvgDString(300, sPercenFill, 30));
//     $('#timer-fill').attr('fill', sColor);
//     var bTime = setTimeout(function() {
//       countDown(sessTotal, sessSecs, sColor, breakTotal, breakSecs, bColor);
//     }, 1000);
//   }
// };

//  $('.timersvg').on('click', function() {
//    if (!started){
//      started=true;
//      $("#session-btn-neg").attr("disabled", true);
//      $("#session-btn-pos").attr("disabled", true);
//      $("#break-btn-neg").attr("disabled", true);
//      $("#break-btn-pos").attr("disabled", true);
//      //rem - need to change the 6 to 60 in the following line
//      countDown(sessionTime * 6, sessionTime * 6, '#B32323', breakTime * 6, breakTime * 6, '#AD7FA8');
//      return;
//    }
//    if (started){
//      console.log('started');
//      console.log(sTime);
//      console.log(bTime);
//      // started = false;
//      window.clearInterval(sTime);
//      window.clearInterval(bTime);
//      // $("#session-btn-neg").attr("disabled", false);
//      // $("#session-btn-pos").attr("disabled", false);
//      // $("#break-btn-neg").attr("disabled", false);
//      // $("#break-btn-pos").attr("disabled", false);
//      return;
//    }

//  });

$('document').ready(function() {

  //##################################### function to draw the svg for the circle fill #####################
  var getSvgDString = function(circleSize, percentFill, margin) {
    if (percentFill === 100) percentFill = 99.999999;
    var h = circleSize * (percentFill / 100);
    var r = Math.abs(h - circleSize / 2);
    var theta = 2 * Math.acos(r / (circleSize / 2));
    var segLen = 2 * (circleSize / 2) * Math.sin(0.5 * theta);
    var xCoord = ((circleSize - segLen) / 2) + margin;
    var yCoord = (circleSize - h) + margin;
    var flagB = 0;
    if (h > circleSize / 2) {
      flagB = 1;
    }
    return 'M ' + xCoord + ' ' + yCoord + ' a ' + circleSize / 2 + ' ' + circleSize / 2 + ' 0 ' + flagB + ' 0 ' + segLen + ' 0';
  };

  //#################################### the timer function ###############################################
  var startTimer = function(seconds, type, callback) {
    
    var startTime;
    var timer;
    var obj;
    var ms = seconds * 1000;
    var totms = ms;
    var obj = {};
    var fillcolor;
    var text;
    if (type==='session') {
      fillcolor = '#B32323';
      text = 'Session';
    } else {
      fillcolor = '#D3781F';
      text = 'Break';
    }

    obj.resume = function() {
      
      startTime = new Date().getTime();
      // console.log('start time: ' + startTime);
      timer = setInterval(obj.step, 500); // adjust this number to affect granularity lower numbers are more accurate, but more CPU-expensive
      // console.log('timer: ' + timer);
    };
    
    

    obj.pause = function() {
      ms = obj.step();
      clearInterval(timer);
    };
    
    

    obj.step = function() {
      var now = Math.max(0, ms - (new Date().getTime() - startTime));
      // console.log('now: '+now +' ms: '+ms);
      var m = Math.floor(now / 60000);
      var s = Math.floor(now / 1000) % 60;
      s = (s < 10 ? "0" : "") + s;
      $('#timer-text').html(m + ":" + s);
      
      
      //todo percentFill not calculating correctly
      var percentFill = 100 - (now / totms) * 100;
      // console.log('now: '+now+' ms: '+ms+' pf: '+percentFill);
      $('#timer-fill').attr('d', getSvgDString(300, percentFill, 30));
      $('#timer-fill').attr('fill', fillcolor);
      $('#main-text').html(text);
      
      
      if (now == 0) {
        clearInterval(timer);
        obj.resume = function() {};
        if (callback) callback();
      }
      return now;
    };
    
    

    obj.resume();
    return obj;
  }
  
  
  
  
  

  //############################# variables ###################################
  var sessionTime = 25;
  var breakTime = 5;
  var status = 'stopped';
  // var timerComplete = true;
  var theTimer;

  $('#main-text').html('Session');
  $('#timer-text').html(sessionTime);

  $('#session-text').html(sessionTime);
  $('#break-text').html(breakTime);
  
  
  

  //event handlers ###################################################################
  $('#session-btn-neg').on('click', function() {
    if (sessionTime > 1) sessionTime--;
    $('#session-text').html(sessionTime);
    $('#timer-text').html(sessionTime);
    if (status === 'started'){
      status = 'stopped';
      theTimer.pause();
    }
  });
  $('#session-btn-pos').on('click', function() {
    sessionTime++;
    $('#session-text').html(sessionTime);
    $('#timer-text').html(sessionTime);
    if (status === 'started'){
      status = 'stopped';
      theTimer.pause();
    }
  });
  $('#break-btn-neg').on('click', function() {
    if (breakTime > 1) breakTime--;
    $('#break-text').html(breakTime);
    if (status === 'started'){
      status = 'stopped';
      theTimer.pause();
    }
  });
  $('#break-btn-pos').on('click', function() {
    breakTime++;
    $('#break-text').html(breakTime);
    if (status === 'started'){
      status = 'stopped';
      theTimer.pause();
    }
  });

  $('.timersvg').on('click', function() {
      if(status === 'stopped' || status === 'finished'){
        status = 'started';
        theTimer = startTimer(sessionTime * 60, 'session', function(){
          theTimer = startTimer(breakTime * 60, 'break', function(){ //first callback to run the break session
            status = 'finished'; //2nd callback
            var wav = 'http://soundbible.com/grab.php?id=2154&type=mp3';
            var audio = new Audio(wav);
			      audio.play();
          });
        });
      } else if(status === 'started'){
        status = 'paused';
        theTimer.pause();
      } else if(status==='paused'){
        status='started';
        theTimer.resume();
      }      
    
    

    
    
    
  });
  
  
  
  
  
  
  
  

});