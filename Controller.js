"use strict"

import View from "./View.js"
import Model from "./Model.js"


const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output:process.stdout,
    prompt: ""
    })


class Controller{
  constructor(rows){
    this.view = new View
    this.model = new Model(rows)
    this.currentQuiz = 0
    this.guess = 0
    this.quiz = this.model.quiz
    // this.skipcounter = []
    // this.counter = 0
    // this.quizcounter = 0
    // this.skiplast = 0
    this.indexquiz = this.getIndex()
    this.index = 0
  }
  
  getIndex(){
    let arr = []
    for (let i = 0; i < this.quiz.length; i++){
      arr.push(i)
    }
    return arr
  }
  
  init(choice){
    if(!choice){
      this.view.start()
    }
    this.view.choice(choice)
    this.start() 
  }
  
  start(){
    rl.question('Press Enter to Start! ', (answer)=>{
      this.displayQuestion()
    })
  }
  
  displayQuestion(){
    if(this.indexquiz.length === 0){
      this.view.win()
      rl.close()
    }
    else{
    this.view.displayQuestion(this.quiz[this.indexquiz[this.index]].definition);
    this.answer()
    }
  }

  answer(){
  rl.question('Your answer here => ',(input) => {
    let answer = input.toLowerCase().trim() === this.quiz[this.indexquiz[this.index]].term.toLowerCase().trim()
    
    if(answer === true && this.indexquiz.length > 0){
       this.guess = 0
       this.indexquiz.shift();
       this.view.judgement(input,answer)
       this.view.answered(this.guess,answer,this.quiz[this.indexquiz[this.index]].term)
       this.displayQuestion();
     }
    else if(input.toLowerCase().trim() ==='skip' && this.indexquiz.length>0){
      this.view.skip(this.indexquiz[0+1])
      this.indexquiz.push(this.indexquiz[0]);
      this.indexquiz.shift();
      this.displayQuestion()
    }
    else if(answer === false && this.indexquiz.length > 0 && input.toLowerCase().trim() !== 'skip'){
       this.guess += 1;
       this.view.judgement(input,answer)
       this.view.answered(this.guess,answer,this.quiz[this.indexquiz[this.index]].term)
       this.displayQuestion()
      }       
   });
  }
}

  
  // answer(){
  // rl.question('Your Answer => ',(answer)=>{
  //   if(this.quiz[this.currentQuiz].term.toLowerCase().trim() === answer.toLowerCase().trim() && this.currentQuiz < this.quiz.length -1 && this.quizcounter < 5){
  //     this.result = true
  //     this.currentQuiz += 1
  //     this.view.answered(this.guess,answer,this.result)
  //     this.guess = 0
  //     this.quizcounter += 1
  //     this.displayQuestion()
  //   }
  //   
  //   if(this.quiz[this.currentQuiz].term.toLowerCase().trim() === answer.toLowerCase().trim() && this.skipcounter.length > 0 && this.quizcounter >= 5){
  //     this.result = true
  //     if(this.skiplast >= 1){
  //       this.currentQuiz = this.skipcounter[1]
  //       this.skiplast = 0
  //     }
  //     else{
  //     this.currentQuiz = this.skipcounter[0]  
  //     console.log('if jawab bener di skip ' + this.skipcounter)  
  //     this.view.answered(this.guess,answer,this.result)
  //     }
  //     if(this.skipcounter.length === 0){
  //       this.view.win()
  //     }
  //     else{
  //     this.skipcounter.shift()
  //     this.displayQuestion()
  //     }
  //   }
  //   
  //   else if (answer.toLowerCase().trim() === 'skip'){
  //     console.log( 'else if skip ' + this.skipcounter);  
  //     for (let i = 0; i < this.skipcounter.length; i++) {
  //       if(this.skipcounter[i] === this.currentQuiz){
  //         this.counter += 1
  //       }    
  //     }
  //     if(this.counter < 1){
  //       this.skipcounter.push(this.currentQuiz)
  //     }
  //     if(this.quizcounter >= 5){
  //       this.currentQuiz = this.skipcounter[0]
  //       this.skiplast += 1
  //       this.displayQuestion()
  //     }
  //     else{
  //       console.log('di else skip ' + this.skipcounter);
  //       this.quizcounter += 1
  //       this.currentQuiz += 1
  //       this.displayQuestion()
  //     } 
  //   
  //   }
  //   
  //   else if(this.quiz[this.currentQuiz].term.toLowerCase().trim() === answer.toLowerCase().trim() && this.quizcounter >= this.quiz.length -1 && this.skipcounter.length === 0){
  //       this.view.win()
  //       }
  //          
  //   else{
  //       this.result = false
  //       this.guess += 1
  //       this.view.answered(this.guess,answer,this.result)
  //       this.displayQuestion()
  //     }
  //   })
  // }
  

export default Controller
