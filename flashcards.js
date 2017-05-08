"use strict"
// write your code here
const fs = require('fs');
const readline = require('readline');
//let data = JSON.parse(fs.readFileSync('data.json'));
const rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout,
  prompt : 'Jawaban anda > '
})

class Model {
  constructor(data){
    this.file = data; //array
  }
}

class Controller {
  constructor(data) {
    this.temp= data
    this.attempt = 0
    this.question = 0;
    this.point = 0;
    this.questionArray = this.makeQuestionArray(this.temp.length)
    this.model = new Model(this.temp)
    this.view = new View()
  }

  makeQuestionArray(size){
    let arr = []
    for(let i=0;i<size;i++){
      arr.push(i)
    }
    return arr
  }
  start(){

    this.view.start()
    this.questionsss();
    rl.on('line', (line)=>{
      if(line != ''){
        if(line.toLowerCase().trim() === this.cek().toLowerCase()){
          this.view.separator()
          this.point += 4;
          this.attempt++
          this.questionArray.shift()
          if(this.questionArray.length != 0){
            this.questionsss();
          } else {
            this.view.separator()
            this.finish();
            rl.close();
          }
        } else {
          this.view.wrongAnswer()
          this.point -= 1;
          this.attempt++
          this.questionsss();
        }
      } else {
        this.view.separator()
        this.questionArray.push(this.questionArray.shift());
        this.attempt++
        this.questionsss();
      }
    })
  }

  questionsss(){
    this.view.blankspace();
    if(this.point>=0){
      console.log(this.questionArray);
      this.view.throwQuestion(this.attempt,this.point,this.model.file[this.questionArray[0]].definition)
      rl.prompt();
    } else {
      this.view.gameOver(this.point)
      rl.close();
    }
  }

  cek(){
    return this.model.file[this.questionArray[0]].term;
  }

  finish(){
    this.view.blankspace();
    this.view.finishLog(this.attempt,this.point)
  }
}

class View {
  start(){
    console.log(`Are you smarter than a 5th grader?\nGeneral Rule: Jawaban hanya 1 kata`);
  }
  separator(){
    console.log('==============================================================================')
  }
  wrongAnswer(){
    console.log(`==============================================================================\nAnda salah, coba lagi`);
  }
  skipQuestion(){
    console.log('==============================================================================\nLanjut ke pertanyaan berikutnya');
  }
  throwQuestion(attempt,point,definition){
    console.log(`Attempts: ${attempt}\nPoin anda ${point}\nQuestion: ${definition}`);
    console.log('(tekan ENTER untuk lewat ke pertanyaan berikutnya)');
  }
  gameOver(point){
    console.log(`==============================================================================\nPoin anda ${point}\nBubar aja lah, poin udah negatif tuh :p\nBelajar lebih rajin lagi yah`);
  }
  finishLog(attempt,point){
    if(point===24){
      console.log(`Selamat! Anda brilian! (Point: ${point}, Attempt:${attempt})`);
    } else if(point>=18){
      console.log(`Lumayan laah, ga bego-bego amat  (Points: ${point}, Attempt:${attempt}))`);
    } else {
      console.log(`Lulusnya cuma modal hoki (Points: ${point}, Attempt:${attempt}))`);
    }
  }
  blankspace(){
    for(let i=0;i<100;i++){
      console.log('\r');
    }
  }
}

// let aldy = new Controller(data)
// aldy.start2()

module.exports = {
  Model, Controller, View
};