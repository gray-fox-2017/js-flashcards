const Model = require('./model');
const View = require('./view');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stout
});


class Controller {
  constructor() {
    this._model= new Model();
    this._view = new View();
    this.play = this;
    this.arr=[];
    this.length=0;
  }

  argvProcess(){
  var arrPerintah=[];
  process.argv.forEach((val, index) => {
    let hasil=[];
    if(index>1)
    {
      arrPerintah.push(val)
    }
  });
   this._argv=arrPerintah;
 }

 deckOptions()
{
  let command=this._argv[0];
  if(command=="mycards")
  {
    this._view.header()
    this.makeArray(command);
    this.playCards(command);
  }
  else {
    this._view.header()
    this.makeArray(command);
    this.playCards();
  }
}


  playCards(command,arr=this.arr,wrong=0){
    let play=this.play;
    let index=0;
    if(command=="mycards"){
      if(arr.length===0){
        this._view.congrats();
        rl.close();
        return 0;
      }
      let hasil=this._model.getMyCards(function(result){
        play.playProcess(command,play,result,index,arr,wrong);
       });
    }
    else{
      if(arr.length===0){
        this._view.congrats();
        rl.close();
        return 0;
      }
      let hasil=this._model.getDefaultsCards(function(result){
        play.playProcess(command,play,result,index,arr,wrong)
       });
      }
  }

  playProcess(command,play,result,index,arr,wrong){
    play._view.showQuestion(result[arr[index]].definition)
    rl.question('',(answer) => {
      if(answer===result[arr[index]].term.toLowerCase() && arr.length>0){
         arr.shift();
         play._view.showRight()
         return play.playCards(command,arr,wrong);
       }
      else if(answer==='skip' && arr.length>0){
        play._view.showSkip()
        arr.push(arr[0]);
        arr.shift();
        return play.playCards(command,arr,wrong);
      }
      if(answer!=result[arr[index]].term.toLowerCase() && arr.length>0){
         wrong+=1;
         play._view.showWrong(wrong)
         return play.playCards(command,arr,wrong);
       }
    });
  }

  makeArray(command){
    let play=this.play;
    let arr=[]
    if(command==='mycards'){
     play.length=3
    }else{
     play.length=6
    }
    for(let i=0; i<play.length; i++){
      arr.push(i);
    }
    this.arr=arr;
  }
}

module.exports = Controller;
