"use strict"
// write your code here
import Controller from './controller'

let input = process.argv[2] || 'social.json'

let play = new Controller(input)
play.start()
