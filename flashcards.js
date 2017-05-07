"use strict"
const rls = require('readline-sync');
const sqlite = require('sqlite-sync');
sqlite.connect('./cards.db');

class Deck {
  constructor() {
    this.readCategory();
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
  getStrCategory() { return this._category.join(' | '); }
  searchCategory(category) {
    return this._category.findIndex( (x)=> x.trim().toLowerCase() === (''+category).trim().toLowerCase());
  }
}

class Controller {
  constructor() {
    this._view = new UI();
    this._model = new Deck();
    this._hint = 5;
    this._heart= 5;
    this.checkCategory();
  }
  checkCategory() {
    if (process.argv.length > 2) {
      let options = process.argv[2];
      let idx = this._model.searchCategory(options);
      if (idx == -1) this._view.showErrMsg('ERROR',`Category "${options}" is not exist`);
      else {
        this._view.showStart();
        this._model.readFlashCard(options);
        this.playDeck();
      }
    } else {
      let listcate = this._model.getStrCategory();
      this._view.showErrMsg('ERROR','Please Insert Category');
      console.log(`List of allowed Category [${listcate}]`);
    }
  }

  playDeck() {
    let ans = '';
    let idx = 1;
    let len = this._model._deck.length;
    this._model._deck.forEach((x) => {
      if (this._heart > 0) {
        this._view.showDefinition(idx,len,x.definition);
        let tries = 0;
        while (ans === '' && this._heart > 0) {
          ans = rls.question(`The term is : `);
          if (ans.trim().toLowerCase() === 'hint') {
            if (this._hint > 0 ) {
              this._hint -= 1;
              console.log(`${this._hint} hint left`);
              console.log('HINT : '+x.term.charAt(0)+ x.term.substr(1).replace(/\w/gi,'.'));
            } else console.log('You are out of hint!');
            ans = '';
          } else if (ans.trim().toLowerCase() !== x.term.trim().toLowerCase()) {
            tries += 1 ;
            if (this._heart > 0) {
              this._heart -= 1;
              let err = (this._heart > 0 ? 'Try Again! ' : '') + `Only ${this._heart} heart left, you have tried ${tries}x`;
              this._view.showErrMsg('INCORRECT',`${err}`);
              ans = '';
            }
          } else this._view.showScsMsg();
        }
        ans = '';
        idx += 1;
      } else return;
    });

    let stat = (this._heart > 0? 'win' : 'lose');
    this.endGame(stat);
  }

  endGame(stat) {
    this._view.showEndGame(stat);
    console.log('Bye Buddy, Rest Well and Good Luck for Your Exam');
    console.log('or...');
    console.log(`Try others deck [${this._model.getStrCategory()}]`);
  }
}

class UI {
  constructor() {}
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
    console.log(`[${tag}] ${err}`);
  }
  showScsMsg(scs) {
    console.log('Correct!');
  }
  showDefinition(idx,len,def) {
    console.log(`[${idx}/${len}]. [DEFINITION] ${def}`);
  }
  showEndGame(status = 'win') {
    this.reset();
    console.log((status === 'win'? 'You Win!' : 'You Lose! You better study next time'));
  }
  reset(){
    console.log("\x1B[2J");
  }
}

let fc = new Controller();