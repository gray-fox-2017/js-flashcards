const View = require('./view.js');
const Model = require('./model.js');

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();
  }

  parse(){
    this.view.view_parse(this.model.readRecordsFromMediaTable);
  }
}

module.exports = Controller;
