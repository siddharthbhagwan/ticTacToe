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
  status_array.push(row0());
  status_array.push(row1());
  status_array.push(row2());
  status_array.push(col0());
  status_array.push(col1());
  status_array.push(col2());
  
  if(status_array.indexOf(nowPlaying.winCheck()) === -1){
    nowPlaying.toggle();
  } else {
    alert('OVER');
  }
}

function row0() {
  var result;
  result = result + $("#0").text();
  result = result + $("#1").text();
  result = result + $("#2").text();
  return result.replace(/undefined/g, '').trim();
}

function row1() {
  var result;
  result = result + $("#3").text();
  result = result + $("#4").text();
  result = result + $("#5").text();
  return result.replace(/undefined/g, '').trim();
}

function row2() {
  var result;
  result = result + $("#6").text();
  result = result + $("#7").text();
  result = result + $("#8").text();
  return result.replace(/undefined/g, '').trim();
}

function col0() {
  var result;
  result = result + $("#0").text();
  result = result + $("#3").text();
  result = result + $("#6").text();
  return result.replace(/undefined/g, '').trim();
}

function col1() {
  var result;
  result = result + $("#1").text();
  result = result + $("#4").text();
  result = result + $("#7").text();
  return result.replace(/undefined/g, '').trim();
}

function col2() {
  var result;
  result = result + $("#2").text();
  result = result + $("#5").text();
  result = result + $("#8").text();
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
