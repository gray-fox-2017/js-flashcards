var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./cards.db');

db.all("SELECT * from social",function(err,rows){
  let game = new Controller(rows);
  console.log(game.model);
  game.run()
});


class Model {
  constructor(arrObj) {
    this.card = arrObj;
  }
}

class Controller {
  constructor(arrObj) {
    this.model = new Model(arrObj)
    this.view = new View()
    this.guess = 5;
  }

  run() {
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: 'jawab > '
    });
    // this.question = ["ada apa? ", "enaknya ngapain ?", "lagi coba-coba aja"];
    // this.answer = ["ya", "belajar", "coba"]
    // this.guessed =
    rl.prompt();
    console.log("Tekan Enter untuk melanjutkan");

    rl.on('line', (input) => {

      let showedCard = this.model.card[0]
      let question = this.model.card[0].definition.trim().toLowerCase();
      let answer = this.model.card[0].term.trim().toLowerCase();
      if (input == "" && question != undefined) {
        // view.showQuestion(question)
        console.log(question);
      } else if (question == undefined) {
        // view.showCongratulation();
        console.log("you win , nothing card left");
      }

      rl.prompt();

      input = input.toLowerCase().trim()

      if (input != answer) {
        console.log(input);
        this.model.card.push(showedCard);
        this.model.card.shift();
        this.guess -= 1;
        console.log(`Your answer is wrong, you have ${this.guess} left`);
        // view.showWrongAnswer(answer);
        // view.showGuessDecreased();
      } else if (input == answer) {
        this.model.card.shift()
        console.log(`Your ${answer} is right !`);
        // view.showAnswerCorrect(answer);
      }


    }).on('close', () => {
      console.log('Have a great day!');
      process.exit(0);
    });
  }


}

class View {
  constructor() {

  }

  showCongratulation() {
    "Sudah tidak ada kartu lagi, selamat kamu menang"
  }
}
