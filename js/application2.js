'use strict'

var util = {

  checkWinningStrike: function(list) {
    var comboList = [];
    list.forEach(function(combination) {
      var squareCombo = "";
      combination.forEach(function(squareId) {
        squareCombo += $("#" + squareId).text();
      });
      comboList.push(squareCombo);
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
    util.checkWinningStrike(this.winningStrike) ? this._gameOver() : false;
  },

  _isTheSquareMarked: function(squareId) {
    return $("#" + squareId).text() ? true : false;
  },

  markSquare: function(squareId) {
    return this._isTheSquareMarked(squareId) ? false : $("#" + squareId).text(player.currentPlayer);
  },

  _gameOver: function() {
    alert(player.currentPlayer + ' wins!');
    this._freeze();
  },

  _freeze: function() {
    $('td').unbind('click hover');
  },

  reset: function() {
    $('.square').text('');
    $('td').on('click', placeAMark);
    player.currentPlayer = 'X';
  }
};

function placeAMark() {
  player.play(($(this).attr('id')));
}

$(document).ready(function() {
  $('td').on('click', placeAMark);
  
  $('#reset').on('click', function(){
    board.reset();
    util.updateTurnUI(player.currentPlayer);
  });

});
