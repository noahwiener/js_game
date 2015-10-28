(function() {
  'use strict';
  if (typeof Game === 'undefined'){
    window.Game = {};
  }

  var Board = Game.Board = function(size){
    this.size = size || 4;
    this.newEmptyGrid();
    this.addStartingTiles();
  };

  Board.prototype.newEmptyGrid = function(){
    this.grid = [];
    for (var i = 0; i < this.size; i++) {
      var row = [];
      for (var j = 0; j < this.size; j++) {
        row.push([]);
      }
      this.grid.push(row);
    }
  };

  Board.prototype.isEmptySquare = function(pos){
    // find if position contains tile (truthy) or null, return opposite boolean
    return !this.grid[pos[0]][pos[1]];
  };

  Board.prototype.randomPos = function(){
    var row = Math.floor(Math.random() * this.size);
    var col =  Math.floor(Math.random() * this.size);
    return [row, col];
  };

  Board.prototype.findEmpty = function(){
    var random = this.randomPos();
    while (!this.isEmptySquare(random)){
      random = this.randomPos();
    }
    return random;
  };

  Board.prototype.place = function(pos, tile){
    this.grid[pos[0]][pos[1]] = tile;
  };

  Board.prototype.addStartingTiles = function(){
    var first = new Game.Tile({ board: this });
    var second = new Game.Tile({ board: this });
    this.place(this.randomPos, first);
    this.place(this.findEmpty, second);
  };

}());
