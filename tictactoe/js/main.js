var updateGameState = function(gameState, choice, who) {
  // console.log(gameState, choice, who);
  for (var i = 0; i < gameState[0].length; i++) {
    if (choice === gameState[0][i]) {
      break;
    }
  }
  gameState[0].splice(i, 1);
  if (who === 'player') {
    gameState[1].push(choice);
    gameState[1].sort();
  }
  if (who === 'computer') {
    gameState[2].push(choice);
    gameState[2].sort();
  }
  // console.log('end', gameState);
  return gameState;
};





//the AI part
var getComputerChoice = function(gameState) {
  var getWinningMove = function(gs) {
    for (var k=0; k<gs[0].length; k++){
      var considerTheChoice = gs[2].concat(gs[0][k]).sort();
      if (isGameSolved(considerTheChoice)){
        var computerChoice = gs[0][k];
        return computerChoice;
      }
    }
  };
  
  var getBlockingMove = function(gs) {
    for (var j=0; j<gs[0].length; j++){
      var considerPlayerChoice = gs[1].concat(gs[0][j]).sort();
      if (isGameSolved(considerPlayerChoice)){
        var computerChoice = gs[0][j]; //in order to block the player winning
        return computerChoice;
      }
    }
  };
  
  // var log = function(gs, score){
  //   console.log(gs[0],gs[1],gs[2]);
  // };

  //********************************** the first move *******************************
  if (gameState[0].length === 8){ //i.e. if this is the first move
    var choice;
    if (gameState[1][0] === 5){ //i.e. if the player has selected the centre position
      var options = [1,3,7,9]; // four corners
      var randomCorner = Math.floor(Math.random() * 4); // pick a random corner
      choice = options[randomCorner]; //select 
      return choice;
    }
    if (gameState[1][0] != 5){ //i.e. the player has not selected the centre
      choice = 5; //pick the centre
      return choice;
    }
  }//********************************************************************************
  
  
  //********************************** the second move ********************************
  //test for second move and player occupies centre space - we know from first move that computer choose corner
  if (gameState[0].length === 6 && gameState[1].indexOf(5) >= 0){
    var choice;
    //test if player occupies the opposite corner to computer - opposite corners will add to 10
    var comp = gameState[2][0]; //square held by computer
    var play = gameState[1][0]+gameState[1][1]-5; //square held by player
    if (comp + play === 10){ //i.e. opposite corners
      var corners = [1,3,7,9]; // all corners
      corners.splice(corners.indexOf(comp),1); //remove corner occupied by computer
      corners.splice(corners.indexOf(play),1); //remove corner occupied by player
      var randomCorner = Math.floor(Math.random() * 2); // pick a random corner from two remaining
      choice = corners[randomCorner];
      return choice;
    }
    
    //test if player occupies any other square - then use block
    choice = getBlockingMove(gameState);
    return choice;
  }
  
  //test for second move and player occupies a space other than centre - we know from first move that computer will have selected the centre space
  if (gameState[0].length === 6 && gameState[2][0] === 5){
    choice = getBlockingMove(gameState);
    if (choice != undefined) {
      return choice;
    } else {
      //if block could be done choice will be returned
      //four options remain
      //1. player has 2 corners - choose any random edge 
      //2. player has 2 opposite edges - choose another edge
      //3. player has 2 adjacent edges - choose to close out the corner
      //4. player has 1 corner and a non-adjacent edge - choose the other non-adjacent corner
      var gs1 = JSON.stringify(gameState[1]);
      if (gs1 === '[1,9]' || gs1 === '[3,7]') {
        console.log('player has two corners');
        var edges = [2,4,6,8];
        var randomEdge = Math.floor(Math.random() * 4);
        choice = edges[randomEdge];
        return choice;
      }
      if (gs1 === '[2,8]' || gs1 === '[4,6]') {
        console.log('player has two opposite edges');
        if (gs1 === '[2,8]'){
          var randomEdge = Math.floor(Math.random() * 2);
          choice = [4,6][randomEdge];
          return choice;
        }
        if (gs1 === '[4,6]'){
          var randomEdge = Math.floor(Math.random() * 2);
          choice = [2,8][randomEdge];
          return choice;
        }
      }
      if (gs1 === '[2,6]' || gs1 === '[6,8]' || gs1 === '[4,8]' || gs1 === '[2,4]') {
        console.log('player has two adjacent edges');
        if (gs1 === '[2,6]') return choice = 3;
        if (gs1 === '[6,8]') return choice = 9;
        if (gs1 === '[4,8]') return choice = 7;
        if (gs1 === '[2,4]') return choice = 1;
      }
      if (gs1 === '[1,6]' || gs1 === '[1,8]' || gs1 === '[3,4]' || gs1 === '[3,8]' || gs1 === '[2,7]' || gs1 === '[6,7]' || gs1 === '[2,9]' || gs1 === '[4,9]') {
        console.log('player has 1 corner and 1 non-adjacent edge');
        if (gs1 === '[1,6]') return choice = 3;
        if (gs1 === '[1,8]') return choice = 7;
        if (gs1 === '[3,4]') return choice = 1;
        if (gs1 === '[3,8]') return choice = 9;
        if (gs1 === '[2,7]') return choice = 1;
        if (gs1 === '[6,7]') return choice = 9;
        if (gs1 === '[2,9]') return choice = 3;
        if (gs1 === '[4,9]') return choice = 7;
      }
    }
  }
  
  //************************************ third and subsequent moves ******************************
  if (gameState[0].length <= 4) {
    choice = getWinningMove(gameState);
    if (choice != undefined) {
      return choice;
    } else {
      choice = getBlockingMove(gameState);
      if (choice != undefined) {
        return choice;
      }
    }
  } 
  
  
  
  
  
  
  
  
  
  

  
  
  
  var randomIndex = Math.floor(Math.random() * (gameState[0].length));
  var randomChoice = gameState[0][randomIndex];
  //console.log("computer choices "+ randomChoice);
  return randomChoice;
};









var isGameSolved = function(arr) {
  var possibleSeq = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  var solution = false;
  var countMatches = 0;
  var index = -1;
  if (arr.length < 3 || arr.length > 5) return solution;
  for (var i = 0; i < possibleSeq.length; i++) {
    // console.log(possibleSeq[i]);
    countMatches = 0;
    for (var k = 0; k < arr.length; k++) {
      index = possibleSeq[i].indexOf(arr[k]);
      if (index != -1) countMatches++;
      // console.log('array item ' + arr[k] + ' is at index ' + index + ' matches = ' + countMatches);
      if (countMatches === 3) {
        // console.log('solution found');
        solution = possibleSeq[i];
        return solution;
      }
    }
  }
  return solution;
};






var isAvailable = function(gs, num) {
  var index = gs[0].indexOf(num);
  if (index != -1) return true;
  else return false;
};






$('document').ready(function() {
  var gameState = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9], //options available
    [], //player choices
    [] //computer choices
  ];
  var solved = false;
  var player = 'X';
  var computer = 'O';
  
  
  
  
  

  $('.button').on('click', function() {
    var playerChoose = false;
    var btnClicked = $(this).data('val');

    var available = isAvailable(gameState, btnClicked);
    if (available) {
      $(this).html(player);
      updateGameState(gameState, btnClicked, 'player');
      playerChoose = true;

      solved = isGameSolved(gameState[1]);
      if (solved) {
        $('#' + solved[0]).addClass("winner");
        $('#' + solved[1]).addClass("winner");
        $('#' + solved[2]).addClass("winner");
        $('.btn').show();
      }
    }

    if (playerChoose && !solved) {
      var computerChoice = getComputerChoice(gameState);
      $('#' + computerChoice).html(computer);

      updateGameState(gameState, computerChoice, 'computer');
      solved = isGameSolved(gameState[2]);
      if (solved) {
        $('#' + solved[0]).addClass("winner");
        $('#' + solved[1]).addClass("winner");
        $('#' + solved[2]).addClass("winner");
        $('.btn').show();
      }
    }

    //if no solution
    if (gameState[0].length === 0) {
      $('.btn').show();
    }

  });
  
  
  
  
  

  var reSetGame = function() {
    gameState = [
      [1, 2, 3, 4, 5, 6, 7, 8, 9], //options available
      [], //player choices
      [] //computer choices
    ];
    solved = false;
    for (i = 1; i < 10; i++) {
      $('#' + i).html('');
      $('#' + i).removeClass('winner');
    }
    $('.btn').hide();
  };
  
  
  
  
  

  $('#new-game').on('click', function() {
    reSetGame();
  });
  
  
  
  

  $('.choice').on('click', function() {
    if ($('#cb').is(':checked')) {
      computer = 'X';
      player = 'O';
      $('#choice').html('X');
      reSetGame();
    } else {
      computer = 'O';
      player = 'X';
      $('#choice').html('O');
      reSetGame();
    }
  });

});