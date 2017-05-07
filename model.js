const sqlite = require('sqlite3').verbose();

class Model {
  constructor() {
  }

  getDefaultsCards(done) {
  var sqlite3 = require('sqlite3').verbose();
  var file = 'cards.db';
  var db = new sqlite3.Database(file);
  var larray = [];

    db.all('SELECT * FROM SOCIAL',(err, rows) => {

        rows.forEach(row => {
            larray.push({definition:row.definition,term:row.term});
        })
          return done(larray);
    });
  }

  getMyCards(done) {
  var sqlite3 = require('sqlite3').verbose();
  var file = 'cards.db';
  var db = new sqlite3.Database(file);
  var larray = [];

    db.all('SELECT * FROM SCIENCE',(err, rows) => {

        rows.forEach(row => {
            larray.push({definition:row.definition,term:row.term});
        })
          return done(larray);
    });
  }
}

module.exports = Model;
