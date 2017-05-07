"use strict"
import Controller from './controller'

// write your code here
class View {
  constructor() {

  }

  welcome(){
    console.log(`\n***Welcome to JS Flash Cards. To play, just enter the correct term for each definition. Ready? GO!***\n`);
  }
  wrong_answer(){
    console.log(`\nYour Answer is Wrong\n`);
  }

  question(input){
    console.log(`Question: ${input}`);
  }

  result(){
    console.log(`Congratulation You Win!!!`);
  }
}

export default View
