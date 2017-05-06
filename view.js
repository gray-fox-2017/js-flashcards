class View {
  constructor() {

  }

  header(){
    console.log('\n\n========== Selamat Bermain! ==========\n')
  }
  showQuestion(quest){
    console.log(`${quest}`);
  }
  showRight(){
    console.log(`\nBenar!\n`);
  }
  showWrong(wrong){
    console.log(`\nSalah ${wrong}!\n`);
  }
  showSkip(){
    console.log(`\nSoal Selanjutnya!\n`);
  }
  congrats(){
    console.log('\n*******Selamat Anda Berhasil Menjawab Semua Pertanyaan!*******\n\n')
  }
}


module.exports = View;
