class View {
  constructor() {

  }

  congrats(){
    console.log('Selamat Anda Berhasil Menjawab Semua Pertanyaan!')
  }
  showQuestion(quest){
    console.log(`${quest}`);
  }
  showRight(){
    console.log(`\nBener!\n`);
  }
  showWrong(wrong){
    console.log(`\nSalah ${wrong}!\n`);
  }
}


module.exports = View;
