$(document).ready(function() {
  //variables
  var firstNo = '';
  var secondNo = '';
  var previous = '';
  var operation = '';
  var result = '';
  var displayFlag = '';

  var btnClick;

  //function to update the display
  var updateDisplayUI = function(cd) {
    if (cd === '') {
      $('.result').html('0');
    } else {
      $('.result').html(cd.toString());
    }
  };

  //function to calculate the answer
  var calc = function(op) {
    if (secondNo === '') { //case when user changes from say + to -
      result = firstNo;
    } else {
      result = eval(firstNo + operation + secondNo);
    }
    console.log('result: ' + result);
    if (op === '='){
      operation = '';
    } else {
      operation = op;
    }
    console.log('operation set: ' + operation);
    updateDisplayUI(result);
    displayFlag = 'r';
    firstNo = result;
    console.log('firstNo set to : ' + firstNo);
    secondNo = '';
    return;
  };
  
  
  

  //button event handler
  $('.button').on('click', function() {
    btnClick = $(this).data('val');
    console.log('*************button: ' + btnClick + ' previous: ' + previous);

    //if the user presses a button or the period
    if (typeof btnClick === 'number' || btnClick === '.') {
      if (previous === '='){//previous = then number treat as new calculation
        firstNo = '';
        secondNo = '';
        operation = '';
        result = '';
        // updateDisplayUI(result);
      }
      if (operation != '') {
        secondNo += btnClick;
        console.log('secondNo: ' + secondNo);
        updateDisplayUI(secondNo);
        displayFlag = 's';
      } else {
        firstNo += btnClick;
        console.log('firstNo: ' + firstNo);
        updateDisplayUI(firstNo);
        displayFlag = 'f';
      }
    }

    switch (btnClick) {
      case '+':
        calc('+');
        break;
      case '-':
        calc('-');
        break;
      case '*':
        calc('*');
        break;
      case '/':
        calc('/');
        break;
      case '=':
        calc('=');
        break;
      case '+/-':
        if (displayFlag === 'r'){
          result = result * -1;
          updateDisplayUI(result);
          firstNo = result;
        }
        if (displayFlag === 'f'){
          firstNo = firstNo * -1;
          updateDisplayUI(firstNo);
        }
        if (displayFlag === 's'){
          secondNo = secondNo * -1;
          updateDisplayUI(secondNo);
        }
        break;

      case 'AC':
        firstNo = '';
        secondNo = '';
        operation = '';
        result = '';
        updateDisplayUI(result);
        displayFlag = 'c';
    }

    previous = btnClick;
  }); //end of button event handler

});