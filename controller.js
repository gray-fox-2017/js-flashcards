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

 makeArray(command){
   let length=0;
   let arr=[]
   if(command==='mycards'){
    //  let hasil= this._model.getMyCards(function(result){
    //    length=result.length;
    //  });
    length=3
   }else{
    //  let hasil= this._model.getDefaultsCards(function(result){
    //    length=result.length;
    //  });
    length=6
   }

   for(let i=0; i<length; i++){
     arr.push(i);
   }
   this.arr=arr;
 }

 deckOptions()
{
  let command=this._argv[0];
  if(command=="mycards")
  {
    this.makeArray(command);
    this.playCards(command);
  }
  else {
    this.makeArray(command);
    this.playCards();
  }
}


  playCards(command,index=0,arr=this.arr,wrong=0){
    let play=this.play;
    if(command=="mycards"){
      if(arr.length===0){
        this._view.congrats();
        rl.close();
        return 0;
      }
      let hasil=this._model.getMyCards(function(result){
         play._view.showQuestion(result[arr[index]].definition)
         rl.question('',(answer) => {
           if(answer===result[arr[index]].term && arr.length>0){
              arr.shift();
              play._view.showRight()
              return play.playCards(command,index,arr,wrong);
            }
           else if(answer==='skip' && arr.length>0){
             arr.push(arr[0]);
             arr.shift();
             return play.playCards(command,index,arr,wrong);
           }
           if(answer!=result[arr[index]].term && arr.length>0){
              wrong+=1;
              play._view.showWrong(wrong)
              return play.playCards(command,index,arr,wrong);
            }
         });
       });
    }
    else{
      if(arr.length===0){
        this._view.congrats();
        rl.close();
        return 0;
      }
      let hasil=this._model.getDefaultsCards(function(result){
         play._view.showQuestion(result[arr[index]].definition)
         rl.question('',(answer) => {
           if(answer===result[arr[index]].term && arr.length>0){
              arr.shift();
              play._view.showRight()
              return play.playCards(command,index,arr,wrong);
            }
           else if(answer==='skip' && arr.length>0){
             arr.push(arr[0]);
             arr.shift();
             return play.playCards(command,index,arr,wrong);
           }
           if(answer!=result[arr[index]].term && arr.length>0){
              wrong+=1;
              play._view.showWrong(wrong)
              return play.playCards(command,index,arr,wrong);
            }
         });
       });
      }
  }
}

module.exports = Controller;
