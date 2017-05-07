"use strict"
// write your code here
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cards.db');
const tebakan = require('./quiz.js');


class flashcard{
  constructor(){
    this.category = null;
  }

  mulai() {
    rl.question(`Selamat datang di kuis flashcard, silahkan pilih kategori!\n\n[1] Social\n[2] One Piece\n[3] Lirik Lagu\n\n`, x => {
      if (x == '1') {
        this.category = 'social'
        this.kuis()
      } else if(x == '2') {
        this.category = 'onePiece'
        this.kuis()
      } else if (x == '3') {
        this.category = 'lirikLagu'
        this.kuis()
      } else {
        this.mulai();
      }
    })
  }

  kuis() {
    let query = `SELECT * FROM ${this.category};`;// socialnya mesti di ganti klo mau fleksibel

    db.all(query, function(err, rows){
            if (err){
              console.log('error')
            } else {
              let gameOn = new tebakan(rows);
              console.log('\x1B[2J');
              gameOn.init()
            }
          })
  }
}



let kokError = new flashcard();

kokError.mulai()
