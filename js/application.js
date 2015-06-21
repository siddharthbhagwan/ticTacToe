'use strict'

var rows = 3;

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

  this.winCheck = function(){
    return value + value + value;
  }
}

function markValue(){  
  if ($(this).text() === ''){
    $(this).text(nowPlaying.current());
    checkWinner();
  }
}

function checkWinner(){
  var status_array = new Array;
  for (var i=0; i<rows; i++){
    status_array.push(col(i));
    status_array.push(row(i));    
  }
  status_array.push(diagonal1());
  status_array.push(diagonal2());
  
  if(status_array.indexOf(nowPlaying.winCheck()) === -1){
    nowPlaying.toggle();
  } else {
    $(".game-status").text(nowPlaying.current() + " Wins! Game Over")
  }
}

function col(n) {
  var result;
  for(var i = 0;i<rows; i++){
    var cell = i.toString() + n.toString();
    result = result + $("#" + cell).text();
  }
  return result.replace(/undefined/g, '').trim();
}

function row(n) {
  var result;
  for(var i = 0;i<rows; i++){
    var cell = n.toString() + i.toString();
    result = result + $("#" + cell).text();
  }
  return result.replace(/undefined/g, '').trim();
}

function diagonal1(){
  var result;
  for(var i = 0;i<rows; i++){
    var cell = i.toString() + i.toString();
    result = result + $("#" + cell).text();
  }
  return result.replace(/undefined/g, '').trim();
}

function diagonal2(){
  var result;
  for(var i = 0;i<rows; i++){
    var cell = i.toString() + (rows - i - 1).toString();
    result = result + $("#" + cell).text();
  }
  return result.replace(/undefined/g, '').trim();
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
