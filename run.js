const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cards.db')
const Model = require('./flashcards').Model;
const View = require('./flashcards').View;
const Controller = require('./flashcards').Controller;

function run(param){
  db.serialize(function(){
    var query = `SELECT * FROM ${param}`;
    db.all(query,(err,rows)=>{
      if(!err){
        //let modelss = new Model(rows)
        let aldy = new Controller(rows)
        aldy.start()
      } else {
        console.log(err);
      }
    });
  })
}


let argv = process.argv
let param = argv[2]
run(param)