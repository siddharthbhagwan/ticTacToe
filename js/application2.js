'use strict'

var util = {

  valCheck: function(list) {
    var comboList = [];
    list.forEach(function(combination) {
      var tileCombo = "";
      combination.forEach(function(tileId) {
        tileCombo += $("#" + tileId).text();
      });
      comboList.push(tileCombo);
    });
    return comboList.indexOf(Array(4).join(player.currentPlayer)) > -1 ? true : false;
  },

  updateTurnUI: function(currentPlayer) {
    $("#turn").text(currentPlayer);
  }
}

var player = {

  currentPlayer: 'X',

  _togglePlayer: function() {
    board._checkForWinner();
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    util.updateTurnUI(this.currentPlayer);
  },

  play: function(squareId) {
    board.markSquare(squareId) ? this._togglePlayer(squareId) : $.noop();
  }
};

var board = {

  winningStrike: [
    ["00", "10", "20"],
    ["00", "01", "02"],
    ["01", "11", "21"],
    ["10", "11", "12"],
    ["02", "12", "22"],
    ["20", "21", "22"],
    ["00", "11", "22"],
    ["02", "11", "20"]
  ],

  _checkForWinner: function() {
    util.valCheck(this.winningStrike) ? this._gameOver() : false;
  },

  _isTheSquareMarked: function(squareId) {
    return $("#" + squareId).text() ? true : false;
  },

  markSquare: function(squareId) {
    return this._isTheSquareMarked(squareId) ? false : $("#" + squareId).text(player.currentPlayer);
  },

  _gameOver: function() {
    alert(player.currentPlayer + ' wins!');
    $(".square").text("");
  },

  reset: function() {
    $(".square").text("");
    player.currentPlayer = 'X';
  }
};

$(document).ready(function() {
  $('td').on('click', function(){
    player.play(($(this).attr('id')));
  });

  $('#reset').on('click', function(){
    board.reset();
    util.updateTurnUI(player.currentPlayer);
  });

});
