'use strict'

class View{
  constructor() {

  }

  skip(index){
    console.log(`Question Number ${index} Skip\n`);
  }

  back(){
    console.log(`press ctrl C to exit`);
  }

  choice(choice) {
    switch(choice){
      case 'social' : console.log(`You choosing ${choice} Quiz`);break;
      case 'sains' : console.log(`You choosing ${choice} Quiz`);break;
      default : console.log(`Please input you question category`);break;
    }
  }

  judgement(input, answer){
    console.log(`\nGuess: ${input}`);
    let judge = (answer === true) ? `Correct` : `incorrect\' please try again`;
    console.log(judge);
  }

  answered(guess, input, hint){
    let answer = (guess === 1) ? `wrong answer` : (guess > 1 && guess < 5) ? `wrong answer ${guess}` : `Your answer has meet limit you must answer : ${hint}`;
    console.log(answer);
  }

  start(){
    console.log(`Please select a flashcard\n++++++Rules of Game+++++++\nbabel-node flashcard.js social\nbabel-node flashcard.js sains`);
  }

  wrongchoice() {
    console.log('Wrong Quiz name');
  }

  displayQuestion(quiz) {
    console.log('\n' +quiz);
  }

  win() {
    console.log(`Congratulation you win!!!`);
  }
}


export default View
