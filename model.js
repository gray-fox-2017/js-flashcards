"use strict"
const fs = require('fs');
import Controller from './controller'
// write your code here
class Model {
  constructor(input) {
    this.file = JSON.parse(fs.readFileSync(input, 'ascii'))
  }
}

export default Model
