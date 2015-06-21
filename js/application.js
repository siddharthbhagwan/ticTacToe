'use strict'

var nowPlaying = (function (){
  var value = 'X';

  // Private Helper Funtions --------------------------

  // Private board IFFE
  var board = (function(){
    var rows = 3;

    return {

      // Check if won by column
      col: function(n){
        var result;
        for(var i = 0;i<rows; i++){
          var cell = i.toString() + n.toString();
          result = result + $("#" + cell).text();
        }
        return result.replace(/undefined/g, '').trim();
      },

      // Check if won by row
      row: function(n){
        var result;
        for(var i = 0;i<rows; i++){
          var cell = n.toString() + i.toString();
          result = result + $('#' + cell).text();
        }
        return result.replace(/undefined/g, '').trim();
      },

      // Check if won diagonally
      diagonal1: function(){
        var result;
        for(var i = 0;i<rows; i++){
          var cell = i.toString() + i.toString();
          result = result + $('#' + cell).text();
        }
        return result.replace(/undefined/g, '').trim();
      },

      // Check if won diagonally
      diagonal2: function(){
        var result;
        for(var i = 0;i<rows; i++){
          var cell = i.toString() + (rows - i - 1).toString();
          result = result + $('#' + cell).text();
        }
        return result.replace(/undefined/g, '').trim();
      },

      checkWinner: function(){
        var status_array = new Array;
        for (var i=0; i<rows; i++){
          status_array.push(board.col(i));
          status_array.push(board.row(i));    
        }
        status_array.push(board.diagonal1());
        status_array.push(board.diagonal2());

        if(status_array.indexOf(nowPlaying.winCheck()) === -1){
          if ($('table td:empty').length === 0 ){
            $('.game-status').text('Draw! Reset to begin again!');
          } else {
            nowPlaying.toggle();
          }
        } else {
          board.highlight(status_array.indexOf(nowPlaying.winCheck()));
          $('.game-status').text(nowPlaying.current() + ' Wins! Game Over');
          $('td').unbind('click mouseenter mouseleave');
        }
      },

      highlight: function(n){
        switch (n){
          case 0: //col 0
            $("#00, #10, #20").css('color','#B03060');
            break;

          case 1: //col 2
            $("#00, #01, #02").css('color','#B03060');
            break;

          case 2:
            $("#01, #11, #21").css('color','#B03060');
            break;

          case 3:
            $("#10, #11, #12").css('color','#B03060');
            break;              

          case 4:
            $("#02, #12, #22").css('color','#B03060');
            break;

          case 5:
            $("#20, #21, #22").css('color','#B03060');
            break;

          case 6:
            $("#00, #11, #22").css('color','#B03060');
            break;

          case 7:
            $("#02, #11, #20").css('color','#B03060');
            break;
        }
      }
    }
  })();

  function _returnValue(){
    return value;
  }

  function _toggleUpdateXO(){
  if (value === 'X'){
      value = 'O';
      $('#turn').text(value + "'s");
      return value;
    } else {
      value = 'X';
      $('#turn').text(value + "'s");
      return value = 'X';
    }
  }

  // Private Helper Functions End -----------

  // Public Functions that are exposed

  return {

    current: function(){
      return _returnValue();
    },

    toggle: function(){
      return _toggleUpdateXO();
    },

    winCheck: function(){
      return value + value + value;
    },

    markValue: function(){
      if (this.style.opacity === '0.2'){
        this.style.opacity = '1';
        $(this).text(nowPlaying.current());
        board.checkWinner();
      }
    }
  }
})();


function disableCell(){
  if ($(this).text() != ''){
    this.style.backgroundColor='gainsboro';
  } else {
    $(this).text(nowPlaying.current());
    this.style.opacity='0.2';
  }
}

function enableCell(){
  this.style.backgroundColor='white';
  if (this.style.opacity === '0.2'){
    $(this).text('');
    this.style.opacity='1';
  }
}

function resetBoard(){
  $('td').text('');
  $('td').hover(disableCell, enableCell)
  .on('click', nowPlaying.markValue)
  .css('color', '#000000')
}

$(document).ready(function(){
  $('td').hover(disableCell, enableCell)
  .on('click', nowPlaying.markValue);
  $('#reset').on('click', resetBoard);
});
