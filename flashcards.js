import Controller from './Controller.js'
import Model from './Model.js'
import View from './View.js'

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cards.db');

class Flashcard{
  constructor(choice){
    this.choice = choice
}

quiz(choice){
    let query = `SELECT * FROM ${this.choice}`;
      db.all(query, function(err, rows){
        if (err){
          let menu = new View
          menu.start()
          menu.back()
        } else {
          let data = new Model(rows)
          let game = new Controller(rows)
          game.init(choice)
          }
        })  
      }    
    }


let argv = process.argv  
let start = new Flashcard(argv[2])
start.quiz(argv[2])
