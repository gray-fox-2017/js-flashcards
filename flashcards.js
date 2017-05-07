"use strict"

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Model {
  constructor(file) {
    this.file = file
  }
  readFile() {
        let fs = require('fs');
        let data = fs.readFileSync(this.file).toString();
        if (data.toString()) {
            data = JSON.parse(data);
        } else {
            data = [];
        }
        return data;
  }
  nextQuestion(index, data) {
    return data.splice(index, 1);
  }
}

class View {
  constructor() {

  }

  menu(deck) {
   console.log(`Welcome to JS Flash Cards, you have choosen "${deck}" questions!`);
   console.log(`To play just enter the correct term for each definition. Ready? Go!`);
  }

  wrong_asnwer(count) {
    console.log(`Your Answer is Wrong!, Try Again!`)
    console.log(`You've already guess ${count} times!`);
  }

  failed(count) {
    console.log('Unfurtunately, YOU LOST!!');
    console.log(`You've already guess ${count} times!`);
  }

  correct_answer(count) {
    console.log(`Correct!`)
    //console.log(`You've already guess ${count} times!`);
  }

  finish() {
    // return asnwer === "exit" ? console.log("Thanks For PLayinh Flashcards!");
    console.log("Congratulations! Your WIN!!");
  }

  error() {
    console.log("Please Correct Your Input...!");
  }



}
class Controller {
  constructor() {
    this.model = new Model('data.json')
    this.data = this.model.readFile()
    this.view = new View(this.data)

  }

  run() {
    this.view.menu("social")
    let index = 0
    let count = 0
    let count_wrong = 0
    let data
    console.log(this.data[index].definition);
    rl.on('line', (answer) => {
      if (this.data[index].term.toLowerCase() === answer.toLowerCase()) {
        //console.log("Jawaban Benar!");
        this.view.correct_answer(count)
        count++
        index++
      } else {
        //console.log("Jawaban Salah!");
        this.view.wrong_asnwer(count_wrong)
        count_wrong++
        if(count_wrong >=5) {
          this.view.failed(count_wrong)
          rl.close()
        }
      }
      if(count_wrong < this.data.length && index < this.data.length) {
        console.log(this.data[index].definition);
      } else if (index >= this.data.length){
        this.view.finish()
        rl.close()
      }

    })
  }

}

let play = new Controller();
play.run();