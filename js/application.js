'use strict'

var nowPlaying = new Player();

function Player(){
  var value = 'X';

  this.current = function(){
      return value;
  };

  this.toggle = function(){
    if(value === 'X'){
      return value = 'O';
    } else {
      return value = 'X';
    }
  };
}

function markValue(){  
  if ($(this).text() === ''){
    $(this).text(nowPlaying.current());
    nowPlaying.toggle();
  }
}

function disableCell(){
  if ($(this).text() != ''){
    this.style.backgroundColor='gainsboro';
  }
}

function enableCell(){
  if ($(this).text() != ''){
    this.style.backgroundColor='white';
  }
}

$(document).ready(function(){
  $('td').hover(disableCell, enableCell);
  $('td').on('click', markValue);
});
