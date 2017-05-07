

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./cards.db');

class tebakan{
  constructor(arrObj) {
    this.daftarObject = arrObj;
    this.daftarPertanyaan = arrObj.map(x=>x.definition);
    this.daftarJawaban = arrObj.map(x=>x.term);
    this.jumlahJawab = 0;
    this.jumlahBetul = 0;
    this.jumlahSalah = 0;
  }

  init() {
    console.log(`\n\nJumlah pertanyaan di jawab: ${this.jumlahJawab} dari ${this.daftarPertanyaan.length} Soal`)
    let urutan = ['pertama','kedua','ketiga','keempat','kelima','terakhir']
    console.log(`\nPertanyaan ${urutan[this.jumlahJawab]}\n`);
    let question = this.daftarPertanyaan[this.jumlahJawab].split('\\n').join('\n');
    console.log(`${question} ?\n`);
    rl.question(`Jawabannya adalah??    `, jawab => {
      if (jawab == this.daftarJawaban[this.jumlahJawab]) {
        console.log('\x1B[2J');
        console.log('\nWAAAWW anda BETUL!!!');
        this.jumlahJawab+=1;
        this.jumlahBetul+=1;
        if (this.jumlahJawab < this.daftarJawaban.length) {
          this.init()
        } else {
          this.kelar()
        }
      } else if (jawab == 'skip') {
        console.log('\x1B[2J');
        console.log(`\nokay, NEXT!!!`)
        let jawabanMundur = this.daftarJawaban.splice(0,1);
        let pertanyaanMundur = this.daftarPertanyaan.splice(0,1);
        this.daftarJawaban.push(jawabanMundur);
        this.daftarPertanyaan.push(pertanyaanMundur);
        if (this.jumlahJawab < this.daftarJawaban.length) {
          this.init()
        } else {
          this.kelar()
        }
      } else {
        console.log('\x1B[2J');
        console.log(`\nWKWKWK Salah!!\nJawaban yang betul adalah ${this.daftarJawaban[this.jumlahJawab]}`)
        this.jumlahSalah+=1;
        this.jumlahJawab+=1;
        if (this.jumlahJawab < this.daftarJawaban.length) {
          this.init()
        } else {
          this.kelar()
        }
      }
    });
  }

  kelar() {
    console.log(`\nAnda telah menyelesaikan sesi quiz kali ini.\nBerikut hasil anda:`)
    console.log(`Jawaban betul: ${this.jumlahBetul}`);
    console.log(`Jawaban salah: ${this.jumlahSalah}`);
    let nilai = Math.floor(this.jumlahBetul/this.jumlahJawab*100);
    console.log(`Nilai: ${nilai}`);
    rl.close();

  }
}

module.exports = tebakan;