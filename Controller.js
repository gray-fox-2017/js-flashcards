'use strict'

import View from "./View.js"
import Model from "./Model.js"

const  readline = require('readline');
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
  prompt : ">"
})


class Controller{
  constructor(rows){
    this.view = new View();
    this.model = new Model(rows);
    this.guess = 0;
    this.quiz = this.model.choice
    this.indexquiz = this.getIndex();
    this.index = 0
  }


  getIndex(){
    let temp = [];
    for (var i = 0; i < this.quiz.length; i++) {
      temp.push(i)
    }
    return temp;
  }

  init(choice){
    if(!choice) {
      this.view.start()
    }
    this.view.choice(choice)
    this.start()
  }

  start(){
    rl.question('Press enter to Start the Game', (answer)=>{
      this.displayQuestion();
    })
  }

  displayQuestion(){
    if(this.indexquiz.length == 0) {
      this.view.win()
      rl.close();
    }
    else{
      this.view.displayQuestion(this.quiz[this.indexquiz[this.index]].definition);
      this.answer();
    }
  }

  answer() {
    rl.question('Please answer here ', (input)=>{
      let answer = input.toLowerCase().trim() === this.quiz[this.indexquiz[this.index]].term.toLowerCase().trim();

      if(answer === true && this.indexquiz.length > 0){
        this.view.answered(this.guess,answer,this.quiz[this.indexquiz[this.index]].term)
        this.guess = 0;
        this.indexquiz.shift();
        // console.log(this.indexquiz);
        this.view.judgement(input, answer);
        this.displayQuestion();
      } else if (input.toLowerCase().trim() === 'skip' && this.indexquiz.length > 0) {
        this.view.skip(this.indexquiz[0+1])
        this.indexquiz.push(this.indexquiz[0]);
        this.indexquiz.shift();
        this.displayQuestion()
      } else if (answer === false && this.indexquiz.length > 0 && input.toLowerCase().trim() !== 'skip') {
        this.view.answered(this.guess,answer,this.quiz[this.indexquiz[this.index]].term)
        console.log(this.quiz[this.indexquiz[this.index]].term);
        this.guess += 1;
        this.view.judgement(input, answer)
        this.displayQuestion()
      }
    });
  }
}



export default Controller
