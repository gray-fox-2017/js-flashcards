class Model {
  constructor() {
    this.fs = require('fs');
    this.tmp = [];
    this.test = [];
    this.sqlite3 = require('sqlite3').verbose();
    this.db = new this.sqlite3.Database('cards.db');
  }
  parse(){
    this.db.serialize(function() {
      this.db.all("SELECT * FROM social;", function(err, rows) {
        console.log(err);
        console.log(rows);
     });
    });
  }
}

let test = new Model();
test.parse();
module.exports = Model;
