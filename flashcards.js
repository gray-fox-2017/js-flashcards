"use strict"
const rls = require('readline-sync');
const sqlite = require('sqlite-sync');
sqlite.connect('./cards.db');

class Model {
  constructor() {
    this.readCategory();
    this._deck = [];
  }

  emptyDeck() {
    this._deck = [];
  }

  readFlashCard(category = 'economy') {
    let select =`SELECT*FROM ${category}`;
    this._deck = sqlite.run(select);
  }

  readCategory() {
    this._category = [];
    let cat = sqlite.run("SELECT name FROM msCategory");
    cat.forEach((x)=>this._category.push(x.name));
  }

  getStrCategory() {
    return this._category.join(' | ');
  }

  searchCategory(category) {
    return this._category.findIndex( (x)=> x === (''+category).trim().toLowerCase());
  }


}

class Controller {
  constructor() {
    this._view = new View();
    this._model = new Model();
  }
  start() {
    this._hint = 5;
    this._heart= 5;
    this._model.emptyDeck();
    this._view.showStart();
    this.inputCategory();
  }
  inputCategory() {
    let category = this._model.getStrCategory();
    let options = '';
    let idx = -1;
    while(options === '' || idx === -1) {
      options = rls.question(`Insert the deck you want to play [${category}]`);
      idx = this._model.searchCategory(options);
      if (idx == -1) {
        this._view.showErrMsg('ERROR',`Category "${options}" is not exist`);
        options = '';
      } else {
        this._model.readFlashCard(options);
        console.log('play')
        this.playDeck();
      }
    }
  }

  playDeck() {
    let ans = '';
    let idx = 0;
    this._model._deck.forEach((x) => {
      if(this._heart > 0){
        this._view.showDefinition(x.definition);
        while (ans === '' && this._heart > 0) {
          ans = rls.question(`The term is : `);
          if (ans.trim().toLowerCase() === 'hint') {
            if (this._hint > 0 ){
              this._hint -= 1;
              console.log(`${this._hint} hint left`);
              console.log(x.term[0]+ x.term.substr(1).replace(/\w/gi,'.'));
            } else
              console.log('You are out of hint!');
            ans = '';
          } else if (ans.trim().toLowerCase() !== x.term.trim().toLowerCase()) {
            if (this._heart > 0) {
              this._heart -= 1;
              console.log(`Only ${this._heart} heart left`);
              this._view.showErrMsg('INCORRECT','Try again!');
              ans = '';
            }
          } else this._view.showScsMsg();
        }
        ans = '';
        idx += 1;
      }
    });

    let stat = (this._heart > 0? 'win' : 'lose');
    this.endGame(stat);
  }

  endGame(stat) {
    if (stat === 'win') this._view.showWin();
    else this._view.showLose();

    let playAgain = rls.question('Do you want to play again [y|n]? ');
    if (playAgain.trim().toLowerCase() === 'y') {
      this.start();
    } else {
      this._view.showGoodLuck();
    }

  }

  lose() {}
}

class View {
  constructor() {

  }
  showStart() {
    this.reset();
    console.log('===============================');
    console.log('Welcome To JS FLASHCARDS');
    console.log('===============================');
    console.log('You got 5 hint and 5 live');
    console.log('- write HINT to get the first character');
    console.log('To play just enter the corect terms \nfor each definition and press enter.\nReady? Go');
    console.log('===============================');
  }
  showErrMsg(tag,err) {
    console.log(`[${tag}]${err}`);
  }
  showScsMsg(scs) {
    console.log('Correct!');
  }
  showDefinition(def) {
    console.log(`[DEFINITION] ${def}`);
  }
  showWin() {
    this.reset();
    console.log('You Win!');
  }
  showLose() {
    this.reset();
    console.log('You Lose! You better study next time');
  }
  showGoodLuck() {
    this.reset();
    console.log('Bye Buddy, Rest Well and Good Luck for Your Exam');
  }
  reset(){
    console.log("\x1B[2J");
  }

}

// let model = new Model();
let fc = new Controller();
fc.start();