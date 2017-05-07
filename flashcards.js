"use strict"

var sqlite3 = require('sqlite3').verbose();
var sqlite = require('sqlite-sync');
var readlineSync = require('readline-sync')
var db = new sqlite3.Database('./cards.db');


class FlashCard {
  constructor(input) {
    this.data = this.populate(input);
  }

  populate(input) {
    if(input == undefined) input = "social"
    sqlite.connect('cards.db');
    let rows = sqlite.run(`SELECT * FROM ${input}`)
    // db.all(`SELECT * FROM ${input}`, (err, rows) => {
    //   try {
    //     let data = [];
    //     for(let i = 0; i < rows.length; i++) {
    //       data.push(rows[i]);
    //     }
    //     return data;
    //   } catch(err) {
    //     console.log(error)
    //   }
    // });
    // db.close(error => {
    //   if(error) throw error;
    // })
    return rows;
  }

  skipped(index) {
    let swapped = this.data[index];
    this.data.splice(index, 1);
    this.data.push(swapped);
  }

  correct(index) {
    this.data.splice(index, 1);
  }
}

class Execute {
  constructor() {
    this.argv = process.argv;
    let option = this.argv[2];
    this.model = new FlashCard(option);
    this.view = new Display();
    this.data = this.model.data;
    this.welcomeScreen(option);
  }

  welcomeScreen(option) {
    this.view.welcomeScreen(option);
    this.interface();
  }

  interface(number = 0, wrong = 0) {
    if(this.data.length >= 1) {
      let answer = readlineSync.question(`\n${this.data[number].definition}:\n`)

      if(answer == this.data[number].term.toString()) {
        this.model.correct(number);
        if(this.data.length > 0) this.view.correct(this.data.length);
        return this.interface(number);
      } else if(answer == "skip") {
        this.model.skipped(number);
        this.interface(number);
      } else {
        wrong++;
        this.view.wrong(wrong);
        return this.interface(number, wrong);
      }
    } else {
      this.view.win();
    }
  }
}

class Display {
  constructor() {}

  welcomeScreen(option) {
    if(option == undefined) option = "social";
    console.log(`Welcome to the game, you have chosen "${option}" questions!`)
    console.log(`\nTo play just enter the correct term for each definition. Ready? Go!`)
  }

  correct(number) {
    console.log(`Jawaban anda benar! Tersisa ${number} pertanyaan lagi`)
  }
  wrong(number) {
    console.log(`Jawaban anda salah, anda sudah salah ${number} kali`)
  }

  win() {
    console.log(`\nCongratulations! You've aced this game!`)
  }
}

let play = new Execute()
