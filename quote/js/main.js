function getRanQuote(){
  var quotes = [
  {
    "id": 1,
    "quote": "God is most glorified in us when we are most satisfied in Him",
    "author": "John Piper"  
  },
  {
    "id": 2,
    "quote": "Let us not seek to satisfy our thirst for freedom by drinking from the cup of bitterness and hatred.",
    "author": "Martin Luther King Jr."
  },
  {
    "id": 3,
    "quote": "It is better to lose your life than to waste it.",
    "author": "John Piper"
  },
  {
    "id": 4,
    "quote": "There is not one blade of grass, there is no color in this world that is not intended to make us rejoice.",
    "author": "John Calvin"
  },
  {
    "id": 5,
    "quote": "He that has doctrinal knowledge and speculation only, without affection, never is engaged in the business of religion.",
    "author": "Jonathan Edwards"
  },
  {
    "id": 6,
    "quote": "Never think that you need to protect God. Because anytime you think you need to protect God, you can be sure that you are worshipping an idol.",
    "author": "Stanley Hauerwas"
  },
  {
    "id": 7,
    "quote": "Cheap grace is the deadly enemy of our church. We are fighting today for costly grace.",
    "author": "Dietrich Bonhoeffer"
  },
  {
    "id": 8,
    "quote": "Suffering provides the gym equipment on which my faith can be exercised.",
    "author": "Joni Eareckson Tada"
  },
  {
    "id": 9,
    "quote": "The main things are the plain things, and the plain things are the main things.",
    "author": "Alistair Begg"
  },
  {
    "id": 10,
    "quote": "Prayer is an acknowledgment that our need of God's help is not partial but total.",
    "author": "Alistair Begg"
  },
  {
    "id": 11,
    "quote": "life is hard then you die",
    "author": "david"
  }
];
  var quoteno = 0;
  do{
    var randomquote = Math.floor(Math.random()*quotes.length);
  } while (randomquote === quoteno);
  
  //store the new number for next call
  quoteno = randomquote;
  console.log(quoteno);
  var quote = quotes[randomquote];
  
  return quote;
}



function getRanColor(){
  var colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
  var colorno = 0;
  do{
    var rancolor = Math.floor(Math.random()*colors.length);
  } while (rancolor === colorno);
  colorno = rancolor;
  return colors[rancolor];
}



function setTheColor(col){
  //$(".quote").html(quo.quote);
  $(".quote").css("color", col);
  //$(".author").html(quo.author);
  $(".author").css("color", col);
  $("body").css("background-color", col);
  //$( "body" ).css( "background-color", col );
  $("#quotebtn").css("background-color", col);
  $("#quotebtn").css("border-color", col);
  $("#quotebtn").css("color", "#f5f5f5");
  
  $("#twitterbtn").css("background-color", col);
  $("#twitterbtn").css("border-color", col);
  $("#twitterbtn").css("color", "#f5f5f5");
  
  $(".icon").css("color", col);
  $(".pageby").css("color", "#f5f5f5");
}

function setTheQuote(quo){
  $(".quote").html(quo.quote);
  $(".author").html(quo.author);
}


$(document).ready(function() {
  //initial quote
  var quote = getRanQuote();
  var pgColor = getRanColor();
  setTheQuote(quote);
  setTheColor(pgColor);

  $("#quotebtn").on("click", function(){
    $(".quoteinfo").fadeOut(600, function(){
      quote = getRanQuote();
      pgColor = getRanColor();
      setTheQuote(quote);
      setTheColor(pgColor);
      $(".quoteinfo").fadeIn(600);
    });
    //$("body").animate({ background-color: red; }, 600);
    
  });
});