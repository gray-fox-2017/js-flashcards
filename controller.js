"use strict"
import Model from './model'
import View from './view'

const readline = require('readline');

let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'Guess: '
});
// write your code here
class Controller {
  constructor(input) {
    this.model = new Model(input)
    this.file = this.model.file
    this.view = new View()
    this._nextquest = 0
    this._correct = 0
  }
  start(){
    this.view.welcome()
    this.view.question(this.file[this._nextquest].definition)
    rl.prompt()

    rl.on('line', (line)=>{
      if(line.toLowerCase() == 'skip'){
        this.file.push(this.file[this._nextquest])  //pertanyaan di push untuk disimpan
        this.nextquest(1)
        this.view.question(this.file[this._nextquest].definition)
        rl.prompt()
      } else {
        if(line.toLowerCase() == this.checkAnswer().toLowerCase() && this._nextquest != this.file.length){
          // this.correct(1)
          this.nextquest(1)
          if(this._nextquest != this.file.length){
            this.view.question(this.file[this._nextquest].definition)
            rl.prompt()
          } else {
            this.view.result()
            rl.close()
          }
        } else {
          this.view.wrong_answer()
          if(this._nextquest != this.file.length){
            this.view.question(this.file[this._nextquest].definition)
            rl.prompt()
          }
        }
      }
    })
  }
  nextquest(input){
    this._nextquest += input
    // return this.next
  }
  correct(value){
    this._correct += value
  }
  checkAnswer(){
    return this.file[this._nextquest].term
  }
}
export default Controller
