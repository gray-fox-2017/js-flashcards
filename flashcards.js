"use strict"
// write your code here
let fs = require('fs')

class Card {
    constructor() {
        this._data = this.getAllData()
    }

    getAllData() {
        let data = JSON.parse(fs.readFileSync('data.json'))
        return data
    }
}

const readline = require('readline')
class FlashCards {
    constructor() {
        this._card = new Card()
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    getQuestion(indexQues = 0) {
        if (indexQues < this._card._data.length) {
            console.log('Definition')
            console.log(this._card._data.length);
            console.log(this._card._data[indexQues].definition)
            this._rl.question('Guess :', (answer) => {
                if (indexQues < this._card._data.length) {
                    if (this.cekAnswer(indexQues, answer)) {
                        indexQues++
                        console.log(indexQues)
                        console.log('Correct!\n')
                        this.getQuestion(indexQues)

                    } else {
                        console.log('Incorrect!\n')
                        this.getQuestion(indexQues)
                    }
                }
            })
        } else {
            console.log('Congrats!!! Pertanyaan Habis!')
            process.exit()
        }
    }

    cekAnswer(indexQues, answer) {
        if (this._card._data[indexQues].term.toLowerCase() === answer.toLowerCase()) {
            return true
        } else {
            return false
        }
    }
}


let flashcards = new FlashCards()
flashcards.getQuestion()
