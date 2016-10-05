var getRandomNumber = function() {
  var number = Math.floor((Math.random() * 4) + 1);
  return number;
};

var initSounds = function() {
  var greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  greenSound.load();
  var redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  redSound.load();
  var blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  blueSound.load();
  var yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  yellowSound.load();
  var sound = {
    'g': greenSound,
    'r': redSound,
    'b': blueSound,
    'y': yellowSound
  }
  return sound;
};

var updateCounter = function(value) {
  if (value < 0) {
    $('#counter').html('');
  }
  if (value === 0) {
    $('#counter').html('00');
  }
  if (value > 0 && value < 10) {
    $('#counter').html('0' + value);
  }
  if (value > 9) {
    $('#counter').html(value.toString());
  }
};

var playGreen = function(sound, speed) {
  $('.greenquad').toggleClass('greenquadon');
  sound.g.play();
  setTimeout(function() {
    $('.greenquad').toggleClass('greenquadon');
  }, speed);
};

var playRed = function(sound, speed) {
  $('.redquad').toggleClass('redquadon');
  sound.r.play();
  setTimeout(function() {
    $('.redquad').toggleClass('redquadon');
  }, speed);
};

var playBlue = function(sound, speed) {
  $('.bluequad').toggleClass('bluequadon');
  sound.b.play();
  setTimeout(function() {
    $('.bluequad').toggleClass('bluequadon');
  }, speed);
};

var playYellow = function(sound, speed) {
  $('.yellowquad').toggleClass('yellowquadon');
  sound.y.play();
  setTimeout(function() {
    $('.yellowquad').toggleClass('yellowquadon');
  }, speed);
};

var playError = function(sound, speed){
  $('.controlcircle').toggleClass('error');
  sound.g.play();
  sound.r.play();
  setTimeout(function(){
    $('.controlcircle').toggleClass('error');
  }, speed);
};

var playWin = function(sound, speed){
  $('.controlcircle').toggleClass('win');
  // sound.g.play();
  setTimeout(function(){$('.controlcircle').toggleClass('win');}, 300);
  setTimeout(function(){$('.controlcircle').toggleClass('win');}, 600);
  setTimeout(function(){$('.controlcircle').toggleClass('win');}, 900);
  setTimeout(function(){$('.controlcircle').toggleClass('win');}, 1200);
  setTimeout(function(){$('.controlcircle').toggleClass('win');}, 1500);
};

var playSequence = function(seq, sound, speed, speedMultiple) {
  for (var i = 0; i < seq.length; i++) {
    switch (seq[i]) {
      case 1:
        setTimeout(function() {
          playGreen(sound, speed)
        }, speed * speedMultiple * i);
        break;
      case 2:
        setTimeout(function() {
          playRed(sound, speed)
        }, speed * speedMultiple * i);
        break;
      case 3:
        setTimeout(function() {
          playBlue(sound, speed)
        }, speed * speedMultiple * i);
        break;
      case 4:
        setTimeout(function() {
          playYellow(sound, speed)
        }, speed * speedMultiple * i);
        break;
    } //end switch
  } //end for loop
};

var checkMatch = function(simonArr, playerArr) {
  var match;
  for (var i = 0; i < playerArr.length; i++) {
    match = playerArr[i] === simonArr[i];
    // console.log('index ' + i + ' player ' + playerArr[i] + ' simon ' + simonArr[i] + ' => ' + match);
    if (!match) return match; //i.e. return false 
  }
  return match;
};

var resetGame = function(gameObj) {
  gameObj.start = false;
  gameObj.simonSeq = [];
  gameObj.playerSeq = [];
  gameObj.counter = 0;
  console.log(gameObj);
  return gameObj;
};



//################################ document ready function
$(document).ready(function() {
  var timer;
  var sound = initSounds();
  //max speed for the mp3 is 150 and 3.5
  var speed = 200; //the length of time the light stays on
  var speedMultiple = 4; //speed at which the game operates
  var gameOn = false;
  var strictMode = false;
  var repeatFlag = false;
  var game = {
    start: false,
    simonSeq: [],
    playerSeq: [],
    counter: 0
  };
  
  
  
  
  
  
  
  
  
  
  var playGame = function() {
    clearTimeout(timer);
    if (!repeatFlag) {
      game.simonSeq.push(getRandomNumber());
      game.counter++;
      updateCounter(game.counter);
    }
    repeatFlag = false; //i.e. reset the repeat
    game.playerSeq = []; //reset the player 
    console.log(game.simonSeq);
    playSequence(game.simonSeq, sound, speed, speedMultiple);
  };
  
  
  
  
  var reStartPlay = function(){
    if (!strictMode) {
        repeatFlag = true;
        setTimeout(function(){playGame();}, 2000);
      } else {
        resetGame(game);
        setTimeout(function(){playGame();}, 2000);
      }
  };
  
  
  
  
  
  
  var buttonEvent = function(btn){
    switch (btn) {
      case 1:
        playGreen(sound, speed);
        break;
      case 2:
        playRed(sound, speed);
        break;
      case 3:
        playBlue(sound, speed);
        break;
      case 4:
        playYellow(sound, speed);
        break;
    }
    game.playerSeq.push(btn);
    console.log('simon seq ' + game.simonSeq);
    console.log('player seq ' + game.playerSeq);
    var playerError = false;
    for (var j = 0; j < game.playerSeq.length; j++) {
      if (!checkMatch(game.simonSeq, game.playerSeq)) {
        playerError = true;
        break;
      }
    }
    if (playerError) {
      console.log('player error');
      playError(sound, speed);
      reStartPlay();
    } else {
      console.log('player correct');
      if (game.simonSeq.length === game.playerSeq.length) {
        if (game.simonSeq.length === 10){
          speed = 160;
          speedMultiple = 3.5;//speed up the game 
        }
        if (game.simonSeq.length === 20){
          console.log('your done CONGRATS');
          playWin(sound, 3000);
          resetGame(game);
        }
        setTimeout(function() {
          playGame();
        }, 1500);
      }
    }
    clearTimeout(timer);
    timer = setTimeout(function(){
      playError(sound, speed);
      reStartPlay();
    }, 4000);
  };
  
  
  

  $('.button').on('click', function() {
    var button = $(this).data('val');
    buttonEvent(button);
  });
  
  //save wanted

  
  
  
  
  
  
  
  
  
  
  
  
  
  //event handlers
  $('.onoff').on('click', function() {
    $('#onswitch').toggleClass('onbtn');
    if (!gameOn) {
      updateCounter(00);
      gameOn = true;
      resetGame(game);
    } else {
      updateCounter(-1);
      gameOn = false;
    }

  });

  $('.strict').on('click', function() {
    $('.strictlight').toggleClass('strictlighton');
    if (!strictMode) {
      strictMode = true;
      console.log('strict mode selected');
    } else {
      strictMode = false;
      console.log('strict mode turned off');
    }
  });

  $('.start').on('click', function() {
    if (gameOn) {
      resetGame(game);
      setTimeout(function() {
        playGame();
      }, 1500);
      console.log('end of start button event');
    } else {
      return;
    }
  });

});